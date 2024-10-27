const db = require("../config/db");

class Settled {
    static save(txnID, amount, initialTime, finalTime) {
        let sql = `
         INSERT INTO settled(
             txnID,
             amount,
             intialTime,
             finalTime
         )
         VALUES(
             "${txnID}",
             "${amount}",
             "${initialTime}",
             "${finalTime}"
         )
         `;
        return db.execute(sql);
    }
    static delete(txnID) {
        let sql = `DELETE FROM settled WHERE txnID = "${txnID}"`;
        return db.execute(sql);
    }
    static async getByTxnID(txnID) {
        let sql = `SELECT * FROM settled WHERE txnID = "${txnID}"`;
        const [rows] = await db.execute(sql);
        return rows[0] || null; // Return the single row if found, otherwise null
    }
    static async getAll() {
        let sql = `SELECT * FROM settled`;
        const [rows] = await db.execute(sql); // `rows` will now contain only the row data
        return rows;
    }
}

module.exports = Settled;
