const { Response, Router } = require('express');
const { validateError } = require('../../../../utils/functions');
const { findAll, findById,insert, update, remove} = require('./nb136.gateway');
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

  const sql = 'INSERT INTO form_nb136 (assesment_No, name, address, name_Organization, address_Organization, jurisdiction, information, equipment_Material, specifications, name_code, section, division, edition, addendum, firnedd_service, flaw_type, assessment_procedures, inspection_result, failure_modes, continued_operation, continue_operation_until, service_monitoring, operating_limitations, name_inspector, owner_name, date_owner, organization_name, date_engineer, verified, employer, date_inspector, commission ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
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
    formData.commission
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
