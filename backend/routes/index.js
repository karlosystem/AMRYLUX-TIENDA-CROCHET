const express = require("express")

const router = express.Router()

const getCategoryList = require("../controllers/product/getCategoryList");
const sendContactEmail = require("../controllers/contact/sendContactEmail");

const userSignUpController = require("../controllers/user/userSignUp")
const userSignInController = require("../controllers/user/userSignIn")
const userDetailsController = require("../controllers/user/userDetails")
const userLogout = require("../controllers/user/userLogout")

const authToken = require("../middleware/authToken")

const uploadProductController = require('../controllers/product/uploadProduct')
const getProductController = require("../controllers/product/getProduct")
const updateProductController = require("../controllers/product/updateProduct")

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/current_user", authToken, userDetailsController)
router.get("/logout_user", userLogout)
router.get("/get-category-list", getCategoryList);

//Panel de Administración
router.get("/all_users", authToken, require("../controllers/user/allUsers"))
router.post("/update-user", authToken, require("../controllers/user/updateUser"))
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", authToken, getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", require("../controllers/product/getCategoryProductOne"))
// Agrega esto después de: router.post("/update-product", authToken, updateProductController)
router.delete("/delete-product", authToken, require("../controllers/product/deleteProduct"))

router.post("/category-product", require("../controllers/product/getCategoryWiseProduct"))
router.post("/product-details", require("../controllers/product/getProductDetails"))
router.get("/search", require("../controllers/product/searchProduct"))
router.post("/filter-product", require("../controllers/product/filterProduct"))

router.get("/product-ofertas", require("../controllers/product/getProductOfertas"))
router.post("/contact", sendContactEmail);

// usuario agrega producto al carrito
router.post("/addtocart", authToken, require("../controllers/user/addToCartController"))
router.get("/countAddToCartProduct",authToken, require("../controllers/user/countAddToCartProduct"))
router.get("/view-card-product", authToken, require("../controllers/user/addToCartViewProduct"))   
router.post("/update-cart-product",authToken, require("../controllers/user/updateAddToCartProduct"))
router.post("/delete-cart-product",authToken, require("../controllers/user/deleteAddToCartProduct"))

//payment and order
router.post('/checkout',authToken, require("../controllers/order/paymentController"))

//router.post('/webhook', require("../controllers/order/webhook")) // /api/webhook
// El webhook debe recibir el body como RAW (no JSON parseado)
router.post('/webhook', express.raw({ type: 'application/json' }), require("../controllers/order/webhook"))

router.get("/order-list",authToken, require("../controllers/order/order.controller"))

module.exports = router