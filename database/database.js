const {createPool} = require('mysql')
require('dotenv').config()


const pool =  createPool({
   host:process.env.HOST,
   user:process.env.USER,
   password:process.env.PASS,
   database:process.env.DB,
   connectionLimit:10 
});

module.exports = pool;
