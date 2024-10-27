const Pending = require("../models/pending");
const Balance = require("../models/balance");

exports.cancelPayment = async (req, res, next) => {
    try {
        let { txnID } = req.body;
        const pendingEntry = await Pending.getByTxnID(txnID);
        if (pendingEntry != null) {
            const prevAmount = pendingEntry.amount;
            await Balance.update(-prevAmount);
            await Pending.delete(txnID);
        }

        res.status(201).json({ message: "logged" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
