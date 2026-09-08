const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const category = req?.body?.category || req?.query?.category;
        const product = await productModel.find({ category });
        res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: product
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = getCategoryWiseProduct;