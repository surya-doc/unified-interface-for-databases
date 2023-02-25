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
module.exports = router;