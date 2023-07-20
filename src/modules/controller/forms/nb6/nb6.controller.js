const { Response, Router } = require('express');
const { validateError } = require('../../../../utils/functions');
const { findAll, findById,insert, update, remove} = require('./nb6.gateway');
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

  const sql = 'INSERT INTO form_nb6 ( month_inspected, day_inspected, year_inspected, month_cert, year_cert, certificate_posted_yes, certificate_posted_no, owner_n, jurisdiction_number, natl_bd_n, other_n, owner_name, nature_business, internal, external, certificate_inspection_yes, certificate_inspection_no, owner_address, owner_city, owner_state, owner_zip, user_name, specific_location, object_location, user_address, user_city, user_state, user_zip, certificate_name, certificate_company_contac, email, certificate_address, certificate_city, certificate_state, certificate_zip, ft, wt, ci, other, other_text, year_built, manufacturer, power, process_use, steam_htg, hws, hwh, other_use, other_use_text, fuel, method_firing, pressure_gage_yes, pressure_gage_no, mawp, this_inspection, prev_inspection, set_at, total_capacity, heating_surface, condition_object_yes, condition_object_no, pressure_test_yes, yes_psi, date_test, pressure_test_no, conditions, requirements, name_title_person, ident_inspector, employed_by, ident_employed) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
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
    formData.ident_employed 
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
