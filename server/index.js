const express = require("express");
// const app = express();
const cookieParser = require("cookie-parser"); 
const cors = require('cors')
const {app , server} = require("./socket/socket")

require("./config/db-connection");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // To parse the incoming cookie form req.cookie

app.use("/api", require("./routes/index"));

server.listen(PORT, () => console.log(`Server Connected to Port:: ${PORT}`));
