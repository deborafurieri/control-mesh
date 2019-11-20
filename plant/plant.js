const io = require("socket.io-client");
const plot = require("matplotnode");

const socket = io("http://localhost:3000/plant");
const controller = io("http://localhost:3000/controller");

// Initial configs
const sampleTime = 0.1;
const timer = [0];
const Y = [0];
const X = [0];

controller.on("message", data => {
    X.push(data)
});

// Index array manager
const index = (arr, index) => {
    if (arr[index] !== undefined) return arr[index]
    else return 0
}

while(true) {
    let yLength = Y.length - 1
    let xLength = X.length - 1
    let timerLength = timer.length - 1

    Y.push(1.783 * index(Y, yLength) - 0.8187 * index(Y, yLength - 1) + 0.004667 * index(X, yLength) + 0.004374 * index(X, xLength - 1))

    timer.push(timer[timerLength] + sampleTime)

    plot.plot(timer, Y, "color=g", "label=Sinal")

    plot.ylim(Y[yLength] - 1, Y[yLength] + 1)

    socket.emit("message", Y[yLength])

    if (Y.length > 100) {
        Y.splice(0)
        X.splice(0)
        timer.splice(0)
    }

    // show plot
    plot.legend()
    plot.xlabel("(sec)")
    plot.ylabel("")
    plot.grid(true)
    plot.show()

    new Promise(resolve => setTimeout(resolve, sampleTime))
}