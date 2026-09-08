import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import SummaryApi from "../common";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    celular: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(SummaryApi.contactForm.url, {
        method: SummaryApi.contactForm.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          nombres: "",
          apellidos: "",
          email: "",
          celular: "",
          mensaje: "",
        });

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(
          data.message || "Error al enviar el mensaje. Inténtalo de nuevo.",
        );
      }
    } catch (err) {
      setError(
        "Error de conexión. Por favor, verifica tu internet e inténtalo de nuevo.",
      );
      console.error("Error al enviar formulario:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Contacto | AMRY LUXE - Tienda de Ropa Crochet en Lima</title>
        <meta
          name="description"
          content="Contáctanos en AMRY LUXE. Jr. Maximiliano Velarde 171, Surco, Lima. Tel: +51 994 148 453. Email: contacto@amryluxe.com.pe Horario: Lun-Vie 9am-6pm. ¡Estamos para ayudarte!"
        />
      </Helmet>
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-xs text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 transition-colors">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">Contáctenos</span>
          </nav>
        </div>
      </div>

      {/* Header de Página */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-4">
            Contáctenos
          </h1>
          <div className="w-24 h-px bg-neutral-300 mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Estamos aquí para ayudarte. Completa el formulario y nos pondremos
            en contacto contigo lo antes posible para brindarte una atención
            personalizada.
          </p>
        </div>

        {/* Mensajes de Éxito / Error */}
        {success && (
          <div className="max-w-3xl mx-auto mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-sm flex items-center gap-3">
            <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
            <p className="text-sm">
              Mensaje enviado correctamente. Nos pondremos en contacto contigo
              pronto.
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-sm flex items-center gap-3">
            <FaExclamationCircle className="text-red-600 text-xl flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Información de Contacto */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Dirección */}
          <div className="bg-neutral-50 border border-neutral-200 p-8 text-center hover:shadow-lg transition-shadow duration-300 rounded-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center border border-neutral-300">
              <FaMapMarkerAlt className="text-2xl text-neutral-600" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-2 uppercase tracking-wider text-sm">
              Dirección
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Jr. Maximiliano Velarde 171, Surco
              <br />
              Lima, Perú
            </p>
          </div>

          {/* Email */}
          <div className="bg-neutral-50 border border-neutral-200 p-8 text-center hover:shadow-lg transition-shadow duration-300 rounded-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center border border-neutral-300">
              <FaEnvelope className="text-2xl text-neutral-600" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-2 uppercase tracking-wider text-sm">
              Email
            </h3>
            <p className="text-neutral-600 text-sm">
              <a
                href="mailto:contacto@amryluxe.com"
                className="hover:text-neutral-900 transition-colors"
              >
                contacto@amryluxe.com
              </a>
            </p>
          </div>

          {/* Teléfono */}
          <div className="bg-neutral-50 border border-neutral-200 p-8 text-center hover:shadow-lg transition-shadow duration-300 rounded-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center border border-neutral-300">
              <FaPhone className="text-2xl text-neutral-600" />
            </div>
            <h3 className="font-medium text-neutral-900 mb-2 uppercase tracking-wider text-sm">
              Teléfono
            </h3>
            <p className="text-neutral-600 text-sm">
              <a
                href="tel:+51994148453"
                className="hover:text-neutral-900 transition-colors"
              >
                +51 994 148 453
              </a>
            </p>
          </div>
        </div>

        {/* Horario de Atención */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-neutral-50 border border-neutral-200 p-6 flex items-center gap-4 rounded-sm">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-neutral-300">
                <FaClock className="text-neutral-600" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 mb-1 uppercase tracking-wider text-sm">
                Horario de Atención
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Lunes a Viernes: 9:00 am - 6:00 pm
                <br />
                Sábados: 9:00 am - 1:00 pm
              </p>
            </div>
          </div>
        </div>

        {/* Formulario y Mapa */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Formulario de Contacto */}
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl text-neutral-900 mb-2">
              ¿Alguna Otra Consulta?
            </h2>
            <p className="text-neutral-600 text-sm mb-8">
              Utilice el siguiente formulario para ponerse en contacto con
              nuestro equipo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2">
                    Nombres *
                  </label>
                  <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition-colors rounded-sm bg-white"
                    placeholder="Ingrese sus nombres"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition-colors rounded-sm bg-white"
                    placeholder="Ingrese sus apellidos"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition-colors rounded-sm bg-white"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2">
                    Número de Celular *
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition-colors rounded-sm bg-white"
                    placeholder="999 999 999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900 transition-colors resize-none rounded-sm bg-white"
                  placeholder="Escriba su mensaje aquí..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-neutral-900 text-white px-8 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-all duration-300 rounded-sm w-full md:w-auto flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar Mensaje"
                )}
              </button>
            </form>
          </div>

          {/* Mapa de Google */}
          <div className="lg:h-[600px] bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200">
            <iframe
              width="100%"
              height="100%"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.4091784014176!2d-77.01108868585466!3d-12.152521747183998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA5JzA5LjEiUyA3N8KwMDAnMzIuMCJX!5e0!3m2!1ses-419!2spe!4v1503432197089"
              frameBorder="0"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              title="Ubicación AMRY LUXE"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;