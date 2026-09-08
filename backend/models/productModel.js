const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    // --- Atributos Existentes ---
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,

    // --- Nuevos Atributos de Control y Estado ---
    isActive : {
        type : Number,
        enum : [0, 1],
        default : 1 // 1 = Activado (visible en la web), 0 = Desactivado
    },
    sizes : {
        type : [String], // Soporta múltiples tallas seleccionadas a la vez (ej: ['S', 'M', 'L'])
        default : []
    },
    color : {
        type : String, // Almacenará el color seleccionado de tu lista de 15 opciones/degradados
        default : ""
    },
    slug : {
        type : String,
        lowercase : true, // Convierte automáticamente a minúsculas para URLs amigables
        trim : true       // Elimina espacios en blanco innecesarios al inicio o final
    },
    stock : {
        type : Number,
        default : 0
    },
    isLiquidation : {
        type : Number,
        enum : [0, 1],
        default : 0 // 1 = Sí, 0 = No
    },
    isOffer : {
        type : Number,
        enum : [0, 1],
        default : 0 // 1 = Sí, 0 = No
    },

    // --- Atributos de Posicionamiento SEO ---
    metaTitle : {
        type : String,
        default : ""
    },
    metaDescription : {
        type : String,
        default : ""
    },
    metaKeywords : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel