const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conexión a la base de datos (asegúrate de tener MongoDB en ejecución)
mongoose.connect('mongodb://localhost:27017/cuchobar', { useNewUrlParser: true, useUnifiedTopology: true });

// Definición del modelo de Producto
const Producto = mongoose.model('Producto', {
  nombre: String,
  precio: Number,
});

// Middleware para el manejo de JSON
app.use(express.json());

// Endpoint para calcular el total (precio * cantidad) de un producto
app.post('/calcular-total', async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;

    // Obtener el producto desde la base de datos
    const producto = await Producto.findById(productoId);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Calcular el total (precio * cantidad)
    const total = producto.precio * cantidad;

    // Devolver el resultado
    res.json({ producto, cantidad, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
