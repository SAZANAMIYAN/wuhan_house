const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// 连接到 SQLite 数据库（如果不存在则会创建）
const db = new sqlite3.Database('house.db');


app.use(express.static('public'));

// app.post('/upload', upload.single('file'), (req, res) => {
//     const filePath = req.file.path;

//     const results = [];
//     fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             results.forEach(row => {
//                 db.run(`INSERT INTO rent (house_name, type, location, room_count, orientation, house_price, area, maintenance, move_in, floor, elevator, parking, water_supply, electricity_supply, gas, heating, rental_period, viewing_time, payment_method, deposit, service_fee, agency_fee) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
//                 [
//                     row.house_name, row.type, row.location, row.room_count, row.orientation, 
//                     row.house_price, row.area, row.maintenance, row.move_in, row.floor, 
//                     row.elevator, row.parking, row.water_supply, row.electricity_supply, 
//                     row.gas, row.heating, row.rental_period, row.viewing_time, 
//                     row.payment_method, row.deposit, row.service_fee, row.agency_fee
//                 ]);
//             });
//             fs.unlinkSync(filePath); // 删除临时文件
//             res.send('File successfully uploaded and data inserted into database.');
//         });
// });

app.listen(3000, () => {
    console.log('Server started on http://localhost:3001');
});