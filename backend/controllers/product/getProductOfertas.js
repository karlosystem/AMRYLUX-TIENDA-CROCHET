const productModel = require("../../models/productModel");

const getProductOfertas = async (req, res) => {
  try {
    // Buscar SOLO productos en oferta especial (isOffer: 1) y activos
    const product = await productModel.find({
      isActive: 1,
      isOffer: 1
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Productos en oferta obtenidos exitosamente",
      error: false,
      success: true,
      data: product,
      total: product.length
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductOfertas;