const Pending = require("../models/pending");
const AvailCredit = require("../models/availCredit");

exports.authorizeTrans = async (req, res, next) => {
    try {
        let { time, txnID, amount } = req.body;
        await Pending.save(txnID, amount, time);
        await AvailCredit.update(-amount);

        res.status(201).json({ message: "logged" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
