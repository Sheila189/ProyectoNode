const mysql = require('mysql');
require('dotenv').config();

const client = mysql.createPool({
  connectionLimit: 500,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

client.getConnection((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa con la base de datos');
    const sql = 'SELECT * FROM users';
    client.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        }
    );
  } 
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    client.getConnection((err, conn) => {
      if (err) reject(err);
      conn.query(sql, params, (err, rows) => {
        if (err) reject(err);
        conn.release();
        resolve(rows);
      });
    });
  });
};

module.exports = { query };
