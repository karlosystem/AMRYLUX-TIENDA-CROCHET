const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const connectDB = require("./config/db");
const router = require('./routes');
// Importamos el controlador del webhook de Stripe
const webhooks = require('./controllers/order/webhook');

const app = express();

// 1. Configuración de CORS (Siempre al principio)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// 2. Lector de Cookies
app.use(cookieParser());

// 3. Webhook de Stripe (⚠️ DEBE IR ANTES de express.json)
// Stripe necesita el body RAW (sin parsear) para verificar la firma criptográfica
app.post("/api/webhook", express.raw({ type: "application/json" }), webhooks);

// 4. Traductores de cuerpo de petición (Para el RESTO de las rutas)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 5. Tus rutas de la API
app.use("/api", router);

// 6. Ruta de health check para verificar que el backend está funcionando
app.get("/", (req, res) => {
  res.json({ 
    message: "AMRYLUXE API - Backend corriendo en Vercel",
    timestamp: new Date().toISOString(),
    status: "OK"
  });
});

// ============================================
// ️ IMPORTANTE PARA VERCEL:
// ============================================

// Exportar la app para Vercel (serverless functions)
module.exports = app;

// Solo escuchar en desarrollo local o cuando NO está en Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("✅ Conectado a la base de datos exitosamente");
      console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
    });
  });
} else {
  // En producción (Vercel), solo conectamos a la DB
  connectDB().then(() => {
    console.log("✅ Conectado a la base de datos exitosamente");
  }).catch((err) => {
    console.error("❌ Error conectando a la base de datos:", err);
  });
}