const bcrypt = require('bcryptjs');

const validateError = (error) => {
    switch (error.message) {
      case 'Wrong type':
        return 'review request fields';
      case 'Missing fields':
        return 'Validate fields';
      case 'Inexistent role':
        return 'Role not registered';
      case 'Nothing found':
        return 'No data found';
      case 'Password mismatch':
        return 'Credentials mismatch';
      case 'User disabled':
        return 'User disabled';
      default:
        return 'Review request';
    }
  };
  
  const hashPassword = async (password) => {
    const saltRounds = 10; // Define el número de rondas de hashing (recomendado: 10 o más)
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
  const validatePassword = async (password, hashedPassword) => {
    try {
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      return isPasswordValid;
    } catch (error) {
      throw new Error('Error al validar la contraseña');
    }
  };
  
  module.exports = {
    validateError,
    hashPassword,
    validatePassword,
  };
  
