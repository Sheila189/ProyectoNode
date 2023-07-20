const { query } = require('../../../../utils/mysql');
const bcrypt = require('bcrypt');

const findAll = async () => {
  const sql = `SELECT * FROM form_nb_6`;
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing fields');
  const sql = `SELECT * FROM form_nb_6 WHERE id = ?`;

  return await query(sql, [id]);
};

const insert = async (formData) => {
  // Verifica los campos requeridos del formulario
  if (
    !formData.month_inspected ||
      !formData.day_inspected ||
      !formData.year_inspected ||
      !formData.month_cert ||
      !formData.year_cert ||
      !formData.certificate_posted_yes ||
      !formData.certificate_posted_no ||
      !formData.owner_n ||
      !formData.jurisdiction_number ||
      !formData.natl_bd_n ||
      !formData.other_n ||
      !formData.owner_name ||
      !formData.nature_business ||
      !formData.internal ||
      !formData.external ||
      !formData.certificate_inspection_yes ||
      !formData.certificate_inspection_no ||
      !formData.owner_address ||
      !formData.owner_city ||
      !formData.owner_state ||
      !formData.owner_zip ||
      !formData.user_name ||
      !formData.specific_location ||
      !formData.object_location ||
      !formData.user_address ||
      !formData.user_city ||
      !formData.user_state ||
      !formData.user_zip ||
      !formData.certificate_name ||
      !formData.certificate_company_contac ||
      !formData.email ||
      !formData.certificate_address ||
      !formData.certificate_city ||
      !formData.certificate_state ||
      !formData.certificate_zip ||
      !formData.ft ||
      !formData.wt ||
      !formData.ci ||
      !formData.other ||
      !formData.other_text ||
      !formData.year_built || 
      !formData.manufacturer ||
      !formData.power ||
      !formData.process_use ||
      !formData.steam_htg ||
      !formData.hws ||
      !formData.hwh ||
      !formData.other_use ||
      !formData.other_use_text ||
      !formData.fuel ||
      !formData.method_firing ||
      !formData.pressure_gage_yes ||
      !formData.pressure_gage_no ||
      !formData.mawp ||
      !formData.this_inspection ||
      !formData.prev_inspection ||
      !formData.set_at ||
      !formData.total_capacity ||
      !formData.heating_surface ||
      !formData.condition_object_yes ||
      !formData.condition_object_no ||
      !formData.pressure_test_yes ||
      !formData.yes_psi ||
      !formData.date_test ||
      !formData.pressure_test_no ||
      !formData.conditions ||
      !formData.requirements ||
      !formData.name_title_person ||
      !formData.ident_inspector ||
      !formData.employed_by ||
      !formData.ident_employed
  ) {
    throw Error('Missing Fields');
  }

  // Inserta los datos del formulario en la base de datos
  const sql = 'INSERT INTO form_nb6 ( month_inspected, day_inspected, year_inspected, month_cert, year_cert, certificate_posted_yes, certificate_posted_no, owner_n, jurisdiction_number, natl_bd_n, other_n, owner_name, nature_business, internal, external, certificate_inspection_yes, certificate_inspection_no, owner_address, owner_city, owner_state, owner_zip, user_name, specific_location, object_location, user_address, user_city, user_state, user_zip, certificate_name, certificate_company_contac, email, certificate_address, certificate_city, certificate_state, certificate_zip, ft, wt, ci, other, other_text, year_built, manufacturer, power, process_use, steam_htg, hws, hwh, other_use, other_use_text, fuel, method_firing, pressure_gage_yes, pressure_gage_no, mawp, this_inspection, prev_inspection, set_at, total_capacity, heating_surface, condition_object_yes, condition_object_no, pressure_test_yes, yes_psi, date_test, pressure_test_no, conditions, requirements, name_title_person, ident_inspector, employed_by, ident_employed) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  const result = await query(sql, [
    formData.month_inspected,
    formData.day_inspected,
    formData.year_inspected,
    formData.month_cert,
    formData.year_cert,
    formData.certificate_posted_yes,
    formData.certificate_posted_no,
    formData.owner_n,
    formData.jurisdiction_number,
    formData.natl_bd_n,
    formData.other_n,
    formData.owner_name,
    formData.nature_business,
    formData.internal,
    formData.external,
    formData.certificate_inspection_yes,
    formData.certificate_inspection_no,
    formData.owner_address,
    formData.owner_city,
    formData.owner_state,
    formData.owner_zip,
    formData.user_name,
    formData.specific_location,
    formData.object_location,
    formData.user_address,
    formData.user_city,
    formData.user_state,
    formData.user_zip,
    formData.certificate_name,
    formData.certificate_company_contac,
    formData.email,
    formData.certificate_address,
    formData.certificate_city,
    formData.certificate_state,
    formData.certificate_zip,
    formData.ft,
    formData.wt,
    formData.ci,
    formData.other,
    formData.other_text,
    formData.year_built,
    formData.manufacturer,
    formData.power,
    formData.process_use,
    formData.steam_htg,
    formData.hws,
    formData.hwh,
    formData.other_use,
    formData.other_use_text,
    formData.fuel,
    formData.method_firing,
    formData.pressure_gage_yes,
    formData.pressure_gage_no,
    formData.mawp,
    formData.this_inspection,
    formData.prev_inspection,
    formData.set_at,
    formData.total_capacity,
    formData.heating_surface,
    formData.condition_object_yes,
    formData.condition_object_no,
    formData.pressure_test_yes,
    formData.yes_psi,
    formData.date_test,
    formData.pressure_test_no,
    formData.conditions,
    formData.requirements,
    formData.name_title_person,
    formData.ident_inspector,
    formData.employed_by,
    formData.ident_employed,
  ]);

  const nb6Id = result.insertId;

  return { ...formData, id: nb6Id };
};

const update = async (formData, id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  if (
    !formData.month_inspected ||
      !formData.day_inspected ||
      !formData.year_inspected ||
      !formData.month_cert ||
      !formData.year_cert ||
      !formData.certificate_posted_yes ||
      !formData.certificate_posted_no ||
      !formData.owner_n ||
      !formData.jurisdiction_number ||
      !formData.natl_bd_n ||
      !formData.other_n ||
      !formData.owner_name ||
      !formData.nature_business ||
      !formData.internal ||
      !formData.external ||
      !formData.certificate_inspection_yes ||
      !formData.certificate_inspection_no ||
      !formData.owner_address ||
      !formData.owner_city ||
      !formData.owner_state ||
      !formData.owner_zip ||
      !formData.user_name ||
      !formData.specific_location ||
      !formData.object_location ||
      !formData.user_address ||
      !formData.user_city ||
      !formData.user_state ||
      !formData.user_zip ||
      !formData.certificate_name ||
      !formData.certificate_company_contac ||
      !formData.email ||
      !formData.certificate_address ||
      !formData.certificate_city ||
      !formData.certificate_state ||
      !formData.certificate_zip ||
      !formData.ft ||
      !formData.wt ||
      !formData.ci ||
      !formData.other ||
      !formData.other_text ||
      !formData.year_built || 
      !formData.manufacturer ||
      !formData.power ||
      !formData.process_use ||
      !formData.steam_htg ||
      !formData.hws ||
      !formData.hwh ||
      !formData.other_use ||
      !formData.other_use_text ||
      !formData.fuel ||
      !formData.method_firing ||
      !formData.pressure_gage_yes ||
      !formData.pressure_gage_no ||
      !formData.mawp ||
      !formData.this_inspection ||
      !formData.prev_inspection ||
      !formData.set_at ||
      !formData.total_capacity ||
      !formData.heating_surface ||
      !formData.condition_object_yes ||
      !formData.condition_object_no ||
      !formData.pressure_test_yes ||
      !formData.yes_psi ||
      !formData.date_test ||
      !formData.pressure_test_no ||
      !formData.conditions ||
      !formData.requirements ||
      !formData.name_title_person ||
      !formData.ident_inspector ||
      !formData.employed_by ||
      !formData.ident_employed
  ) {
    throw Error('Missing Fields');
  }

  const sql = `UPDATE form_nb_6 SET month_inspected = ?, day_inspected = ?, year_inspected = ?, month_cert = ?, year_cert = ?, certificate_posted_yes = ?, certificate_posted_no = ?, owner_n = ?, jurisdiction_number = ?, natl_bd_n = ?, other_n = ?, owner_name = ?, nature_business = ?, internal = ?, external = ?, certificate_inspection_yes = ?, certificate_inspection_no = ?, owner_address = ?, owner_city = ?, owner_state = ?, owner_zip = ?, user_name = ?, specific_location = ?, object_location = ?, user_address = ?, user_city = ?, user_state = ?, user_zip = ?, certificate_name = ?, certificate_company_contac = ?, email = ?, certificate_address = ?, certificate_city = ?, certificate_state = ?, certificate_zip = ?, ft = ?, wt = ?, ci = ?, other = ?, other_text = ?, year_built = ?, manufacturer = ?, power = ?, process_use = ?, steam_htg = ?, hws = ?, hwh = ?, other_use = ?, other_use_text = ?, fuel = ?, method_firing = ?, pressure_gage_yes = ?, pressure_gage_no = ?, mawp = ?, this_inspection = ?, prev_inspection = ?, set_at = ?, total_capacity = ?, heating_surface = ?, condition_object_yes = ?, condition_object_no = ?, pressure_test_yes = ?, yes_psi = ?, date_test = ?, pressure_test_no = ?, conditions = ?, requirements = ?, name_title_person = ?, ident_inspector = ?, employed_by = ?, ident_employed = ? WHERE id = ?`;
  await query(sql, [
    formData.month_inspected,
    formData.day_inspected,
    formData.year_inspected,
    formData.month_cert,
    formData.year_cert,
    formData.certificate_posted_yes,
    formData.certificate_posted_no,
    formData.owner_n,
    formData.jurisdiction_number,
    formData.natl_bd_n,
    formData.other_n,
    formData.owner_name,
    formData.nature_business,
    formData.internal,
    formData.external,
    formData.certificate_inspection_yes,
    formData.certificate_inspection_no,
    formData.owner_address,
    formData.owner_city,
    formData.owner_state,
    formData.owner_zip,
    formData.user_name,
    formData.specific_location,
    formData.object_location,
    formData.user_address,
    formData.user_city,
    formData.user_state,
    formData.user_zip,
    formData.certificate_name,
    formData.certificate_company_contac,
    formData.email,
    formData.certificate_address,
    formData.certificate_city,
    formData.certificate_state,
    formData.certificate_zip,
    formData.ft,
    formData.wt,
    formData.ci,
    formData.other,
    formData.other_text,
    formData.year_built,
    formData.manufacturer,
    formData.power,
    formData.process_use,
    formData.steam_htg,
    formData.hws,
    formData.hwh,
    formData.other_use,
    formData.other_use_text,
    formData.fuel,
    formData.method_firing,
    formData.pressure_gage_yes,
    formData.pressure_gage_no,
    formData.mawp,
    formData.this_inspection,
    formData.prev_inspection,
    formData.set_at,
    formData.total_capacity,
    formData.heating_surface,
    formData.condition_object_yes,
    formData.condition_object_no,
    formData.pressure_test_yes,
    formData.yes_psi,
    formData.date_test,
    formData.pressure_test_no,
    formData.conditions,
    formData.requirements,
    formData.name_title_person,
    formData.ident_inspector,
    formData.employed_by,
    formData.ident_employed,
    id,
  ]);

  return { ...formData, id: id };
};

const remove = async (id) => {
  if (Number.isNaN(id)) throw Error('Wrong Type');
  if (!id) throw Error('Missing Fields');
  const sql = `DELETE FROM form_nb_6 WHERE id = ?`;
  await query(sql, [id]);

  return { idDeleted: id };
};

module.exports = { findAll, findById, insert, update, remove };
