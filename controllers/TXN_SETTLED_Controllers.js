const Pending = require("../models/pending");
const AvailCredit = require("../models/availCredit");
const Settled = require("../models/settled");
const Balance = require("../models/balance");

exports.settleTrans = async (req, res, next) => {
    try {
        let { time, txnID, amount } = req.body;
        const pendingEntry = await Pending.getByTxnID(txnID);
        if (pendingEntry != null) {
            const prevAmount = pendingEntry.amount;
            const initialTime = pendingEntry.intialTime;

            await AvailCredit.update(-(amount - prevAmount));
            await Balance.update(amount);
            await Pending.delete(txnID);
            await Settled.save(txnID, amount, initialTime, time);
        }

        res.status(201).json({ message: "logged" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
