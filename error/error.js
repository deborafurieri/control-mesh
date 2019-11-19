const io = require("socket.io-client");

const socket = io("http://localhost:3000/error");
const plant = io("http://localhost:3000/plant");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

let data = 0;

socket.on("connect", () => {
  process.stdout.write("Insira o set point: ");
  readline.on("line", line => {
    let setPoint = Number(line);

    if (JSON.stringify(setPoint) !== JSON.stringify(data)) {
      data = setPoint;
    }

    process.stdout.write("Insira o set point: ");
  });
});

plant.on("message", value => {
  console.log("value", value)
  let error = data - value;
  console.log("Error value", error)
  socket.emit("message", error);
});
