const { Response, Router } = require('express');
const { validateError } = require('../../../../utils/functions');
const { findAll, findById,insert, update, remove} = require('./nb4.gateway');
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
  const pdfFileName = 'form_nb4.pdf';
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

  const sql = 'INSERT INTO form_nb4 (jurisdiction, date_service, noticeOf, effective_Date, typeObject, object, ownersNo, jurisdictionNo, national_BoardNo, name_Manufacturer, name_Owner, name_Owner_Country, location_Object_Country, user_Object, date_Last_Certificate, certificateIssued, reasonDiscontinuance, chief_inspector, branch_office) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [formData.jurisdiction,
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
    formData.branch_office,];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    console.log('Data saved in the database');
    connection.end();
  }); 
};


const nb4Router = Router();

nb4Router.get('/',getAllForms);
nb4Router.get('/:id', getFormById);
nb4Router.post('/', createForm);
nb4Router.put('/:id', updateForm);
nb4Router.delete('/:id',deleteForm)

module.exports = {nb4Router};
