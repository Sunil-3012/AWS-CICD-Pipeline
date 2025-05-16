const mysql = require('mysql2');
require('dotenv').config();

const host = process.env.DB_HOST || 'dev-db-instance.cdbmlufgqkjd.ap-south-1.rds.amazonaws.com';
const port = process.env.DB_PORT || '3306';
const user = process.env.DB_USER || 'appuser';
const password = process.env.DB_PASSWORD || 'learnIT02#';
const database = process.env.DB_NAME || 'react_node_app';

const db = mysql.createConnection({
   host: host,
   port: port,
   user: user,
   password: password,
   database: database
});

module.exports = db;
