# 🧶 AMRY LUXE - Tienda de Ropa Crochet Artesanal

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-000000?style=for-the-badge&logo=react" alt="MERN Stack">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Payments-Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
</p>

<p align="center">
  <strong>Plataforma e-commerce de ropa crochet artesanal hecha a mano en Lima, Perú</strong>
</p>

<p align="center">
  <a href="https://github.com/karlosystem/AMRYLUX-TIENDA-CROCHET">Ver Repositorio</a>
  ·
  <a href="#-instalación">Instalación</a>
  ·
  <a href="#-características">Características</a>
  ·
  <a href="#-tecnologías">Tecnologías</a>
</p>

---

## 📖 Sobre el Proyecto

**AMRY LUXE** es una tienda virtual especializada en prendas de crochet artesanales, diseñada y desarrollada para ofrecer una experiencia de compra elegante y moderna. Cada prenda es tejida a mano por artesanas peruanas utilizando técnicas tradicionales y materiales de la más alta calidad.

La plataforma permite a los usuarios explorar colecciones de sweaters, tops, vestidos, enterizos y más, con un sistema de carrito de compras, pasarela de pagos con Stripe, y gestión completa de pedidos.

---

## ✨ Características Principales

### 🛍️ Tienda Online
- **Catálogo de productos** organizado por categorías (Sweaters, Tops, Vestidos, Enterizos, Blusas, etc.)
- **Filtros avanzados** por categoría, precio (menor a mayor / mayor a menor)
- **Paginación** de productos para mejor rendimiento
- **Búsqueda** de productos por nombre

###  Experiencia de Usuario
- **Diseño responsive** adaptado a móvil, tablet y desktop
- **Zoom de imágenes** en la página de detalle del producto
- **URLs amigables** con slugs para mejor SEO (`/product/sweater-crochet-emmy-celeste`)
- **SEO dinámico** con meta tags personalizados por producto
- **Schema.org** para Rich Snippets en Google

###  Carrito de Compras
- Agregar/eliminar productos del carrito
- Modificar cantidades
- Cálculo automático de totales
- Envío gratis en pedidos superiores a S/ 100

### 💳 Pagos
- Integración con **Stripe Checkout**
- Soporte para tarjetas de crédito/débito
- Webhook para confirmación automática de pagos
- Limpieza automática del carrito post-compra

### 👤 Sistema de Usuarios
- Registro e inicio de sesión
- Perfiles de usuario con foto
- Historial de pedidos
- Roles: **ADMIN** y **GENERAL**

### 📦 Panel de Administración
- Gestión de productos (CRUD completo)
- Gestión de usuarios
- Visualización de todos los pedidos
- Subida de imágenes a **Cloudinary**

### 📱 Comunicación
- **Botón flotante de WhatsApp** con mensaje predefinido
- Atención al cliente directa
- Links a redes sociales (Facebook, Instagram, TikTok, YouTube)

---

## 🛠️ Tecnologías

### Frontend
- **React 19** - Librería de UI
- **React Router DOM 7** - Navegación
- **Redux Toolkit** - Manejo de estado global
- **TailwindCSS 3** - Estilos
- **React Helmet Async** - SEO dinámico
- **React Toastify** - Notificaciones
- **React Icons** - Iconografía
- **Moment.js** - Formateo de fechas

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Stripe** - Pasarela de pagos
- **Nodemailer** - Envío de correos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Cloudinary** - Almacenamiento de imágenes

### Herramientas
- **Git & GitHub** - Control de versiones
- **VS Code** - Editor de código
- **Postman** - Testing de APIs
- **MongoDB Atlas** - Base de datos en la nube

---

## 📂 Estructura del Proyecto
