const productModel = require("../../models/productModel");
const mongoose = require("mongoose");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    console.log("🔍 Buscando producto con:", productId);

    if (!productId) {
      return res.status(400).json({
        message: "Se requiere productId o slug",
        error: true,
        success: false,
      });
    }

    let product = null;

    // 1️⃣ Primero intentar buscar por slug (siempre es string válido)
    product = await productModel.findOne({ slug: productId });
    
    if (product) {
      console.log("✅ Producto encontrado por slug:", product.productName);
    } else {
      // 2️⃣ Si no encuentra por slug, verificar si es un ObjectId válido
      const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
      
      if (isValidObjectId) {
        product = await productModel.findById(productId);
        if (product) {
          console.log("✅ Producto encontrado por ID:", product.productName);
        }
      }
    }

    // 3️⃣ Si no se encontró por ningún método
    if (!product) {
      console.log("❌ Producto no encontrado:", productId);
      return res.status(404).json({
        message: "Producto no encontrado",
        error: true,
        success: false,
        data: null,
      });
    }

    res.json({
      message: "Producto encontrado",
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("❌ Error en getProductDetails:", error);
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
      data: null,
    });
  }
};

module.exports = getProductDetails;