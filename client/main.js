let id;

window.onload = async function () {
  document.getElementById("mainP").innerText = "Hmm";
  let keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  let messgagePrimoseAwaited = await encryptMessage(
    keyPair.publicKey,
    "Det är bra"
  );

  console.log(messgagePrimoseAwaited.toString());
};

const socket = io();

socket.on("connect", () => {
  socket.on("id", function (msg) {
    console.log("Msg " + msg);
    id = msg;
  });
  socket.on("msg", function (msg) {
    if (JSON.parse(msg).recv == id) {
      document.getElementById("mainP").innerText = msg;
    }
  });
});

function sendMsg(msgText, recv) {
  let msg = {
    id: id,
    recv: recv,
    msg: msgText,
  };
  console.log(msg);
  socket.emit("msg", JSON.stringify(msg));
}

function decryptMessage(privateKey, ciphertext) {
  return window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    ciphertext
  );
}

function getMessageEncoding(msg) {
  let enc = new TextEncoder();
  return enc.encode(msg);
}

function encryptMessage(publicKey, msg) {
  let encoded = getMessageEncoding(msg);

  return new Uint8Array(
    window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      encoded
    ),
    0,
    5
  );
}
