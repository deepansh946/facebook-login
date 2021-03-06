import Hapi from "hapi";
import mongoose from "mongoose";
import Bell from "bell";
import "babel-polyfill";

const { IP, PORT } = process.env;

const internals = {};

const serverConfig = {
  host: IP || "localhost",
  port: PORT || 3000
};

internals.start = async function() {
  const server = Hapi.server(serverConfig);

  await server.register(Bell);

  server.auth.strategy("facebook", "bell", {
    provider: "facebook",
    password:
      "!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^!@#!#!@^#%&!@%#&!@%#^",
    isSecure: false,
    clientId: "146530389495656",
    clientSecret: "c80448e9168a01260102fe10cc4056c0",
    location: server.info.uri
  });

  server.route({
    method: "*",
    path: "/facebook",
    options: {
      auth: {
        strategy: "facebook",
        mode: "try"
      },
      handler: function(request, h) {
        if (!request.auth.isAuthenticated) {
          return "Authentication failed due to " + request.auth.error.message;
        }

        return (
          "<pre>" + JSON.stringify(request.auth.credentials, null, 4) + "</pre>"
        );
      }
    }
  });

  server.route({
    method: "GET",
    path: "/",
    handler: () => "Hello there!"
  });

  await server.start();

  console.log("Server started");
};

internals.start();
