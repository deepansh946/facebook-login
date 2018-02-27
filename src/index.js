import Hapi from "hapi";
import mongoose from "mongoose";
import Bell from "bell";

const internals = {};

internals.start = async function() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

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
    handler: () => "Hello there Deepansh"
  });

  await server.start();

  console.log("Server started");
};

internals.start();
