const dotenv = require('dotenv');
dotenv.config({ path: './.env'}); //

module.exports = {
    "development": {
        "username": process.env.username || "user",
        "password": process.env.password || "password",
        "database": process.env.database ||  "hcm_final",
        "host": process.env.host || "127.0.0.1",
        "dialect": "mysql"
    }
}