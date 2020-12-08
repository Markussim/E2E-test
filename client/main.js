window.onload = function () {
  document.getElementById("mainP").innerText = "Hmm";
};

const socket = io();

socket.on("connect", () => {
  socket.on("connected", function (msg) {
    console.log("Msg " + msg);
  });
  socket.on("msg", function (msg) {
    document.getElementById("mainP").innerText = msg;
  });
});

function sendMsg(msg) {
  socket.emit("msg", msg);
}
