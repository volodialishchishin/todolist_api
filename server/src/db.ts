const Pool = require('pg').Pool
const pool = new Pool({
    user:'volodialishchyshyn',
    password:'1212',
    host:'localhost',
    port:5432,
    database: "dbname"
})



module.exports = pool
