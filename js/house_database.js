const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

// 连接到 SQLite 数据库（如果不存在则会创建）
const db = new sqlite3.Database('house.db', (err) => {
    if (err) {
        console.error('Error connecting to the database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


// 允许跨域请求
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有来源访问
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

app.use(express.static('public'));

// 路由：返回上传表单页面
app.get('/upload', (req, res) => {
  

  });
  
  // 路由：处理表单数据提交
app.post('/upload', upload.none(), (req, res) => {
    const { propertyTitle, Price, location, Propertytype } = req.body;
    const link = ""; // 初始化为一个空字符串
  
    db.run(`INSERT INTO xinfang (楼盘名称, 楼盘价格, 楼盘位置, 楼盘户型, link) VALUES (?, ?, ?, ?, ?)`, 
      [propertyTitle, Price, location, Propertytype, link], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.send('Property data uploaded successfully');
    });
  });

  

// Uncomment and update the below code when you want to handle CSV uploads
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

app.listen(3001, () => {
    console.log('Server started on http://localhost:3001');
});
