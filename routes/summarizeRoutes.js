const express = require("express");
const router = express.Router();
const { summarize } = require("../controllers/Summarize_controller");

router.get("/", summarize);

module.exports = router;
