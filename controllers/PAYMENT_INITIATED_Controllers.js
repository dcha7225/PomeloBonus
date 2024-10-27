const Pending = require("../models/pending");
const Balance = require("../models/balance");

exports.initiatePay = async (req, res, next) => {
    try {
        let { time, txnID, amount } = req.body;
        await Pending.save(txnID, amount, time);
        await Balance.update(amount);

        res.status(201).json({ message: "logged" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
