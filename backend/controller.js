const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');   // cross origin


const { Dog } = require("./model_dog");
const { Venta } = require("./model_ventas");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/dogs", async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
});

app.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(id);
  return res.status(200).json(dog);
});

app.post("/dogs", async (req, res) => {
  const newDog = new Dog({ ...req.body });
  const insertedDog = await newDog.save();
  return res.status(201).json(insertedDog);
});

app.put("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  await Dog.updateOne({ id }, req.body);
  const updatedDog = await Dog.findById(id);
  return res.status(200).json(updatedDog);
});

app.delete("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  return res.status(200).json(deletedDog);
});
//COLECCTION VENTAS
app.get("/ventas", async (req, res) => {
    const allVentas = await Venta.find();
    return res.status(200).json(allVentas);
  });

app.get("/ventas/:id", async (req, res) => {
    const { id } = req.params;
    const Ventas = await Dog.findById(id);
    return res.status(200).json(Venta);
  });
  app.post("/ventas", async (req, res) => {
    const newVenta = new Venta({ ...req.body });
    const insertedVenta = await newVenta.save();
    return res.status(201).json(insertedVenta);
  });
  app.put("/ventas/:id", async (req, res) => {
    const { id } = req.params;
    await Venta.updateOne({ id }, req.body);
    const updatedVenta = await Venta.findById(id);
    return res.status(200).json(updatedVenta);
  });
  
  app.delete("/ventas/:id", async (req, res) => {
    const { id } = req.params;
    const deletedVenta = await Venta.findByIdAndDelete(id);
    return res.status(200).json(deletedVenta);
  });
//
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

const path = __dirname + '/views/';
app.use(express.static(path));
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});