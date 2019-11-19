const io = require("socket.io-client")

const socket = io("http://localhost:3000/controller");
const error = io("http://localhost:3000/error");

let lastError = 0,
    integral = 0,
    pid,
    Kp = 1,
    Ki = Kp*2,
    Kd = Kp*1/2,
    dt = 0.1

error.on("message", data => {
    console.log("Error message: ", data)
    process.stdout.write(`Data: ${data}`);

    integral = integral + (Ki * data * dt)

    derivative = Kd * (data - lastError) / dt

    lastError = data

    pid = integral + derivative + (Kp * data)

    socket.emit("message", pid)
    console.log("pid: ", pid)
})
