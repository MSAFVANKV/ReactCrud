const express = require("express")
const TaskRouter = require('./Routes/TaskRouter')
const mongoose = require('mongoose')
require('dotenv').config({path:".env"});

const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use("/api",TaskRouter)
// app.get('/',(req, res) => {
//     res.send("Backend Running")
// })
mongoose.connect(process.env.MONGO_CONNECTION)
.then(()=>{
    console.log("mongodb atles connected");
})
.catch((err)=>{
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
