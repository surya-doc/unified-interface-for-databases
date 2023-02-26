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
const { Client } = require('pg')
var client


const newDB = async (req, res) => {
    const { host, user, password, database } = req.body;
    const data = { host, user, password, database };
    client = new Client(data)

    client.connect((err) => {
        console.log(err)
    })
    res.status(200).json({ message: "Data saved successfully" });
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
    const data = { host, user, password, database };
    if (!saveHash(crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex"), JSON.stringify(data))) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    client = new Client(data)

    client.connect((err) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        else {
            res.status(200).json({ message:"Connected!" });
        }
    })
}

const showDBs = async (req, res) => {
    client.query("SELECT datname FROM pg_database WHERE datistemplate = false;", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        else {
            res.status(200).json({ data: result.rows });
        }
    })
}

const uptime = async (req, res) => {
    client.query("SELECT now() - pg_postmaster_start_time() AS uptime;", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        else {
            res.status(200).json({ data: result.rows });
        }
    })
}

const showTables = async (req, res) => {
    client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        else {
            res.status(200).json({ data: result.rows });
        }   
    })
}

const createDB = async (req, res) => {
    const { database } = req.body;
    client.query(`CREATE DATABASE ${database};`, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        else {
            res.status(200).json({ message: "Database created successfully" });
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

module.exports = {
    newDB,
    getDB,
    connectDB,
    showDBs,
    uptime,
    connect,
    createDB,
    showTables
}