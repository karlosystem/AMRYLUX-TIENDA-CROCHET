const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
  try {
    const user = await userModel.findById(req.userId)
    res.status(200).json({
      message: "Detalles del usuario obtenidos correctamente",
      error: false,
      data: user
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;