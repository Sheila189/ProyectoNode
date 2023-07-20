const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbmetalinst', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const updatePasswords = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa con la base de datos');

    const users = await User.findAll();

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await user.update({ password: hashedPassword });
    }

    console.log('Contraseñas actualizadas con éxito');
  } catch (error) {
    console.error('Error al actualizar las contraseñas:', error);
  } finally {
    await sequelize.close();
  }
};

updatePasswords();
