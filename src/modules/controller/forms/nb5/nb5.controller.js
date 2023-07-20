const { Response, Router } = require('express');
const { validateError } = require('../../../../utils/functions');
const { findAll, findById,insert, update, remove} = require('./nb5.gateway');
const PDFDocument = require('pdfkit');
const mysql = require('mysql');

const getAllForms = async (req, res = Response) => {
  try {
    const forms = await findAll();
    res.status(200).json(forms);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const getFormById = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const form = await findById(id);
    res.status(200).json(form);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const createForm = async (req, res = Response) => {
  try {
    const formData = req.body;

    // Verificar los campos requeridos del formulario
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
      !formData.state ||
      !formData.zip ||
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
      !formData.air_tank ||
      !formData.water_tank ||
      !formData.other_type ||
      !formData.other_type_text ||
      !formData.year_built || 
      !formData.manufacturer ||
      !formData.year_inst ||
      !formData.new_object ||
      !formData.secondhand ||
      !formData.power ||
      !formData.process_use ||
      !formData.steam_htg ||
      !formData.hws ||
      !formData.hwh ||
      !formData.storage_use ||
      !formData.heat_exchange ||
      !formData.other_use ||
      !formData.other_use_text ||
      !formData.fuel ||
      !formData.method_firing ||
      !formData.pressure_gage_yes ||
      !formData.pressure_gage_no ||
      !formData.this_inspection ||
      !formData.prev_inspection ||
      !formData.set_at ||
      !formData.explaind_pressure ||
      !formData.condition_object_yes ||
      !formData.condition_object_no ||
      !formData.pressure_test_yes ||
      !formData.yes_psi ||
      !formData.date_test ||
      !formData.pressure_test_no ||
      !formData.shell_no ||
      !formData.diameter_id ||
      !formData.diameter_od ||
      !formData.diameter ||
      !formData.lenght_ft ||
      !formData.lenght_ft ||
      !formData.thickness ||
      !formData.total_htg ||
      !formData.material_asme ||
      !formData.allowable_stress ||
      !formData.strap_thks ||
      !formData.strap_single || 
      !formData.strap_double ||
      !formData.header_thks ||
      !formData.type_box ||
      !formData.type_sinuous ||
      !formData.type_wall ||
      !formData.type_other ||
      !formData.other_text ||
      !formData.type_lap ||
      !formData.type_butt ||
      !formData.type_welded ||
      !formData.type_brazed ||
      !formData.type_riveted ||
      !formData.dia_hole ||
      !formData.base ||
      !formData.height ||
      !formData.width ||
      !formData.seam_eff ||
      !formData.head_thickness ||
      !formData.type_plus ||
      !formData.type_minus ||
      !formData.type_fixed ||
      !formData.type_flat ||
      !formData.type_movable ||
      !formData.type_quick ||
      !formData.radius_dish ||
      !formData.ellip_radio ||
      !formData.bolting_no ||
      !formData.bolting_dia ||
      !formData.bolting_in ||
      !formData.material ||
      !formData.tube_sheet ||
      !formData.tubes_no ||
      !formData.tubes_dia ||
      !formData.tubes_in ||
      !formData.tubes_length_ft ||
      !formData.tubes_length_in ||
      !formData.pinch_wt_length ||
      !formData.pinch_wt_height ||
      !formData.ligament_eff ||
      !formData.front || 
      !formData.rear ||
      !formData.front_above ||
      !formData.front_below ||
      !formData.rear_above ||
      !formData.rear_bellow ||
      !formData.above_front ||
      !formData.above_rear ||
      !formData.above_head ||
      !formData.adove_diagonal ||
      !formData.adove_welded ||
      !formData.adove_weldless ||
      !formData.adove_area_front ||
      !formData.adove_area_rear ||
      !formData.bellow_front ||
      !formData.bellow_rear ||
      !formData.bellow_head ||
      !formData.bellow_diagonal ||
      !formData.bellow_welded ||
      !formData.bellow_weldless ||
      !formData.bellow_area_front ||
      !formData.bellow_area_rear ||
      !formData.adamson_sect ||
      !formData.corrugated ||
      !formData.plain ||
      !formData.furnace_other ||
      !formData.furnace_other_text ||
      !formData.furnace_thickness ||
      !formData.total_length_ft ||
      !formData.total_length_in ||
      !formData.welded ||
      !formData.riveted ||
      !formData.seamless ||
      !formData.threaded ||
      !formData.welded_type ||
      !formData.hollow ||
      !formData.drilled ||
      !formData.diameter_type ||
      !formData.staybolts_pitch ||
      !formData.staybolts_pitch_in ||
      !formData.net_area || 
      !formData.valves_no ||
      !formData.valves_size ||
      !formData.capacity_cfm ||
      !formData.capacity_lb ||
      !formData.capacity_btu ||
      !formData.outlets_no ||
      !formData.outlets_size ||
      !formData.properly_yes ||
      !formData.properly_no ||
      !formData.steam_line_yes ||
      !formData.steam_line_no ||
      !formData.return_lines_yes ||
      !formData.return_lines_no ||
      !formData.connections_yes ||
      !formData.connections_no ||
      !formData.steam_lines_yes ||
      !formData.steam_lines_no ||
      !formData.feed_size ||
      !formData.feed_no ||
      !formData.drive_steam ||
      !formData.drive_motor ||
      !formData.line_yes ||
      !formData.line_no ||
      !formData.return_yes ||
      !formData.return_no ||
      !formData.water_no ||
      !formData.cocks_no ||
      !formData.blowoff_size ||
      !formData.blowoff_location ||
      !formData.inspection_yes ||
      !formData.inspection_no ||
      !formData.boilers_length ||
      !formData.boilers_width ||
      !formData.boilers_height ||
      !formData.sections_no ||
      !formData.welding_yes ||
      !formData.welding_no ||
      !formData.material_yes ||
      !formData.material_no || 
      !formData.name_title_person ||
      !formData.ident_inspector ||
      !formData.employed_by ||
      !formData.ident_employed ||
      !formData.ident_inspector_2 ||
      !formData.other_conditions ||
      !formData.code_stamping
    ) {
      throw Error('Missing Fields');
    }

    const newForm = await insert(formData);
    res.status(200).json(newForm);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const updateForm = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const formData = req.body;

    // Verificar los campos requeridos del formulario
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
      !formData.state ||
      !formData.zip ||
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
      !formData.air_tank ||
      !formData.water_tank ||
      !formData.other_type ||
      !formData.other_type_text ||
      !formData.year_built || 
      !formData.manufacturer ||
      !formData.year_inst ||
      !formData.new_object ||
      !formData.secondhand ||
      !formData.power ||
      !formData.process_use ||
      !formData.steam_htg ||
      !formData.hws ||
      !formData.hwh ||
      !formData.storage_use ||
      !formData.heat_exchange ||
      !formData.other_use ||
      !formData.other_use_text ||
      !formData.fuel ||
      !formData.method_firing ||
      !formData.pressure_gage_yes ||
      !formData.pressure_gage_no ||
      !formData.this_inspection ||
      !formData.prev_inspection ||
      !formData.set_at ||
      !formData.explaind_pressure ||
      !formData.condition_object_yes ||
      !formData.condition_object_no ||
      !formData.pressure_test_yes ||
      !formData.yes_psi ||
      !formData.date_test ||
      !formData.pressure_test_no ||
      !formData.shell_no ||
      !formData.diameter_id ||
      !formData.diameter_od ||
      !formData.diameter ||
      !formData.lenght_ft ||
      !formData.lenght_ft ||
      !formData.thickness ||
      !formData.total_htg ||
      !formData.material_asme ||
      !formData.allowable_stress ||
      !formData.strap_thks ||
      !formData.strap_single || 
      !formData.strap_double ||
      !formData.header_thks ||
      !formData.type_box ||
      !formData.type_sinuous ||
      !formData.type_wall ||
      !formData.type_other ||
      !formData.other_text ||
      !formData.type_lap ||
      !formData.type_butt ||
      !formData.type_welded ||
      !formData.type_brazed ||
      !formData.type_riveted ||
      !formData.dia_hole ||
      !formData.base ||
      !formData.height ||
      !formData.width ||
      !formData.seam_eff ||
      !formData.head_thickness ||
      !formData.type_plus ||
      !formData.type_minus ||
      !formData.type_fixed ||
      !formData.type_flat ||
      !formData.type_movable ||
      !formData.type_quick ||
      !formData.radius_dish ||
      !formData.ellip_radio ||
      !formData.bolting_no ||
      !formData.bolting_dia ||
      !formData.bolting_in ||
      !formData.material ||
      !formData.tube_sheet ||
      !formData.tubes_no ||
      !formData.tubes_dia ||
      !formData.tubes_in ||
      !formData.tubes_length_ft ||
      !formData.tubes_length_in ||
      !formData.pinch_wt_length ||
      !formData.pinch_wt_height ||
      !formData.ligament_eff ||
      !formData.front || 
      !formData.rear ||
      !formData.front_above ||
      !formData.front_below ||
      !formData.rear_above ||
      !formData.rear_bellow ||
      !formData.above_front ||
      !formData.above_rear ||
      !formData.above_head ||
      !formData.adove_diagonal ||
      !formData.adove_welded ||
      !formData.adove_weldless ||
      !formData.adove_area_front ||
      !formData.adove_area_rear ||
      !formData.bellow_front ||
      !formData.bellow_rear ||
      !formData.bellow_head ||
      !formData.bellow_diagonal ||
      !formData.bellow_welded ||
      !formData.bellow_weldless ||
      !formData.bellow_area_front ||
      !formData.bellow_area_rear ||
      !formData.adamson_sect ||
      !formData.corrugated ||
      !formData.plain ||
      !formData.furnace_other ||
      !formData.furnace_other_text ||
      !formData.furnace_thickness ||
      !formData.total_length_ft ||
      !formData.total_length_in ||
      !formData.welded ||
      !formData.riveted ||
      !formData.seamless ||
      !formData.threaded ||
      !formData.welded_type ||
      !formData.hollow ||
      !formData.drilled ||
      !formData.diameter_type ||
      !formData.staybolts_pitch ||
      !formData.staybolts_pitch_in ||
      !formData.net_area || 
      !formData.valves_no ||
      !formData.valves_size ||
      !formData.capacity_cfm ||
      !formData.capacity_lb ||
      !formData.capacity_btu ||
      !formData.outlets_no ||
      !formData.outlets_size ||
      !formData.properly_yes ||
      !formData.properly_no ||
      !formData.steam_line_yes ||
      !formData.steam_line_no ||
      !formData.return_lines_yes ||
      !formData.return_lines_no ||
      !formData.connections_yes ||
      !formData.connections_no ||
      !formData.steam_lines_yes ||
      !formData.steam_lines_no ||
      !formData.feed_size ||
      !formData.feed_no ||
      !formData.drive_steam ||
      !formData.drive_motor ||
      !formData.line_yes ||
      !formData.line_no ||
      !formData.return_yes ||
      !formData.return_no ||
      !formData.water_no ||
      !formData.cocks_no ||
      !formData.blowoff_size ||
      !formData.blowoff_location ||
      !formData.inspection_yes ||
      !formData.inspection_no ||
      !formData.boilers_length ||
      !formData.boilers_width ||
      !formData.boilers_height ||
      !formData.sections_no ||
      !formData.welding_yes ||
      !formData.welding_no ||
      !formData.material_yes ||
      !formData.material_no || 
      !formData.name_title_person ||
      !formData.ident_inspector ||
      !formData.employed_by ||
      !formData.ident_employed ||
      !formData.ident_inspector_2 ||
      !formData.other_conditions ||
      !formData.code_stamping
    ) {
      throw Error('Missing Fields');
    }

    const updatedForm = await update(formData, id);
    res.status(200).json(updatedForm);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const deleteForm = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const deletedForm = await remove(id);
    res.status(200).json(deletedForm);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const generatePDFAndSaveData = async (formData) => {
  // Crear el PDF
  const pdfDoc = new PDFDocument();
  // Definir el nombre del archivo PDF
  const pdfFileName = 'form_nb403.pdf';
  // Stream del PDF para guardar el archivo
  const pdfStream = fs.createWriteStream(pdfFileName);

  // datos para el PDF
  pdfDoc.text(`Jurisdiction: ${formData.jurisdiction}`);
  pdfDoc.text(`Date of Service: ${formData.date_service}`);
  pdfDoc.text(`Jurisdiction: ${formData.noticeOf}`);
  pdfDoc.text(`Date of Service: ${formData.effective_Date}`);
  pdfDoc.text(`Jurisdiction: ${formData.typeObject}`);
  pdfDoc.text(`Date of Service: ${formData.object}`);
  pdfDoc.text(`Jurisdiction: ${formData.jurisdictionNo}`);
  pdfDoc.text(`Date of Service: ${formData.national_BoardNo}`);
  pdfDoc.text(`Jurisdiction: ${formData.name_Manufacturer}`);
  pdfDoc.text(`Date of Service: ${formData.name_Owner}`);
  pdfDoc.text(`Jurisdiction: ${formData.name_Owner_Country}`);
  pdfDoc.text(`Date of Service: ${formData.location_Object_Country}`);
  pdfDoc.text(`Jurisdiction: ${formData.user_Object}`);
  pdfDoc.text(`Date of Service: ${formData.date_Last_Certificate}`);
  pdfDoc.text(`Jurisdiction: ${formData.certificateIssued}`);
  pdfDoc.text(`Date of Service: ${formData.reasonDiscontinuance}`);
  pdfDoc.text(`Jurisdiction: ${formData.chief_inspector}`);
  pdfDoc.text(`Date of Service: ${formData.branch_office}`);

  // Guardar el PDF en el sistema de archivos
  pdfDoc.pipe(pdfStream);
  pdfDoc.end();

  // Guardar los datos en la base de datos
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dbmetalinst',
  });

  connection.connect();

  const sql = 'INSERT INTO form_nb5 ( month_inspected, day_inspected, year_inspected, month_cert, year_cert, certificate_posted_yes, certificate_posted_no, owner_n, jurisdiction_number, natl_bd_n, other_n, owner_name, nature_business, internal, external, certificate_inspection_yes, certificate_inspection_no, owner_address, owner_city, state, zip, user_name, specific_location, object_location, user_address, user_city, user_state, user_zip, certificate_name, certificate_company_contac, email, certificate_address, certificate_city, certificate_state, certificate_zip, ft, wt, ci, air_tank, water_tank, other_type, other__type_text, year_built, manufacturer, year_inst, new_object, secondhand, power, process_use, steam_htg, hws, hwh, storage_use, heat_exchange, other_use, other_use_text, fuel, method_firing, pressure_gage_yes, pressure_gage_no, this_inspection, prev_inspection, set_at, explaind_pressure, condition_object_yes, condition_object_no, pressure_test_yes, yes_psi, date_test, pressure_test_no, shell_no, diameter_id, diameter_od, diameter, lenght_ft, lenght_ft, thickness, total_htg, material_asme, allowable_stress, strap_thks, strap_single, strap_double, header_thks, type_box, type_sinuous, type_wall, type_other, other_text, type_lap, type_butt, type_welded, type_brazed, type_riveted, dia_hole, base, height, width, seam_eff, head_thickness, type_plus, type_minus, type_fixed, type_flat, type_movable, type_quick, radius_dish, ellip_radio, bolting_no, bolting_dia, bolting_in, material, tube_sheet, tubes_no, tubes_dia, tubes_in, tubes_length_ft, tubes_length_in, pinch_wt_length, pinch_wt_height, ligament_eff, front, rear, front_above, front_below, rear_above, rear_bellow, above_front, above_rear, above_head, adove_diagonal, adove_welded, adove_weldless, adove_area_front, adove_area_rear, bellow_front, bellow_rear, bellow_head, bellow_diagonal, bellow_welded, bellow_weldless, bellow_area_front, bellow_area_rear, adamson_sect, corrugated, plain, furnace_other, furnace_other_text, furnace_thickness, total_length_ft, total_length_in, welded, riveted, seamless, threaded, welded_type, hollow, drilled, diameter_type, staybolts_pitch, staybolts_pitch_in, net_area, valves_no, valves_size, capacity_cfm, capacity_lb, capacity_btu, outlets_no, outlets_size, properly_yes, properly_no, steam_line_yes, steam_line_no, return_lines_yes, return_lines_no, connections_yes, connections_no, steam_lines_yes, steam_lines_no, feed_size, feed_no, drive_steam, drive_motor, line_yes, line_no, return_yes, return_no, water_no, cocks_no, blowoff_size, blowoff_location, inspection_yes, inspection_no, boilers_length, boilers_width, boilers_height, sections_no, welding_yes, welding_no, material_yes, material_no, name_title_person, ident_inspector, employed_by, ident_employed, ident_inspector_2, other_conditions, code_stamping ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  const values = [
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
    formData.state,
    formData.zip,
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
    formData.air_tank,
    formData.water_tank,
    formData.other_type,
    formData.other_type_text,
    formData.year_built,
    formData.manufacturer,
    formData.year_inst,
    formData.new_object,
    formData.secondhand,
    formData.power,
    formData.process_use,
    formData.steam_htg,
    formData.hws,
    formData.hwh,
    formData.storage_use,
    formData.heat_exchange,
    formData.other_use,
    formData.other_use_text,
    formData.fuel,
    formData.method_firing,
    formData.pressure_gage_yes,
    formData.pressure_gage_no,
    formData.this_inspection,
    formData.prev_inspection,
    formData.set_at,
    formData.explaind_pressure,
    formData.condition_object_yes,
    formData.condition_object_no,
    formData.pressure_test_yes,
    formData.yes_psi,
    formData.date_test,
    formData.pressure_test_no,
    formData.shell_no,
    formData.diameter_id,
    formData.diameter_od,
    formData.diameter,
    formData.lenght_ft,
    formData.lenght_ft,
    formData.thickness,
    formData.total_htg,
    formData.material_asme,
    formData.allowable_stress,
    formData.strap_thks,
    formData.strap_single, 
    formData.strap_double,
    formData.header_thks,
    formData.type_box,
    formData.type_sinuous,
    formData.type_wall,
    formData.type_other,
    formData.other_text,
    formData.type_lap,
    formData.type_butt,
    formData.type_welded,
    formData.type_brazed,
    formData.type_riveted,
    formData.dia_hole,
    formData.base,
    formData.height,
    formData.width,
    formData.seam_eff,
    formData.head_thickness,
    formData.type_plus,
    formData.type_minus,
    formData.type_fixed,
    formData.type_flat,
    formData.type_movable,
    formData.type_quick,
    formData.radius_dish,
    formData.ellip_radio,
    formData.bolting_no,
    formData.bolting_dia,
    formData.bolting_in,
    formData.material,
    formData.tube_sheet,
    formData.tubes_no,
    formData.tubes_dia,
    formData.tubes_in,
    formData.tubes_length_ft,
    formData.tubes_length_in,
    formData.pinch_wt_length,
    formData.pinch_wt_height,
    formData.ligament_eff,
    formData.front,
    formData.rear,
    formData.front_above,
    formData.front_below,
    formData.rear_above,
    formData.rear_bellow,
    formData.above_front,
    formData.above_rear,
    formData.above_head,
    formData.adove_diagonal,
    formData.adove_welded,
    formData.adove_weldless,
    formData.adove_area_front,
    formData.adove_area_rear,
    formData.bellow_front,
    formData.bellow_rear,
    formData.bellow_head,
    formData.bellow_diagonal,
    formData.bellow_welded,
    formData.bellow_weldless,
    formData.bellow_area_front,
    formData.bellow_area_rear,
    formData.adamson_sect,
    formData.corrugated,
    formData.plain,
    formData.furnace_other,
    formData.furnace_other_text,
    formData.furnace_thickness,
    formData.total_length_ft,
    formData.total_length_in,
    formData.welded,
    formData.riveted,
    formData.seamless,
    formData.threaded,
    formData.welded_type,
    formData.hollow,
    formData.drilled,
    formData.diameter_type,
    formData.staybolts_pitch,
    formData.staybolts_pitch_in,
    formData.net_area,
    formData.valves_no,
    formData.valves_size,
    formData.capacity_cfm,
    formData.capacity_lb,
    formData.capacity_btu,
    formData.outlets_no,
    formData.outlets_size,
    formData.properly_yes,
    formData.properly_no,
    formData.steam_line_yes,
    formData.steam_line_no,
    formData.return_lines_yes,
    formData.return_lines_no,
    formData.connections_yes,
    formData.connections_no,
    formData.steam_lines_yes,
    formData.steam_lines_no,
    formData.feed_size,
    formData.feed_no,
    formData.drive_steam,
    formData.drive_motor,
    formData.line_yes,
    formData.line_no,
    formData.return_yes,
    formData.return_no,
    formData.water_no,
    formData.cocks_no,
    formData.blowoff_size,
    formData.blowoff_location,
    formData.inspection_yes,
    formData.inspection_no,
    formData.boilers_length,
    formData.boilers_width,
    formData.boilers_height,
    formData.sections_no,
    formData.welding_yes,
    formData.welding_no,
    formData.material_yes,
    formData.material_no, 
    formData.name_title_person,
    formData.ident_inspector,
    formData.employed_by,
    formData.ident_employed,
    formData.ident_inspector_2,
    formData.other_conditions,
    formData.code_stamping
  ];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    console.log('Data saved in the database');
    connection.end();
  }); 
};


const nb136Router = Router();

nb136Router.get('/',getAllForms);
nb136Router.get('/:id', getFormById);
nb136Router.post('/', createForm);
nb136Router.put('/:id', updateForm);
nb136Router.delete('/:id',deleteForm)

module.exports = {nb136Router};
