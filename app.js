const express = require('express');
const app = express();
const port = 3020; // Example port, change as needed
const Route = require('./routes')
const bodyParser = require('body-parser')
const path = require("path");
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 

const connectDB = require("./Config/db");

app.use("/",
    express.static( path.resolve(__dirname, "./public/banner/"))
);

app.use("/api", Route)

// Start the server
app.listen(port, () => {
    connectDB();
    console.log(`Server running at http://localhost:${port}`);
  });

