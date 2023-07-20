const { query } = require('../../../../utils/mysql');
const bcrypt = require('bcrypt');

const findAll = async () => {
  const sql = `SELECT * FROM form_nb_4`;
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing fields');
  const sql = `SELECT * FROM form_nb_4 WHERE id = ?`;

  return await query(sql, [id]);
};

const insert = async (formData) => {
  // Verifica los campos requeridos del formulario
  if (
    !formData.jurisdiction ||
    !formData.date_service ||
    !formData.noticeOf ||
    !formData.effective_Date ||
    !formData.typeObject ||
    !formData.object ||
    !formData.ownersNo ||
    !formData.jurisdictionNo ||
    !formData.national_BoardNo ||
    !formData.name_Manufacturer ||
    !formData.name_Owner ||
    !formData.name_Owner_Country ||
    !formData.location_Object_Country ||
    !formData.user_Object ||
    !formData.date_Last_Certificate ||
    !formData.certificateIssued ||
    !formData.reasonDiscontinuance ||
    !formData.chief_inspector ||
    !formData.branch_office
  ) {
    throw Error('Missing Fields');
  }

  // Inserta los datos del formulario en la base de datos
  const sql = `INSERT INTO form_nb_4 (jurisdiction, date_service, noticeOf, effective_Date, typeObject, object, ownersNo, jurisdictionNo, national_BoardNo, name_Manufacturer, name_Owner, name_Owner_Country, location_Object_Country, user_Object, date_Last_Certificate, certificateIssued, reasonDiscontinuance, chief_inspector, branch_office) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const result = await query(sql, [
    formData.jurisdiction,
    formData.date_service,
    formData.noticeOf,
    formData.effective_Date,
    formData.typeObject,
    formData.object,
    formData.ownersNo,
    formData.jurisdictionNo,
    formData.national_BoardNo,
    formData.name_Manufacturer,
    formData.name_Owner,
    formData.name_Owner_Country,
    formData.location_Object_Country,
    formData.user_Object,
    formData.date_Last_Certificate,
    formData.certificateIssued,
    formData.reasonDiscontinuance,
    formData.chief_inspector,
    formData.branch_office,
  ]);

  const nb4Id = result.insertId;

  return { ...formData, id: nb4Id };
};

const update = async (formData, id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  if (
    !formData.jurisdiction ||
    !formData.date_service ||
    !formData.noticeOf ||
    !formData.effective_Date ||
    !formData.typeObject ||
    !formData.object ||
    !formData.ownersNo ||
    !formData.jurisdictionNo ||
    !formData.national_BoardNo ||
    !formData.name_Manufacturer ||
    !formData.name_Owner ||
    !formData.name_Owner_Country ||
    !formData.location_Object_Country ||
    !formData.user_Object ||
    !formData.date_Last_Certificate ||
    !formData.certificateIssued ||
    !formData.reasonDiscontinuance ||
    !formData.chief_inspector ||
    !formData.branch_office
  ) {
    throw Error('Missing Fields');
  }

  const sql = `UPDATE form_nb_4 SET jurisdiction = ?, date_service = ?, noticeOf = ?, effective_Date = ?, typeObject = ?, object = ?, ownersNo = ?, jurisdictionNo = ?, national_BoardNo = ?, name_Manufacturer = ?, name_Owner = ?, name_Owner_Country = ?, location_Object_Country = ?, user_Object = ?, date_Last_Certificate = ?, certificateIssued = ?, reasonDiscontinuance = ?, chief_inspector = ?, branch_office = ? WHERE id = ?`;
  await query(sql, [
    formData.jurisdiction,
    formData.date_service,
    formData.noticeOf,
    formData.effective_Date,
    formData.typeObject,
    formData.object,
    formData.ownersNo,
    formData.jurisdictionNo,
    formData.national_BoardNo,
    formData.name_Manufacturer,
    formData.name_Owner,
    formData.name_Owner_Country,
    formData.location_Object_Country,
    formData.user_Object,
    formData.date_Last_Certificate,
    formData.certificateIssued,
    formData.reasonDiscontinuance,
    formData.chief_inspector,
    formData.branch_office,
    id,
  ]);

  return { ...formData, id: id };
};

const remove = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  const sql = `DELETE FROM form_nb_4 WHERE id = ?`;
  await query(sql, [id]);

  return { idDeleted: id };
};

module.exports = { findAll, findById, insert, update, remove };
