//1) import dotenv
//Loads .env file contents into process.env by default.
require('dotenv').config()

//2) import express
const express = require('express')

//3) import cors
const cors = require('cors')

//import router
const router = require('./Routing/router')


//import connection .js
require('./DB/connection')

//import middleware
// const appMiddleware = require('./Middleware/appMiddleware')



//4) create server
//Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express ()

//5) use of cors by server
pfServer.use(cors())

//6) parsing json 
//Returns middleware that only parses json-javascript object
pfServer.use(express.json())

//server use of middleware
//pfServer.use(appMiddleware)

//server using the router
pfServer.use(router)


//pfserver use upload folder
//first arg - how other application(front end or back end) use folder
//second arg - to export that particular folder - express.static
pfServer.use('/uploads',express.static('./uploads'))

//7) customize port - bydefault - sever runs at 3000
const PORT = 4000 || process.env

//8) run server 
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
    
})

//get request
pfServer.get('/',(req, res)=>{
    res.send(`<h1 style="color:green">project fair server running successfully and ready accept client request</h1>`)
})

/*
    //post request
    pfServer.post('/',(req, res)=>{
        res.send(`post request`)
    })
    
    //put request
    pfServer.put('/',(req, res)=>{
        res.send(`Put request`)
    })
*/