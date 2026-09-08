import logo from "./logo.svg";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./stores/userSlice";
import WhatsAppButton from './components/WhatsAppButton';


function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include", // Obligatorio para enviar la cookie
      });

      const dataApi = await dataResponse.json();

      if (!dataApi.error) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.log("Error al conectar con el servidor:", error);
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
        }}
      >
         <div className="flex flex-col min-h-screen bg-white">
          <ToastContainer position="top-right" autoClose={3000} />
          <Header />
          <main className="flex-grow pt-32">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>        
      </Context.Provider>
    </>
  );
}

export default App;
