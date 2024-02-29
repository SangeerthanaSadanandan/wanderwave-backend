// Loads .env file into process.env

require('dotenv').config() //Loads .env file contents into process.env by default.

//import express
const express = require('express');

//import cors
const cors = require('cors');

const db = require('./DB/connection')

const router = require('./Router/route')

const appMiddleware = require('./Middlewares/appMiddleware');
const jwtMiddleware = require('./Middlewares/jwtMiddleware');

//create a backend application using express
const wvServer = express()

//use
wvServer.use(cors())
wvServer.use(express.json())
// wvServer.use(appMiddleware)
wvServer.use(router)
wvServer.use('/uploads',express.static('./uploads'))

//port creation
const PORT = 4000 || process.env.PORT 

//server listen
wvServer.listen(PORT,()=>{
    console.log("listening on port" +PORT);
})

//http - get resolving to http://localhost4000
wvServer.get("/",(req,res)=>{
    res.send(`<h1>project is started....</h1>`)
})