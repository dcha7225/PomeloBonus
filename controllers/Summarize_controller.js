const Pending = require("../models/pending");
const AvailCredit = require("../models/availCredit");
const Settled = require("../models/settled");
const Balance = require("../models/balance");

exports.summarize = async (_, res, next) => {
    try {
        let temp = await Balance.get();
        const balance = temp[0][0].value;
        temp = await AvailCredit.get();
        const availCredit = temp[0][0].value;

        function intToDollar(amount) {
            return amount >= 0
                ? `$${Math.abs(amount)}`
                : `-$${Math.abs(amount)}`;
        }
        const pendingRows = await Pending.getAll(); // Assuming this returns an array of { txnID, amount, time }
        console.log(pendingRows);
        const pendingSorted = pendingRows
            .map((row) => [row.txnID, row.amount, row.intialTime]) // Convert each row to [txnID, amount, time]
            .sort((a, b) => b[2] - a[2]); // Sort by time in descending order

        // Fetch and sort settled transactions
        const settledRows = await Settled.getAll(); // Assuming this returns an array of { txnID, amount, time, finalizedTime }

        const settledSorted = settledRows
            .map((row) => [
                row.txnID,
                row.amount,
                row.intialTime,
                row.finalTime,
            ]) // Convert each row to [txnID, amount, time, finalizedTime]
            .sort((a, b) => b[2] - a[2]); // Sort by time in descending order

        // Map to formatted strings
        const pendingStr = pendingSorted.map(
            (tup) => `${tup[0]}: ${intToDollar(tup[1])} @ time ${tup[2]}\n`
        );

        const settledStr = settledSorted.map(
            (tup) =>
                `${tup[0]}: ${intToDollar(tup[1])} @ time ${
                    tup[2]
                } (finalized @ time ${tup[3]})\n`
        );

        // Assemble final result string
        const resList = [
            "Available credit: ",
            intToDollar(availCredit),
            "\n",
            "Payable balance: ",
            intToDollar(balance),
            "\n\n",
            "Pending transactions:\n",
            ...pendingStr,
            "\n",
            "Settled transactions:\n",
            ...settledStr,
        ];

        const resStr = resList.join("").trim();
        console.log(resStr);
        res.status(200).json({ message: resStr });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
