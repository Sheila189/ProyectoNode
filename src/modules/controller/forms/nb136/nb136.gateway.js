const { query } = require('../../../../utils/mysql');
const bcrypt = require('bcrypt');

const findAll = async () => {
  const sql = `SELECT * FROM form_nb_136`;
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing fields');
  const sql = `SELECT * FROM form_nb_136 WHERE id = ?`;

  return await query(sql, [id]);
};

const insert = async (formData) => {
  // Verifica los campos requeridos del formulario
  if (
    !formData.job_No ||
      !formData.name_jurisdiction ||
      !formData.address ||
      !formData.telephone ||
      !formData.name_owner ||
      !formData.address_owner ||
      !formData.name_contact ||
      !formData.email ||
      !formData.telephone_contact ||
      !formData.same_as ||
      !formData.stock_item ||
      !formData.name_installation ||
      !formData.address_installation ||
      !formData.date_installation ||
      !formData.unknown_installation ||
      !formData.name_manufacture ||
      !formData.data_report_yes ||
      !formData.data_report_no ||
      !formData.item_registered_yes ||
      !formData.item_registered ||
      !formData.item_registered_no ||
      !formData.type_item ||
      !formData.serial_item ||
      !formData.jurisdiction_item ||
      !formData.year_built ||
      !formData.dimensions ||
      !formData.mawp_psi ||
      !formData.safety_relief ||
      !formData.nameplate ||
      !formData.traceability ||
      !formData.name_user ||
      !formData.number_certificate ||
      !formData.date_replace ||
      !formData.date_jurisdictional ||
      !formData.nacional_board_commission ||
      !formData.number_jurisdictional ||
      !formData.name_user_certify ||
      !formData.number_certificate_certify ||
      !formData.date_replace_certify ||
      !formData.name_inspector ||
      !formData.employer ||
      !formData.date_inspector ||
      !formData.commission
  ) {
    throw Error('Missing Fields');
  }

  // Inserta los datos del formulario en la base de datos
  const sql = 'INSERT INTO form_nb136 (assesment_No, name, address, name_Organization, address_Organization, jurisdiction, information, equipment_Material, specifications, name_code, section, division, edition, addendum, firnedd_service, flaw_type, assessment_procedures, inspection_result, failure_modes, continued_operation, continue_operation_until, service_monitoring, operating_limitations, name_inspector, owner_name, date_owner, organization_name, date_engineer, verified, employer, date_inspector, commission ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const result = await query(sql, [
    formData.job_No,
    formData.name_jurisdiction,
    formData.address,
    formData.telephone,
    formData.name_owner,
    formData.address_owner,
    formData.name_contact,
    formData.email,
    formData.telephone_contact,
    formData.same_as,
    formData.stock_item,
    formData.name_installation,
    formData.address_installation,
    formData.date_installation,
    formData.unknown_installation,
    formData.name_manufacture,
    formData.data_report_yes,
    formData.data_report_no,
    formData.item_registered_yes,
    formData.item_registered,
    formData.item_registered_no,
    formData.type_item,
    formData.serial_item,
    formData.jurisdiction_item,
    formData.year_built,
    formData.dimensions,
    formData.mawp_psi,
    formData.safety_relief,
    formData.nameplate,
    formData.traceability,
    formData.name_user,
    formData.number_certificate,
    formData.date_replace,
    formData.date_jurisdictional,
    formData.nacional_board_commission,
    formData.number_jurisdictional,
    formData.name_user_certify,
    formData.number_certificate_certify,
    formData.date_replace_certify,
    formData.name_inspector,
    formData.employer,
    formData.date_inspector,
    formData.commission,
  ]);

  const nb136Id = result.insertId;

  return { ...formData, id: nb136Id };
};

const update = async (formData, id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  if (
    !formData.job_No ||
      !formData.name_jurisdiction ||
      !formData.address ||
      !formData.telephone ||
      !formData.name_owner ||
      !formData.address_owner ||
      !formData.name_contact ||
      !formData.email ||
      !formData.telephone_contact ||
      !formData.same_as ||
      !formData.stock_item ||
      !formData.name_installation ||
      !formData.address_installation ||
      !formData.date_installation ||
      !formData.unknown_installation ||
      !formData.name_manufacture ||
      !formData.data_report_yes ||
      !formData.data_report_no ||
      !formData.item_registered_yes ||
      !formData.item_registered ||
      !formData.item_registered_no ||
      !formData.type_item ||
      !formData.serial_item ||
      !formData.jurisdiction_item ||
      !formData.year_built ||
      !formData.dimensions ||
      !formData.mawp_psi ||
      !formData.safety_relief ||
      !formData.nameplate ||
      !formData.traceability ||
      !formData.name_user ||
      !formData.number_certificate ||
      !formData.date_replace ||
      !formData.date_jurisdictional ||
      !formData.nacional_board_commission ||
      !formData.number_jurisdictional ||
      !formData.name_user_certify ||
      !formData.number_certificate_certify ||
      !formData.date_replace_certify ||
      !formData.name_inspector ||
      !formData.employer ||
      !formData.date_inspector ||
      !formData.commission
  ) {
    throw Error('Missing Fields');
  }

  const sql = `UPDATE form_nb_136 SET assesment_No = ?, name = ?, address = ?, name_Organization = ?, address_Organization = ?, jurisdiction = ?, information = ?, equipment_Material = ?, specifications = ?, name_code = ?, section = ?, division = ?, edition = ?, addendum = ?, firnedd_service = ?, flaw_type = ?, assessment_procedures = ?, inspection_result = ?, failure_modes = ?, continued_operation = ?, continue_operation_until = ?, service_monitoring = ?, operating_limitations = ?, name_inspector = ?, owner_name = ?, date_owner = ?, organization_name  = ?, date_engineer  = ?, verified  = ?, employer  = ?, date_inspector  = ?, commission  = ? WHERE id = ?`;
  await query(sql, [
    formData.job_No,
    formData.name_jurisdiction,
    formData.address,
    formData.telephone,
    formData.name_owner,
    formData.address_owner,
    formData.name_contact,
    formData.email,
    formData.telephone_contact,
    formData.same_as,
    formData.stock_item,
    formData.name_installation,
    formData.address_installation,
    formData.date_installation,
    formData.unknown_installation,
    formData.name_manufacture,
    formData.data_report_yes,
    formData.data_report_no,
    formData.item_registered_yes,
    formData.item_registered,
    formData.item_registered_no,
    formData.type_item,
    formData.serial_item,
    formData.jurisdiction_item,
    formData.year_built,
    formData.dimensions,
    formData.mawp_psi,
    formData.safety_relief,
    formData.nameplate,
    formData.traceability,
    formData.name_user,
    formData.number_certificate,
    formData.date_replace,
    formData.date_jurisdictional,
    formData.nacional_board_commission,
    formData.number_jurisdictional,
    formData.name_user_certify,
    formData.number_certificate_certify,
    formData.date_replace_certify,
    formData.name_inspector,
    formData.employer,
    formData.date_inspector,
    formData.commission,
    id,
  ]);

  return { ...formData, id: id };
};

const remove = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  const sql = `DELETE FROM form_nb_136 WHERE id = ?`;
  await query(sql, [id]);

  return { idDeleted: id };
};

module.exports = { findAll, findById, insert, update, remove };
