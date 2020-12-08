const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

app.use(express.static("client"));

io.on("connection", async (socket) => {
  console.log("Got connect!");

  socket.emit("id", uuidv4());

  socket.on("disconnect", function () {
    console.log("Got disconnect!");
  });

  socket.on("msg", function (msg) {
    io.sockets.emit("msg", msg);
  });
});

server.listen(port, () => console.log(`Example app listening on port port!`));
