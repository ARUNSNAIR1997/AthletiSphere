var express = require("express")
var app = express()
var cors = require("cors")
var bodyParser = require("body-parser")
var fileup = require("express-fileupload")
var session = require("express-session")
var path = require("path")
var database = require("./config/database")


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())

//fileupload
app.use(fileup())
// Serve static files from public/img
app.use("/img", express.static(path.join(__dirname, "public/img")));

//session
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


database()






app.get('/',(req,res)=>{
    res.json("Welcome React")
})


const dataRouter = require("./route/data.route")

app.use("/sports",dataRouter)

app.listen(8000)