const os = require('os')
const cluster = require('cluster')

if (cluster.isMaster) {
    const num_of_cpu = os.cpus().length
    console.log(`Server forking ${num_of_cpu} CPUS`)

    for (let i = 0; i < num_of_cpu; i++) {
        cluster.fork()
    }
} else {
const express = require('express')
const mongoose = require('mongoose')
const create_error = require('http-errors')
const dotenv = require('dotenv')

const todos = require('./router/todo_route')
const app = express()

// BODY PARSER
app.use(express.json())

//CONFIGURE ENVIRONMENT VARIABLE HOLDER
dotenv.config()

//DATABASE CONNECTION
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true,  useUnifiedTopology: true}, (err) => {
    if(err) return console.log(`Error: ${err}`)
    console.log("We are connected")
})

app.use((req, resp, next) => {
    resp.header('Access-Control-Allow-Origin', '*')
    resp.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
    resp.header('Access-Control-Allow-headers', 'Content-type, Accept, x-access-token, x-key')

    if(req.method === 'OPTIONS') {
        resp.status(200).end()
    } else {
        next()
    }
})

//CREATE ROUTER MIDDLEWARE
app.use('/', todos)

// HANDLE 404 REQUEST
app.use((req, resp, next) => {
    const err = create_error(404, "Page not found")
    next(err)
})

// CUSTOM ERROR HANDLER
app.use((error, req, resp, next) => {
    resp.status(error.status || 500)

    resp.json({
        status: error.status,
        message: error.message,
        // stack: error.stack
    })
})


//LISTEN TO PORT
const PORT = process.env.PORT || 3000
const pid = process.pid

app.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Process ${pid} is listening to port ${PORT}`)
})

}


