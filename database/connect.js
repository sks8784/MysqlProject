const mysql = require("mysql2");
const dotenv = require('dotenv');
const { createUserTable, createCandidateTable, createCandidateStatusTable } = require('./tables');

dotenv.config();

const dbpassword = process.env.DBPASSWORD;

const db = () =>
    mysql.createConnection({
        host: "localhost",
        user: "root",
        password: dbpassword,
        database: "Demo_Project"
    })

// db.connect(async function (err) {
//     if (err) {
//         throw err;
//     }
//     else {
//         console.log("connected to db");

//     }
// })



module.exports = db;