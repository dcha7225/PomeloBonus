const Pending = require("../models/pending");
const AvailCredit = require("../models/availCredit");

exports.clearTrans = async (req, res, next) => {
    try {
        let { time, txnID } = req.body;
        const pendingEntry = await Pending.getByTxnID(txnID);
        if (pendingEntry != null) {
            const prevAmount = pendingEntry.amount;
            await AvailCredit.update(prevAmount);
            await Pending.delete(txnID);
        }

        res.status(201).json({ message: "logged" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
