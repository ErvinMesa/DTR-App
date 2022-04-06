const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getUsers().map((user) => {
      return db.User.create({ data: user });
    })
  );
}

seed();

function getUsers() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      username: "Road",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
    {
      username: "Frisbee",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
    {
      username: "Trees",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
    {
      username: "Skeletons",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
    {
      username: "Hippos",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
    {
      username: "Dinner",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
    {
      username: "Elevator",
      password: "$2a$10$zUjAkmNS.z7d4xxqXcgfIeCcqGUDSI8t7IcUO3ZPSyW1mviw/lKw.",
    },
  ];
}
