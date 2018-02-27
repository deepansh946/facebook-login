import Hapi from "hapi";
import mongoose from "mongoose";

const server = Hapi.Server({
  port: 3000,
  host: "localhost"
});

// mongoose.connect(config.database, {
//   useMongoClient: true,
//   connectTimeoutMS: 1000
// });

// const db = mongoose.connection;
// db
//   .on("error", console.error.bind(console, "connection error:"))
//   .once("open", () => {
//     console.log("Mongo is live!");
//   });

server.route({
  method: "GET",
  path: "/",
  handler: () => "Hello there"
});

async function start() {
  try {
    await server.start();
    console.log("Server is running bro!");
  } catch (error) {
    console.error(error);
  }
}

start();
