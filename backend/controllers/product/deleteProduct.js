const productModel = require('../../models/productModel')

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.body
        
        // Verificar que el ID exista
        if (!id) {
            return res.status(400).json({
                message: "ID de producto requerido",
                error: true,
                success: false
            })
        }

        // Eliminar el producto
        const deletedProduct = await productModel.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Producto no encontrado",
                error: true,
                success: false
            })
        }

        res.json({
            message: "Producto eliminado exitosamente",
            success: true,
            error: false,
            data: deletedProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = deleteProductController