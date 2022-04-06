import argon2 from "argon2";
import { db } from "./db.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

export async function register({ username, password }) {
  let hash;
  try {
    hash = await argon2.hash(password);
  } catch (err) {
    return { err };
  }

  const user = await db.User.create({
    data: {
      username,
      password: hash,
    },
  });

  return { id: user.id, username };
}

export async function login({ username, password }) {
  let loginStatus;
  const user = await db.User.findFirst({
    where: {
      username,
    },
  });

  if (!user) return;

  try {
    loginStatus = await argon2.verify(user.password, password);
  } catch (err) {
    // internal failure
  }

  if (!loginStatus) return;

  return { username: user.username, id: user.id };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "DTR_Session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function requireUserId(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function logout(request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
