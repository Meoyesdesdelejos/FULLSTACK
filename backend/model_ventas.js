const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true
  },
  pedido: {
    type: Number,
    required: true
    },
  precio: {
    type: Number,
    required: true    
  },
  fecha: {
    type: String,
    required: false  
  }
  });

const Venta = mongoose.model("ventas", ventaSchema);

module.exports = {Venta };