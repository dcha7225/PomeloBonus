const db = require("../config/db");

class Pending {
    static save(txnID, amount, time) {
        let sql = `
        INSERT INTO pending(
            txnID,
            amount,
            intialTime
        )
        VALUES(
            "${txnID}",
            "${amount}",
            "${time}"
        )
        `;
        return db.execute(sql);
    }

    static delete(txnID) {
        let sql = `DELETE FROM pending WHERE txnID = "${txnID}"`;
        return db.execute(sql);
    }
    static async getByTxnID(txnID) {
        let sql = `SELECT * FROM pending WHERE txnID = "${txnID}"`;
        const [rows] = await db.execute(sql);
        return rows[0] || null; // Return the single row if found, otherwise null
    }
    static async getAll() {
        let sql = `SELECT * FROM pending`;
        const [rows] = await db.execute(sql); // `rows` will now contain only the row data
        return rows;
    }
}

module.exports = Pending;
