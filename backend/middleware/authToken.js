const JWT = require('jsonwebtoken'); // ⚡ IMPORTANTE: Importa JWT arriba

async function authToken(req, res, next) {
    try {
        // 1. Extraemos el token de la cookie
        const token = req.cookies?.token; 

        // Si no hay token, el usuario no está logueado
        if (!token) {
            return res.status(200).json({
                message: "Por favor, inicie sesión",
                error: true,
                success: false
            });
        }

        // 2. Verificamos si el token es legítimo usando la llave secreta del .env
        JWT.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log("Error al verificar token:", err);
                return res.status(400).json({
                    message: "Sesión inválida o expirada",
                    error: true,
                    success: false
                });
            }

            // 3. Si todo está bien, inyectamos el ID del usuario en la petición (req)
            req.userId = decoded?._id;

            // 4. ⚡ ¡VITAL! Le decimos a Express que continúe al controlador final
            next(); 
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;