const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  f_nac: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
    validate: {
        validator: function (value) {
            return value > 0;
            },
            message: () => "Ingrese una edad válida",
        },
  },
  raza: {
    type: String,
    required: false,
  
  },
 
});

const Dog = mongoose.model("Dog", DogSchema);

module.exports = { Dog };