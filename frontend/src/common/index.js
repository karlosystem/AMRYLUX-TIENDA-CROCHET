// ✅ CORRECCIÓN: Usar la variable de entorno de Vercel, con fallback a localhost para desarrollo local
const backendDomin = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`, // http://localhost:8080/api/signup
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/current_user`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/logout_user`,
        method : "get"
    },
    allUsers : {
        url : `${backendDomin}/api/all_users`,
        method : "get"  
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method : 'post'
    },
    // Agrega esto después de updateProduct
    deleteProduct : {
        url : `${backendDomin}/api/delete-product`,
        method : 'delete'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },    
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },  
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },   
    addToCardProductView : {   
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },    
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
   
    ofertaProduct : {
        url : `${backendDomin}/api/product-ofertas`,
        method : 'get'
    },
    categoryList : {
        url : `${backendDomin}/api/get-category-list`,
        method : 'get'
    },
    contactForm : {
        url : `${backendDomin}/api/contact`,
        method : 'post'
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method  : 'post'
    },    
    getOrder : {
        url : `${backendDomin}/api/order-list`,
        method : 'get'
    },
}

export default SummaryApi

