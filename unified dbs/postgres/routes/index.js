const express = require("express");
const router = express.Router();

const postgresSQL = require("../controller/controller");

router.post("/newDB", postgresSQL.newDB);
router.post("/getDB", postgresSQL.getDB);
router.post("/connectDB", postgresSQL.connectDB);
router.post("/showdbs", postgresSQL.showDBs);
router.get("/uptime", postgresSQL.uptime);
router.get("/connect", postgresSQL.connect);
router.post("/createDB", postgresSQL.createDB);
router.post("/getTables", postgresSQL.showTables);

module.exports = router;