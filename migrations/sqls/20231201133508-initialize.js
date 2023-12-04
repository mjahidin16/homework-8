'use strict';  // Mode ketat JavaScript, membantu mencegah kesalahan umum

var dbm;  // Variabel untuk menyimpan instance db-migrate
var type;  // Variabel untuk menyimpan tipe data db-migrate
var seed;  // Variabel untuk menyimpan tautan ke seed
var fs = require('fs');  // Modul untuk membaca file dari sistem file
var path = require('path');  // Modul untuk mengelola jalur file
var Promise;  // Variabel untuk menyimpan instance Promise

/**
  * Fungsi setup dipanggil oleh db-migrate saat skrip migrasi dijalankan.
  * Ini mengatur beberapa variabel global untuk digunakan nanti dalam fungsi up dan down.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

/**
 * Fungsi up mendefinisikan apa yang harus dilakukan saat migrasi database ke atas (up).
 * Di sini, skrip membaca file SQL yang berisi perintah SQL untuk menginisialisasi atau membuat skema database.
 */
exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20231201133508-initialize-up.sql');
  return new Promise( function( resolve, reject ) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};

/**
 * Fungsi down mendefinisikan apa yang harus dilakukan saat membatalkan migrasi.
 * Di sini, skrip membaca file SQL yang berisi perintah SQL untuk membatalkan perubahan yang dilakukan oleh fungsi up.
 */
exports.down = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20231201133508-initialize-down.sql');
  return new Promise( function( resolve, reject ) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (err) return reject(err);
      console.log('received data: ' + data);

      resolve(data);
    });
  })
  .then(function(data) {
    return db.runSql(data);
  });
};

/**
 * Metadata tentang versi skema database yang terkait dengan skrip migrasi ini.
 */
exports._meta = {
  "version": 1
};
