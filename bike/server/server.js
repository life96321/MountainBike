const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const models = require('./model')
const Chat = models.getModel('chat')
const userRouter = require('./user')

const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    socket.on('sendmsg', (data) => {
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, (err, doc) => {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})
const PORT = 9093
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(PORT, () => {
    console.log(`app is running at: localhost:${PORT}`)
})

