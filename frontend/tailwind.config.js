/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 1. Tipografías personalizadas para AMRYLUXE
      fontFamily: {
        serif: ['"Playfair Display"', "serif"], // Para títulos elegantes (H1, H2)
        sans: ['"Inter"', "sans-serif"], // Para textos limpios y modernos
      },
      // 2. Paleta de colores de la marca
      colors: {
        amryluxe: {
          black: "#111111", // Negro suave (el mismo que usamos en el Footer)
          gold: "#C5A059", // Un dorado champán sutil para acentos de lujo
          cream: "#FAFAFA", // Un blanco roto/crema para fondos alternos
        },
      },
      // 3. Espaciado de letras (Tracking) para ese look "Revista de Moda"
      letterSpacing: {
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};
