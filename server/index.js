const express = require("express");
const dotenv = require("dotenv");
// const cors = require("cors");
const mongoose = require("mongoose");
const productsrouter = require("./routes/productsRoutes");


dotenv.config();
const app = express();

app.use(express.json());

// app.use(cors({
//   origin: "http://localhost:5137"
// }));


app.use("/products", productsrouter)

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("MongoDB connected");
  }).catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

const port = process.env.PORT
app.listen(port, () => {
  console.log(`hello server is started at ${port}`)
});
