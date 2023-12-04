const express = require('express');  // Mengimpor modul Express.js untuk membuat aplikasi web
const app = express();  // Membuat instansi aplikasi Express
const port = 3000;  // Menetapkan nomor port yang akan digunakan (3000 dalam contoh ini)
const router = require('./query');  // Mengimpor router yang berisi logika rute

app.use(router);  // Menggunakan router dalam aplikasi Express
app.use(express.json());  // Menggunakan middleware Express untuk menangani permintaan JSON
app.use(express.urlencoded({extended: true}));  // Menggunakan middleware Express untuk menangani data formulir terkodifikasi

app.listen(port, () => {  // Membuka koneksi pada port yang ditentukan
  console.log(`Example app listening on port ${port}`);  // Mencetak pesan ke konsol ketika aplikasi mendengarkan pada port tertentu
})
