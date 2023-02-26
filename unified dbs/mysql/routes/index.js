require('dotenv').config();
const express = require("express");
const router = express.Router();
const mySQLRoutes = require("../controller/controller");

router.post("/newDB", mySQLRoutes.newDB);
router.post("/getDB", mySQLRoutes.getDB);
router.post("/connectDB", mySQLRoutes.connectDB);
router.post("/showdbs", mySQLRoutes.showdbs);
router.get("/uptime", mySQLRoutes.uptime);
router.get("/connect", mySQLRoutes.connect);
router.post("/createDB", mySQLRoutes.createDB);
router.post("/getTables", mySQLRoutes.getTables);
router.post("/createTable", mySQLRoutes.createTable);
router.post("/getTableData", mySQLRoutes.getTableData);
router.post("/insertData", mySQLRoutes.insertData);
router.post("/deleteData", mySQLRoutes.deleteData);
router.post("/updateData", mySQLRoutes.updateData);

module.exports = router;