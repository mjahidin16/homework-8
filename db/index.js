const fs = require('fs');
const pool = require('../config') // ambil koneksi si config.js

const seedQuery = fs.readFileSync("./seeding.sql", "utf8");

pool.query(seedQuery, (err, result) => {
    if(err) throw err;
    // Error Handler

    console.log('seeding success')
    pool.end()
} )