const { query } = require('../../../utils/mysql');
const { hashPassword } = require('../../../utils/functions');

const { sendConfirmationEmail } = require('../../../utils/emailServer'); // Importa la función sendConfirmationEmail
//const { insert } = require('../persons/persons.gateway');

const findAll = async () => {
  const sql = `SELECT * FROM users`;
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing fields');
  const sql = `SELECT * FROM users WHERE id=?`;

  return await query(sql, [id]);
};

const save = async (user, personId) => {
  if (!user.email || !user.password || !user.rol_id || !user.person_id)
    throw Error('Missing fields');
  
  const hashPass = await hashPassword(user.password);

  const sql = `INSERT INTO users (email, password, rol_id, person_id) VALUES (?, ?, ?, ?)`;
  const result = await query(sql, [
    user.email,
    hashPass,
    user.rol_id,
    personId
  ]);

  // Envía el correo electrónico de confirmación
  const confirmationLink = `http://localhost:3000/confirmar?token=${generateToken()}`;
  sendConfirmationEmail(user.email, confirmationLink);

  //delete user.password;
  const userId = result.insertId;

  return { ...user, id: userId };
};

const update = async (user, id) => {
    // Valida que el parámetro 'id' sea un número
    if (Number.isNaN(id)) throw Error("Wrong Type");
    // Valida que el parámetro 'id' no esté vacío
    if (!id) throw Error("Missing Fields");
    // Valida que los campos obligatorios 'email', 'password', 'status' y 'person_id' no estén vacíos
    if (
      !user.email ||
      !user.password ||
      !user.status ||
      !user.person_id
    ) {
      throw Error("Missing Fields");
    }
    // Construye la consulta SQL para actualizar los datos del usuario
    const sql = `UPDATE users SET email=?, password=?, status=?, person_id=?, rol_id=? WHERE id=?`;
    // Ejecuta la consulta SQL con los parámetros correspondientes
    await query(sql, [
      user.email,
      user.password,
      user.status,
      user.person_id,
      user.rol_id,
      id
    ]);
    // Valida el valor del campo 'status' para asignarle el valor correspondiente
    if (user.status === "1") {
      user.status = "Activo";
    } else if (user.status === "0") {
      user.status = "Inactivo";
    }
  
    console.log(user.status);
    // Devuelve el objeto del usuario actualizado, incluyendo el ID
    return { ...user, id: id };
  };  

const remove = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  const sql = `DELETE FROM users WHERE id=?`;
  await query(sql, [id]);

  return { idDeleted: id };
};

module.exports = { findAll, findById, save, update, remove };

