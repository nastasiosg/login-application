const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'login-application',
  password: 'example',
  port: '3311',
  debug: true
});

connection.connect((err) => {
  if(err) {
    console.log("database connection failed", err)
  } else {
    console.log("Connected to databse")
  }
});

module.exports = connection;
