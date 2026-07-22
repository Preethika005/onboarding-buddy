
// require("dotenv").config();
// const mysql = require("mysql2");

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

// db.connect((err) => {
//     if (err) {
//         console.log("Database Connection Failed");
//         console.log(err);
//     } else {
//         console.log("MySQL Connected");
//     }
// });

// module.exports = db;
require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

connection.connect((err) => {

    if (err) {
        console.log("MySQL Connection Failed");
        console.log(err);
        return;
    }

    console.log("MySQL Server Connected");

    connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
        (err) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log("Database Ready");

            connection.changeUser(
                {
                    database: process.env.DB_NAME
                },
                (err) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log("Connected To Database");

                    require("./database/initDB")(connection);

                }
            );

        }
    );

});

module.exports = connection;