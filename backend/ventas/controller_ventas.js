const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');   // cross origin

const { venta } = require("./model_venta");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/venta", async (req, res) => {
  const allventas = await venta.find();
  return res.status(200).json(allVentas);
});

app.get("/venta/:id", async (req, res) => {
  const { id } = req.params;
  const venta = await venta.findById(id);
  return res.status(200).json(venta);
});

app.post("/venta", async (req, res) => {
  const newventa = new venta({ ...req.body });
  const insertedVenta = await newventa.save();
  return res.status(201).json(insertedSVenta);
});

app.put("/venta/:id", async (req, res) => {
  const { id } = req.params;
  await Venta.updateOne({ id }, req.body);
  const updatedVenta = await Venta.findById(id);
  return res.status(200).json(updatedVenta);
});

app.delete("/venta/:id", async (req, res) => {
  const { id } = req.params;
  const deletedVenta = await Venta.findByIdAndDelete(id);
  return res.status(200).json(deletedVenta);
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/cuchobar"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();