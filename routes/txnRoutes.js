const express = require("express");
const router = express.Router();
const { settleTrans } = require("../controllers/TXN_SETTLED_Controllers");
const { clearTrans } = require("../controllers/TXN_CLEARED_Controllers");
const { authorizeTrans } = require("../controllers/TXN_AUTHED_Controllers");

router.post("/settle", settleTrans);

router.post("/clear", clearTrans);

router.post("/authorize", authorizeTrans);

module.exports = router;
