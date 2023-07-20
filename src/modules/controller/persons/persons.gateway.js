const { query } = require('../../../utils/mysql');
const fs = require('fs');

const findAll = async () => {
  const sql = `SELECT * FROM persons`;
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing fields');
  const sql = `SELECT * FROM persons WHERE id = ?`;

  return await query(sql, [id]);
};

const insert = async (person) => {
  // Verifica los campos requeridos de la persona
  if (
    !person.name ||
    !person.lastname ||
    !person.middle ||
    !person.signaturePath ||
    !person.logoPath ||
    !person.name_empresa
  ) {
    throw Error('Missing Fields');
  }

  // Lee el archivo de imagen de firma en formato binario
  const signatureImage = fs.readFileSync(person.signaturePath);
  // Lee el archivo de imagen de logo en formato binario
  const logoImage = fs.readFileSync(person.logoPath);

  // Inserta la persona en la base de datos
  const sql = `INSERT INTO persons (name, lastname, middle, signature, logo, name_empresa) VALUES (?, ?, ?, ?, ?, ?)`;
  const result = await query(sql, [
    person.name,
    person.lastname,
    person.middle,
    signatureImage,
    logoImage,
    person.name_empresa
  ]);

  const personId = result.insertId;

  return { ...person, id: personId};
};

const update = async (person, id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  if (
    !person.name ||
    !person.lastname ||
    !person.middle ||
    !person.signature ||
    !person.logo ||
    !person.name_empresa
  )
    throw Error('Missing Fields');

  const sql = `UPDATE persons SET name = ?, lastname = ?, middle = ?, signature = ?, logo = ?, name_empresa = ? WHERE id = ?`;
  await query(sql, [
    person.name,
    person.lastname,
    person.middle,
    person.signature,
    person.logo,
    person.name_empresa,
    id,
  ]);

  // Actualiza el usuario correspondiente en el módulo de usuarios
  const { update: updateUser } = require('./users.controller'); // Importa la función update del módulo de usuarios
  const user = {
    email: person.email,
    password: person.password,
    rol_id: 3, // rol_client por defult
    person_id: id,
  };
  const updatedUser = await updateUser(user, id); // Actualiza el usuario

  return { ...person, id: id, user: updatedUser };
};

const remove = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  const sql = `DELETE FROM persons WHERE id = ?`;
  await query(sql, [id]);

  // Elimina el usuario correspondiente en el módulo de usuarios
  const { remove: removeUser } = require('./users.controller'); // Importa la función remove del módulo de usuarios
  const deletedUser = await removeUser(id); // Elimina el usuario

  return { idDeleted: id, user: deletedUser };
};

module.exports = { findAll, findById, insert, update, remove };
