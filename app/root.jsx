import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import { SessionContext, userContext } from "./context/sessionContext";
import { useState } from "react";

export function meta() {
  return {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  const [user, setUser] = useState(userContext);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, backgroundColor: "#F7F3E3" }}>
        <SessionContext.Provider value={[user, setUser]}>
          <Outlet />
        </SessionContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
