const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')

async function userSignUpController(req, res){
    try {
        const {email, password, name} = req.body

        const user = await userModel.findOne({email})
        if(user){
            throw new Error("El usuario ya existe en la Base de Datos");
            
        }

        if(!email){
            throw new Error("Por favor ingrese el correo")
        }

        if(!password){
            throw new Error("Por favor ingrese el password")
        }

        if(!name){
            throw new Error("Por favor ingrese el nombre")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("El password es fuerte")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "Usuario Creado"
        })

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userSignUpController