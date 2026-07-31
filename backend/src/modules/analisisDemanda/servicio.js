const Reserva = require('../reservas/modelo');
const Inventario = require('../inventario/modelo');
const Pedido = require('../pedidos/modelo');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const obtenerAnalisisDemanda = async () => {
  const productosMasConsumidos = await Pedido.aggregate([
    { $unwind: '$productos' },
    {
      $group: {
        _id: '$productos.nombreProducto',
        cantidadTotal: { $sum: '$productos.cantidad' },
        ingresoTotal: { $sum: '$productos.subtotal' }
      }
    },
    { $sort: { cantidadTotal: -1 } },
    { $limit: 5 }
  ]);

  const reservasPorFecha = await Reserva.aggregate([
    {
      $group: {
        _id: '$fecha',
        totalReservas: { $sum: 1 },
        totalPersonas: { $sum: '$cantidadPersonas' }
      }
    },
    { $sort: { totalReservas: -1 } },
    { $limit: 5 }
  ]);

  const productosBajoStock = await Inventario.find({
    activo: true,
    $expr: { $lte: ['$cantidadDisponible', '$nivelMinimo'] }
  });

  const contextoDatos = `
    Datos actuales del restaurante:
    - Productos más consumidos: ${JSON.stringify(productosMasConsumidos)}
    - Días con más reservas: ${JSON.stringify(reservasPorFecha)}
    - Productos con bajo stock crítico: ${JSON.stringify(productosBajoStock)}
  `;

  let recomendacionIA = "";

  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
      
      const prompt = `Eres un experto administrador de restaurantes y analista de negocios. Analiza los siguientes datos operativos de mi restaurante y redacta 3 recomendaciones estratégicas claras, profesionales y accionables para optimizar el inventario, el personal o las ventas. No uses formato markdown complejo, solo texto claro separado por saltos de línea. \n\n${contextoDatos}`;
      
      const result = await model.generateContent(prompt);
      recomendacionIA = result.response.text();
    } catch (error) {
      console.error("Error conectando con la IA:", error);
      recomendacionIA = "Error al generar el análisis inteligente. Revisa la consola del servidor.";
    }
  } else {
    recomendacionIA = "La clave de IA no está configurada en el archivo .env.";
  }

  return {
    productosMasConsumidos,
    reservasPorFecha,
    productosBajoStock,
    recomendaciones: recomendacionIA
  };
};

module.exports = { obtenerAnalisisDemanda };