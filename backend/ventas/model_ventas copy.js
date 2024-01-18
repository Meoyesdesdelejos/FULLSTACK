const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true,
  },
  pedido: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
          return value > 0;
          },
          message: () => "Ingrese una cantidad válida",
      }
    },
  precio: {
    type: Number,
    required: true,
    validate: {
        validator: function (value) {
            return value > 0;
            },
            message: () => "Ingrese una edad válida",
        },
  },
  fecha: {
    type: String,
    required: false,
  
  }
  });

const venta = mongoose.model("venta", ventaSchema);

module.exports = {venta };