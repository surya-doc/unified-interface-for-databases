const express = require("express");
const app = express();
const cors = require("cors");
const mySQLRoutes = require("./mysql/routes/index");
const postgresRoutes = require("./postgres/routes/index");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/mysql", mySQLRoutes);
app.use("/postgres", postgresRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
