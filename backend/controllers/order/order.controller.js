const orderModel = require('../../models/orderProductModel');

const orderController = async (req, res) => {
    try {
        const currentUserId = req.userId; // Obtenemos el ID del usuario desde el middleware authToken
        const orderList = await orderModel.find({ userId : currentUserId }).sort({ createdAt : -1 })
       
        res.json({
            data: orderList,
            message: "Lista de órdenes obtenida con éxito",
            success: true,
        })

    } catch (error) {     
        res.status(500).json({ 
            message: error.message || error,
            error: true 
        });
    }
}

module.exports = orderController;