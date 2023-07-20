const { query } = require('../../../../utils/mysql');
const bcrypt = require('bcrypt');

const findAll = async () => {
  const sql = `SELECT * FROM form_nb_403`;
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing fields');
  const sql = `SELECT * FROM form_nb_403 WHERE id = ?`;

  return await query(sql, [id]);
};

const insert = async (formData) => {
  // Verifica los campos requeridos del formulario
  if (
    !formData.assesment_No ||
      !formData.name ||
      !formData.address ||
      !formData.name_Organization ||
      !formData.address_Organization ||
      !formData.jurisdiction ||
      !formData.information ||
      !formData.equipment_Material ||
      !formData.specifications ||
      !formData.name_code ||
      !formData.section ||
      !formData.division ||
      !formData.edition ||
      !formData.addendum ||
      !formData.firnedd_service ||
      !formData.flaw_type ||
      !formData.assessment_procedures ||
      !formData.inspection_result ||
      !formData.failure_modes ||
      !formData.continued_operation ||
      !formData.repair_operation ||
      !formData.replace_operation ||
      !formData.continue_operation ||
      !formData.continue_operation_until ||
      !formData.service_monitoring ||
      !formData.operating_limitations ||
      !formData.name_inspector ||
      !formData.owner_name ||
      !formData.date_owner ||
      !formData.organization_name ||
      !formData.date_engineer ||
      !formData.verified ||
      !formData.employer ||
      !formData.date_inspector ||
      !formData.commission
  ) {
    throw Error('Missing Fields');
  }

  // Inserta los datos del formulario en la base de datos
  const sql = 'INSERT INTO form_nb403 (assesment_No, name, address, name_Organization, address_Organization, jurisdiction, information, equipment_Material, specifications, name_code, section, division, edition, addendum, firnedd_service, flaw_type, assessment_procedures, inspection_result, failure_modes, continued_operation, continue_operation_until, service_monitoring, operating_limitations, name_inspector, owner_name, date_owner, organization_name, date_engineer, verified, employer, date_inspector, commission ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const result = await query(sql, [
    formData.assesment_No,
      formData.name,
      formData.address,
      formData.name_Organization,
      formData.address_Organization,
      formData.jurisdiction,
      formData.information,
      formData.equipment_Material,
      formData.specifications,
      formData.name_code,
      formData.section,
      formData.division,
      formData.edition,
      formData.addendum,
      formData.firnedd_service,
      formData.flaw_type,
      formData.assessment_procedures,
      formData.inspection_result,
      formData.failure_modes,
      formData.continued_operation,
      formData.repair_operation,
      formData.replace_operation,
      formData.continue_operation,
      formData.continue_operation_until,
      formData.service_monitoring,
      formData.operating_limitations,
      formData.name_inspector,
      formData.owner_name,
      formData.date_owner,
      formData.organization_name,
      formData.date_engineer,
      formData.verified,
    formData.employer,
      formData.date_inspector,
      formData.commission
  ]);

  const nb403Id = result.insertId;

  return { ...formData, id: nb403Id };
};

const update = async (formData, id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  if (
    !formData.assesment_No ||
      !formData.name ||
      !formData.address ||
      !formData.name_Organization ||
      !formData.address_Organization ||
      !formData.jurisdiction ||
      !formData.information ||
      !formData.equipment_Material ||
      !formData.specifications ||
      !formData.name_code ||
      !formData.section ||
      !formData.division ||
      !formData.edition ||
      !formData.addendum ||
      !formData.firnedd_service ||
      !formData.flaw_type ||
      !formData.assessment_procedures ||
      !formData.inspection_result ||
      !formData.failure_modes ||
      !formData.continued_operation ||
      !formData.repair_operation ||
      !formData.replace_operation ||
      !formData.continue_operation ||
      !formData.continue_operation_until ||
      !formData.service_monitoring ||
      !formData.operating_limitations ||
      !formData.name_inspector ||
      !formData.owner_name ||
      !formData.date_owner ||
      !formData.organization_name ||
      !formData.date_engineer ||
      !formData.verified ||
      !formData.employer ||
      !formData.date_inspector ||
      !formData.commission
  ) {
    throw Error('Missing Fields');
  }

  const sql = `UPDATE form_nb_403 SET assesment_No = ?, name = ?, address = ?, name_Organization = ?, address_Organization = ?, jurisdiction = ?, information = ?, equipment_Material = ?, specifications = ?, name_code = ?, section = ?, division = ?, edition = ?, addendum = ?, firnedd_service = ?, flaw_type = ?, assessment_procedures = ?, inspection_result = ?, failure_modes = ?, continued_operation = ?, continue_operation_until = ?, service_monitoring = ?, operating_limitations = ?, name_inspector = ?, owner_name = ?, date_owner = ?, organization_name = ?, date_engineer = ?, verified = ?, employer = ?, date_inspector = ?, commission = ? WHERE id = ?`;
  await query(sql, [
    formData.assesment_No,
      formData.name,
      formData.address,
      formData.name_Organization,
      formData.address_Organization,
      formData.jurisdiction,
      formData.information,
      formData.equipment_Material,
      formData.specifications,
      formData.name_code,
      formData.section,
      formData.division,
      formData.edition,
      formData.addendum,
      formData.firnedd_service,
      formData.flaw_type,
      formData.assessment_procedures,
      formData.inspection_result,
      formData.failure_modes,
      formData.continued_operation,
      formData.repair_operation,
      formData.replace_operation,
      formData.continue_operation,
      formData.continue_operation_until,
      formData.service_monitoring,
      formData.operating_limitations,
      formData.name_inspector,
      formData.owner_name,
      formData.date_owner,
      formData.organization_name,
      formData.date_engineer,
      formData.verified,
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
  const sql = `DELETE FROM form_nb_403 WHERE id = ?`;
  await query(sql, [id]);

  return { idDeleted: id };
};

module.exports = { findAll, findById, insert, update, remove };
