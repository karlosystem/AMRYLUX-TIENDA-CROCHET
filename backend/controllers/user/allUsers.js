const userModel = require("../../models/userModel") // 🌟 Importante: Requiere tu modelo de usuarios

async function allUsers(req, res) {
  try {
    console.log("Obteniendo todos los usuarios... Solicitado por ID de usuario:", req.userId);

    // 🌟 Buscamos todos los usuarios registrados en MongoDB
    const users = await userModel.find()

    // Enviamos la respuesta exitosa estructurada al frontend
    res.status(200).json({
      message: "Todos los usuarios obtenidos correctamente",
      data: users,
      success: true,
      error: false
    })

  } catch (error) {
    res.status(400).json({ 
      message: error.message || error, 
      error : true, 
      success : false
    });
  } 
}

module.exports = allUsers;