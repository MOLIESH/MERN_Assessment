const express = require("express");
const productRoutes = require("./routes/products");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("http://localhost:5000/products/");
});

