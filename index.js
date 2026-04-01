const express = require('express');
require("dotenv").config();
const connectdb = require("./src/config/database");
const cors = require("cors");
const app = express();
const http = require("http");



// this means i am creating server on the top of express app
const server = http.createServer(app);

// set up cors
app.use(
  cors({
    origin: "https://decisionmakerfrontend.onrender.com", 
    credentials: true,
  })
);
app.use(express.json());

const PollRouter = require("./src/routes/Polls.route");


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome!!",
    status: "Active",
    time: new Date().toLocaleString('en-IN')
  });
});
app.use("/api", PollRouter);





const PORT = Number(process.env.PORT_NO);
connectdb().then(() => {
    console.log("database connection is successfull!!");
    // in above line we connect our database  then we make our prepared to listening the requests
    server.listen(PORT, () => {
        console.log("Our server is running successfully in 9999");
    })
}).catch((err) => {
    console.error("database cannot be connected" + err.message);
});

