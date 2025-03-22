const express = require("express");
require("dotenv").config();
const cors = require("cors")
const connectDB = require("./config/db");
const mainRoute = require("./routes/index.js")
const http = require("http");
const {Server}= require("socket.io")

// MongoDB'ye bağlan
connectDB();
const app = express();

//middlewares


app.use(express.json({ limit: "1mb" }));
// CORS'u aktif et
app.use(cors());

app.use("/api",mainRoute)

const server = http.createServer(app);
// const io = socketIo(server);
const io = new Server( server,{
    cors:{
        origin:"*"
    }
})
// Socket olayları burada
require('./sockets/socketHandler')(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));