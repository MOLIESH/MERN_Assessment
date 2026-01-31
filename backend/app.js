const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); 

app.use("/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

