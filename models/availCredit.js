const db = require("../config/db");

//in the future we would want to setup our schema to handle multiple users
class AvailCredit {
    // Method to add to the current value
    static update(amount) {
        let sql = `UPDATE availCredit SET value = value + ${amount}`;
        return db.execute(sql);
    }

    static get() {
        let sql = `SELECT value FROM availCredit LIMIT 1`;
        return db.execute(sql);
    }
}

module.exports = AvailCredit;
