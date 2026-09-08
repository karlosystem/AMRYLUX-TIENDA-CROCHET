import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import EditorialSection from "../components/EditorialSection";

import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>AMRY LUXE | Tienda de Ropa Crochet en Lima - Hecho a Mano</title>
        <meta
          name="description"
          content="Descubre AMRY LUXE, tu tienda de ropa crochet artesanal en Lima. Sweaters, tops y vestidos hechos a mano con amor. Envíos a todo el Perú. ¡Compra online y luce única!"
        />
      </Helmet>
      <BannerProduct />
      <CategoryList />
      <HorizontalCardProduct category={"sweater"} heading={"Sweaters"} />
      <HorizontalCardProduct category={"top"} heading={"Top"} />
      <HorizontalCardProduct category={"vestido"} heading={"Vestidos"} />

      {/*   aqui se agraga mas categorias    <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />
      <HorizontalCardProduct category={"airpods"} heading={"Top Airpods"} /> */}

      {/* <VerticalCardProduct category={"sweater"} heading={"Sweaters"} />
      <VerticalCardProduct category={"top"} heading={"Top"} /> */}

      <EditorialSection />
    </div>
  );
};

export default Home;
