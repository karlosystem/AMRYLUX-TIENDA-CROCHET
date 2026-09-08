import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassowrd from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Success from '../pages/Success'
import OrderPage from '../pages/OrderPage'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Ofertas from '../pages/Ofertas'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path: "",
                element : <Home /> 
            },
            {
                path : "login",
                element : <Login />
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd />
            },
            {
                path : "sign-up",
                element : <SignUp />
            },
            {
                path : "product-category",
                element : <CategoryProduct />
            },
            {
               // path : "product/:id",
                path : "product/:slug",
                element : <ProductDetails />
            },
            {
                path : "cart",
                element : <Cart />
            },            
            {
                path : 'success',
                element : <Success/>
            },
            {
                path : "search",
                element : <SearchProduct />
            },
            {
                path : "order",
                element : <OrderPage />
            },
            {
                path : "about",
                element : <About />
            },
            {
                path : "contact",
                element : <Contact />
            },            
            {
                path : "ofertas",
                element : <Ofertas />
            },
            {
                path : "admin-panel",
                element : <AdminPanel />,
                children : [   
                    {
                        path : "all-users",
                        element : <AllUsers />
                    },
                    {
                        path : "all-products",
                        element : <AllProducts />
                    }
                ]
            }           
        ]        
    }
])

export default router