const mysql = require('mysql');
const util = require('util');
const Pool = require('pg').Pool;

const connection = mysql.createConnection({
    host: "172.17.10.88",
    user: "sptestexicharger",
    password: "Sp$43#test",
    database: "exicharger",
    port : 3306,
    multipleStatements : true
  });

  const pool = mysql.createPool({
    connectionLimit : 100, //important
    host: "172.17.10.88",
    user: "sptestexicharger",
    password: "Sp$43#test",
    database: "exicharger",
    port : 3306,
    multipleStatements : true
  });

  const poolPG = new Pool({
    user: "cmspgtest",
    host: "172.17.10.88",
    database: "cmstest",
    password: "CrmPStest01",
    port: 5432,
    multipleStatements : true
  })
  
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
  });
   
  
  pool.query = util.promisify(pool.query);
  
  module.exports = {sql : connection,pool,poolPG};