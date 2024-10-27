const db = require("../config/db");

//in the future we would want to setup our schema to handle multiple users
class Balance {
    // Method to add to the current value
    static update(amount) {
        let sql = `UPDATE balance SET value = value + ${amount}`;
        return db.execute(sql);
    }

    static get() {
        let sql = `SELECT value FROM balance LIMIT 1`;
        return db.execute(sql);
    }
}

module.exports = Balance;
