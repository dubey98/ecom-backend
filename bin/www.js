const app = require("./../app");
const debug = require("debug")("ecom-backend:server");
const http = require("http");

// set enviroment variables
const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

//create server
const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

//private methods
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "llsten") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log(`server listening on http://localhost:${port}`);
}
