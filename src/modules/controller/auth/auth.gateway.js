const { query } = require("../../../utils/mysql");
const { generateToken } = require("../../../config/jwt");
const { validatePassword } = require("../../../utils/functions");

const login = async (req) => {
  const email = req && req.body && req.body.email;
  const password = req && req.body && req.body.password;

  const sql = `SELECT * FROM users WHERE email = ? AND status = 1`;
  const existUser = await query(sql, [email]);

  // Verificar si el usuario existe
  if (existUser.length === 0) {
    return {
      error: "Usuario no encontrado"
    };
  }

  const user = existUser[0];

  // Verificar si la contraseña es válida
  const isPasswordValid = user && user.password ? await validatePassword(password, user.password) : false;

  if (isPasswordValid) {
    // La contraseña es válida
    // Generar el token de autenticación
    const token = generateToken({
      id: user.id,
      email: user.email,
      status: user.status,
      rol_id: user.rol_id
    });

    return {
      token,
      rol_id: user.rol_id
    };
  } else {
    // La contraseña es incorrecta o el usuario no existe
    return {
      error: "Credenciales inválidas"
    };
  }
};

module.exports = { login };
