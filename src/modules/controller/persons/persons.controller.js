const { Response, Router } = require('express');
const { auth, checkRoles } = require('../../../config/jwt');
const { validateError } = require('../../../utils/functions');
const { findAll, findById, insert, update, remove } = require('./persons.gateway');
const bcrypt = require('bcrypt');

const getAll = async (req, res = Response) => {
  try {
    const persons = await findAll();
    res.status(200).json(persons);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const getById = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const person = await findById(id);
    res.status(200).json(person);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const insertPerson = async (req, res = Response) => {
  try {
    // Extrae los datos de la persona del cuerpo de la solicitud
    const { name, middle, lastname, signature, logo, name_empresa } = req.body;
    console.log(req.body);
    // Verifica los campos requeridos de la persona
    if (!name || !lastname || !middle || !signature || !logo || !name_empresa) {
      throw Error('Missing Fields');
    }

    // Inserta la persona en la base de datos
    const person = await insert({
      name,
      lastname,
      middle,
      signature,
      logo,
      name_empresa,
    });

    const personId = person.id; // Obtiene el ID de la persona recién registrada

    // Crea el objeto de usuario con los datos requeridos
    const user = {
      email,
      password,
      rol_id: 1, // Actualiza el rol_id si es necesario
      person_id: personId, // Utiliza el ID de la persona
    };
    // Pasamos el ID de la persona al controlador de usuarios
    usersController.insert(req, res, personId);
 
    // Inserta el usuario en la base de datos
    const newUser = await insert(user);

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const updatePerson = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const { name, lastname, middle, signature, logo, name_empresa } = req.body;

    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedPerson = await update(
      {
        name,
        lastname,
        middle,
        signature,
        logo,
        name_empresa,
      },
      id
    );

    res.status(200).json(updatedPerson);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const eliminate = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const person = await remove(id);
    res.status(200).json(person);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const personsRouter = Router();

personsRouter.get('/', getAll);
personsRouter.get('/:id', [auth, checkRoles(['ADMIN'])], getById);
personsRouter.post('/', insertPerson);
personsRouter.put('/:id', updatePerson);
personsRouter.delete('/:id', eliminate);

module.exports = { personsRouter };
