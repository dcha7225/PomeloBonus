const express = require("express");
const router = express.Router();
const {
    cancelPayment,
} = require("../controllers/PAYMENT_CANCELLED_Controllers");
const { initiatePay } = require("../controllers/PAYMENT_INITIATED_Controllers");
const { postPayment } = require("../controllers/PAYMENT_POSTED_Controllers");

router.post("/cancel", cancelPayment);

router.post("/initiate", initiatePay);

router.post("/post", postPayment);

module.exports = router;
