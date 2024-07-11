const express = require("express");
const server = express();
const db = require("./config/db");
 require("dotenv").config();
 const cors = require("cors");
server.use(cors());

const PORT = process.env.PORT || 8080 ;

server.use(express.json());

server.listen(PORT, () => {
  console.log(`listening on port 8080`);
});
