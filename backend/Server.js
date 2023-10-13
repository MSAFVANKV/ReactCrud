const express = require("express")
const session = require('express-session');
const mongoose = require('mongoose')
require('dotenv').config({path:".env"});
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// ROUTERS
const TaskRouter = require('./Routes/TaskRouter')
const adminRouter = require('./Routes/adminRouter')

app.use(cors({
    origin: 'http://localhost:5173', // This is the correct version
    credentials: true
}));


const PORT = process.env.PORT || 8080

// session
app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

  // Middleware to prevent caching
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    next();
  });
// app.use(express.json())
app.use(bodyParser.json());


app.use("/api",TaskRouter)
app.use("/admin",adminRouter);
// app.get('/',(req, res) => {
//     res.send("Backend Running")
// })
// mongoose.connect(process.env.MONGO_CONNECTION)
// .then(()=>{
//     console.log("mongodb atles connected");
// })
// .catch((err)=>{
//     console.log(err);
// })
mongoose.connect(process.env.MONGO_DB_CONNECTION)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=> {
    console.log("Connection failed!!");
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
