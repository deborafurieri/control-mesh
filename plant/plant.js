const io = require('socket.io-client');
const plot = require('matplotnode');

const socket = io('http://localhost:3000/plant');
const controller = io('http://localhost:3000/controller');

// Initial configs
const sampleTime = 0.1;
const timer = [0];
const Y = [0];
const X = [0];

controller.on('message', data => X.push(data));

// Index array manager
const index = (arr, index) => {
    try{
        return arr[index]
    } catch(e) {
        console.log(e)
        return 0
    }
}

while(1) {
    Y.push(1.783 * index(Y, -1) - 0.8187 * index(Y, -2) + 0.004667 * index(X, -1) + 0.004374 * index(X, -2))
    if (X.length < Y.length) X.push(0)

    timer.push(timer[-1] + sampleTime)

    plot.plot(timer, Y, 'color=g', 'label=Sinal')

    plot.ylim(Y[-1] - 1, Y[-1] + 1)

    socket.emit('message', Y[-1])

    if (Y.length > 100) {
        Y.splice(0)
        X.splice(0)
        timer.splice(0)
    }

    // show plot
    plot.legend()
    plot.xlabel('(sec)')
    plot.ylabel('')
    plot.grid(true)
    plot.show()

    new Promise(resolve => setTimeout(resolve, sampleTime))
}