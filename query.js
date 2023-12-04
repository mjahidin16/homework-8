// Mengimpor modul yang diperlukan
const pool = require('./config'); // Mengimpor koneksi pool database (Diasumsikan untuk PostgreSQL)
const express = require('express'); // Mengimpor framework Express.js
const router = express.Router(); // Membuat router Express

// REST API: GET, POST, PUT, DELETE
// KODE RESPON: 200, 201, 400, 404, 500 -->>>>>>>>

// Tabel Games

// GET SEMUA GAMES
router.get('/aktor', (req, res) => {

    // Kueri SQL untuk memilih semua catatan dari tabel 'games'
    const query = `SELECT * FROM aktor`

    // Menjalankan kueri menggunakan koneksi pool database
    pool.query(query, (err, result) => {
        if(err) throw err;

        // Mengirim respons JSON dengan hasil kueri
        res.status(200).json(result.rows)
    })

})

// GET GAME BERDASARKAN ID
router.get('/aktor/:id', (req, res) => {
    const {id} = req.params // Mengekstrak parameter 'id' dari URL permintaan

    // Kueri SQL untuk memilih catatan tertentu dari tabel 'games' berdasarkan ID
    const query = `SELECT * FROM aktor WHERE id = $1`

    // Menjalankan kueri dengan parameter 'id' sebagai nilai parameter
    pool.query(query, [id], (err, result) => {
        if(err) throw err;

        // Mengirim respons JSON dengan baris pertama hasil (dan kemungkinan satu-satunya)
        res.status(200).json(result.rows[0])
    })
})

// GET GAME BERDASARKAN DEVELOPER || GET FILM BERDASARKAN KATEGORI
router.get('/aktor/developer/:id', (req, res) => {
    const {id} = req.params // Mengekstrak parameter 'id' dari URL permintaan
    console.log(id) // Mencetak 'id' ke konsol

    // Kueri SQL untuk memilih catatan dari tabel 'games' berdasarkan ID pengembang
    const query = `SELECT * FROM aktor WHERE dev_id = $1`

    // Menjalankan kueri dengan parameter 'id' sebagai nilai parameter
    pool.query(query, [id], (err, result) => {
        if(err) throw err;

        // Mengirim respons JSON dengan baris hasil
        res.status(200).json(result.rows)
    })
})

// Mengekspor router untuk digunakan di bagian lain dari aplikasi
module.exports = router
