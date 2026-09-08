const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken');


async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Por Favor Ingrese su email");
    }
    if (!password) {
      throw new Error("Por Favor Ingrese su password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(checkPassword){
         const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

        const tokenOption = {
            httpOnly : true,
            secure : true
        }

        res.cookie("token",token,tokenOption).status(200).json({
            message : "Login con Exito",
            data : token,
            success : true,
            error : false
        })

    }else{
        throw new Error("Verificar su Password")
    }


  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
