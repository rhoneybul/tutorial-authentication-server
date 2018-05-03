const express = require("express");
const http = require("http");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const router = require("./router");
const mongoose = require("mongoose");

// DB setup 
mongoose.connect("mongodb://localhost:27017/auth")

// creat the app 
app.use(morgan("combined")); // morgan is a logging framework
app.use(bodyParser.json({ type: '*/*' })) // parses incomgin requrest into json
router(app)

// create ther server
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on port", port);