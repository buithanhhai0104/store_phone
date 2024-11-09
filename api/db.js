const jsonServer = require("json-server");
const { createServer, Model } = jsonServer;

const server = createServer();
const router = server.router("db.json"); // Ensure db.json is in the correct directory or provide the full path
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
});
