const Pending = require("../models/pending");
const AvailCredit = require("../models/availCredit");
const Settled = require("../models/settled");

exports.postPayment = async (req, res, next) => {
    try {
        let { time, txnID } = req.body;
        const pendingEntry = await Pending.getByTxnID(txnID);
        if (pendingEntry != null) {
            const prevAmount = pendingEntry.amount;
            const initialTime = pendingEntry.time;

            await AvailCredit.update(-prevAmount);

            await Pending.delete(txnID);
            await Settled.save(txnID, prevAmount, initialTime, time);
        }

        res.status(201).json({ message: "logged" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
