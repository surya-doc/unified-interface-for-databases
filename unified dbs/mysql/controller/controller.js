const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mysql = require("mysql")
var connection;
var connectData;
// node hash
const crypto = require("crypto");
const { getHash } = require("../../database/mongo");
const saveHash = require("../../database/mongo").saveHash;
const newDB = async (req, res) => {

    const { host, user, password, database } = req.body;
    const data = { host, user, password, database };

    if (!saveHash(crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex"), JSON.stringify(data))) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    const root = path.resolve(__dirname, "..");

    if (!fs.existsSync(root + "/dbDetails")) {
        fs.mkdirSync(root + "/dbDetails");
    }

    if (!fs.existsSync(root + "/dbDetails/data.json")) {
        try {
            fs.writeFileSync(root + "/dbDetails/data.json", JSON.stringify([data]));
            res.status(200).json({ message: "Data saved successfully" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
    else {
        try {
            const fileData = fs.readFileSync(root + "/dbDetails/data.json");
            const fileDataArray = JSON.parse(fileData);
            fileDataArray.push(data);
            fs.writeFileSync(root + "/dbDetails/data.json", JSON.stringify(fileDataArray));
            res.status(200).json({ message: "Data saved successfully" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

}

const getDB = async (req, res) => {
    const root = path.resolve(__dirname, "..");
    try {
        const fileData = fs.readFileSync(root + "/dbDetails/data.json");
        const fileDataArray = JSON.parse(fileData);
        res.status(200).json({ data: fileDataArray });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const connectDB = async (req, res) => {
    const { host, user, password, database } = req.body;
    // connect mysql
    connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    })

    connectData = {
        host,
        user,
        password,
        database
    }

    try {
        connection.connect();
        console.log(connection);
        res.status(200).json({ message: "Connected!" })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "OOPPSS" })
    }

}

const showdbs = async (req, res) => {
    const query = "SHOW DATABASES";
    connection.query(query, (err, result, fields) => err ? res.status(400).json({ message: "OOPPSS" }) : res.status(200).json({result}))
}

const uptime = async (req, res) => {
    const query = `SELECT
  VARIABLE_VALUE AS Uptime_seconds,
  NOW() AS "Now",
  NOW() - INTERVAL VARIABLE_VALUE SECOND AS "Up since",
  DATEDIFF(NOW(), NOW() - INTERVAL VARIABLE_VALUE SECOND) AS "Uptime_days"
FROM performance_schema.session_status
WHERE VARIABLE_NAME = 'Uptime';`;
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "OOPPSS" })
        }
        else {
            res.status(200).json({ result })
        }  
    })
}



const connect = async (req, res) => {
    console.log(JSON.stringify(connectData))
    const hash = crypto.createHash("sha256").update(JSON.stringify(connectData)).digest("hex");
    const result = getHash(hash);
    if (result) {
        res.status(200).json({ connectionUrl : result.connectionUrl, message: "Connected!" })
    }
    else {
        res.status(400).json({ message: "error" })
    }
}

const createDB = async (req, res) => {
    const { database } = req.body;
    try {
        const query = `CREATE DATABASE ${database}`;
        // sample query
        // CREATE DATABASE mydb;
        await connection.query(query, (err, result, fields) => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: "OOPPSS" })
            }
            else {
                res.status(200).json({ result })
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "OOPPSS" })
    }
}


const getTables = async (req, res) => {
    const { dbName } = req.body;
    try {
        const query = `SHOW TABLES FROM ${dbName}`;
        connection.query(query, (err, result, fields) => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: "OOPPSS" })
            }
            else {
                res.status(200).json({ result })
            }
        }
        )
    }
    catch (err) {
        res.status(400).json({ message: "OOPPSS" })
    }
}

const getTableData = async (req, res) => {
    const { dbName, tableName } = req.body;
    try {
        const query = `SELECT * FROM ${dbName}.${tableName}`;
    }
    catch (err) {
        res.status(400).json({ message: "OOPPSS" })
    }
}

const insertData = async (req, res) => {
    const { dbName, tableName, data } = req.body;
    try {
        const query = `INSERT INTO ${dbName}.${tableName} VALUES (${data})`;
    }
    catch (err) {
        res.status(400).json({ message: "OOPPSS" })
    }
}

const updateData = async (req, res) => {
    const { dbName, tableName, data } = req.body;
    try {
        const query = `UPDATE ${dbName}.${tableName} SET ${data}`;
    }
    catch (err) {
        res.status(400).json({ message: "OOPPSS" })
    }
}

const deleteData = async (req, res) => {
    const { dbName, tableName, data } = req.body;
    try {
        const query = `DELETE FROM ${dbName}.${tableName} WHERE ${data}`;
    }
    catch (err) {
        res.status(400).json({ message: "OOPPSS" })
    }
}

const createTable = async (req, res) => {
    const { dbName, tableName, data } = req.body;
    try {
        const query = `CREATE TABLE ${dbName}.${tableName} (${data})`;
    }
    catch (err) {
        res.status(400).json({ message: "OOPPSS" })
    }
}


module.exports = {
    newDB,
    getDB,
    connectDB,
    showdbs,
    uptime,
    connect,
    createDB,
    getTables,
    getTableData,
    insertData,
    updateData,
    deleteData,
    createTable

};
