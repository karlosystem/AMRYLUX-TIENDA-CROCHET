const productModel = require("../../models/productModel");

const getCategoryList = async (req, res) => {
  try {
    // Obtener categorías únicas SIN filtrar por isActive
    const categories = await productModel.distinct("category");

    // Filtrar categorías vacías o nulas y ordenar alfabéticamente
    const filteredCategories = categories
      .filter(cat => cat && cat.trim() !== "")
      .sort();

    res.status(200).json({
      message: "Categorías obtenidas exitosamente",
      error: false,
      success: true,
      data: filteredCategories,
      total: filteredCategories.length
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryList;