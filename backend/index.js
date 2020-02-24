const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 4000;

let orderNumber = 45;
let items = [
    {
        name: "Love Burger",
        type: "burger",
        img: "https://leon.co/wp-content/uploads/2020/01/Chipotle-Avocado-Burger-300x300.jpg?t=0&ratio=1"
    },
    {
        name: "Grilled Wrap",
        type: "wrap",
        img: "https://leon.co/wp-content/uploads/2014/02/Chicken_Aioli_Wrap_089-300x300.jpg?t=0&ratio=1"
    },
    {
        name: "Fries",
        type: "fries",
        img: "https://leon.co/wp-content/uploads/2020/01/Chipotle-Avocado-Burger-300x300.jpg?t=0&ratio=1"
    },
    {
        name: "Lentil box",
        type: "box",
        img: "https://leon.co/wp-content/uploads/fries-side-300x300.jpg?t=0&ratio=1"
    }
]

let hotpass = [
    ["burger", "burger", "burger", "wrap"],
    ["box", "box", "burger", "box", "box"],
    ["fries", "fries"],
    ["box"]
]

let orders = [
    {
        name: "Love Burger",
        num: 21,
        img: "https://leon.co/wp-content/uploads/2020/01/Chipotle-Avocado-Burger-300x300.jpg?t=0&ratio=1",
        emoji: "https://openmoji.org/data/color/svg/1F929.svg",
        employeeNum: 1,
        predicted: false
    },

    {
        name: "Grilled Wrap",
        num: 20,
        img: "https://leon.co/wp-content/uploads/2019/09/GF_LOVE_BURGER-300x300.jpg?t=0&ratio=1",
        emoji: "https://openmoji.org/data/color/svg/1F920.svg",
        employeeNum: 1,
        predicted: false
    },
    {
        name: "Fries",
        num: 34,
        img: "https://leon.co/wp-content/uploads/fries-side-300x300.jpg?t=0&ratio=1",
        emoji: "https://openmoji.org/data/color/svg/1F385.svg",
        employeeNum: 2,
        predicted: false
    }
]

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.emit('orders', orders);
    socket.emit('hotpass', hotpass);

    socket.on('update', () => {
        socket.emit('orders', orders)
    })
    app.post('/', function (req, res) {
        res.send("hi")
        orderNumber = orderNumber + 1;
        orders.push({
            name: "Lentil Box",
            num: orderNumber,
            img: "https://leon.co/wp-content/uploads/2020/01/Chipotle-Avocado-Burger-300x300.jpg?t=0&ratio=1",
            emoji: "https://openmoji.org/data/color/svg/1F929.svg",
            employeeNum: 1,
            predicted: true
        })
        socket.emit('update');
        console.log(orders)
    })
});

app.use(router);


server.listen(PORT, () => { console.log(`Server has started on ${PORT}`) });