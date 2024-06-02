// 引入所需模块
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');


// 创建 Express 应用
const app = express();
// 设置应用使用的模板引擎和静态文件目录
app.use(cors());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'node_modules/layui/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var ejs = require('ejs');  // 引入的ejs插件
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 设置 bodyParser 解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 设置 session
app.use(session({
  secret: 'secret-key-098', // 用于签署 sessionID 的密钥，可以自行修改
  resave: true,
  saveUninitialized: true
}));


// 创建数据库连接
const db = mysql.createConnection({
    host:"localhost", 
    port:"3306", 
    user:"root", 
    password:"123456", 
    database:"house"
});

// 连接数据库
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database.');
});



// 添加用于检查用户名是否重复的路由
app.post('/checkUsername', (req, res) => {
  console.log('Received request to check username:', req.body.username);
  const { username } = req.body;
  // 查询数据库，检查是否已存在相同用户名
  const checkUserSql = 'SELECT * FROM user WHERE username = ?';
  db.query(checkUserSql, [username], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('注册失败，请稍后再试。');
      return;
    }
    if (result.length > 0) {
      console.log('Username already exists:', username);
      res.status(400).send('用户名已存在，请选择其他用户名。');
      return;
    }
    console.log('Username is available:', username);
    res.sendStatus(200); // 发送成功响应
  });
});

// 添加上传新房房源的路由
app.post('/uploadxinfang', (req, res) => {
  const { propertyTitle, Price, location, Propertytype } = req.body;

  // 调用百度地图API解析经纬度
  const address = encodeURIComponent(location); // 将地址进行编码
  const ak = 'UvfDUT335wjmy8ZHvGYhuLkfpf7ggRB1'; // 替换为百度地图API密钥
  const url = `http://api.map.baidu.com/geocoding/v3/?address=${address}&output=json&ak=${ak}`;



  // 发送请求给百度地图API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 0 && data.result && data.result.location) {
        const { lat, lng } = data.result.location;
        
        // 将房屋信息和经纬度保存到数据库中
        const insertxinfangSql = 'INSERT INTO xinfang (house_name, house_price, address, room_types, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertxinfangSql, [propertyTitle, Price, location, Propertytype, lat, lng], (err, result) => { 
          if (err) {
            console.error(err);
            res.status(500).send('新房房源上传失败，请稍后再试。');
            return;
          }
          console.log('xinfang upload successfully:', propertyTitle);
          res.status(200).send('新房上传成功'); // 发送成功响应
        });
      } else {
        console.error('Failed to parse location from address:', location);
        res.status(500).send('解析地址经纬度失败，请稍后再试。');
      }
    })
    .catch(error => {
      console.error('Failed to fetch from Baidu Map API:', error);
      res.status(500).send('解析地址经纬度失败，请稍后再试。');
    });
});




app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // 查询数据库，检查是否已存在相同用户名
  const checkUserSql = 'SELECT * FROM user WHERE username = ?';
  db.query(checkUserSql, [username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('注册失败，请稍后再试。');
      return;
    }
    // 如果存在相同的用户名
    if (result.length > 0) {
      res.status(400).send('用户名已存在，请选择其他用户名。');
      return;
    }
    // 如果不存在相同的用户名，则插入用户到数据库
    const insertUserSql = 'INSERT INTO user (username, password) VALUES (?, ?)';
    db.query(insertUserSql, [username, password], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('注册失败，请稍后再试。');
        return;
      }
      console.log('User registered successfully:', username);
      res.status(200).send('注册成功'); // 发送成功响应
    });
  });
});

//添加用于检查登录的路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const loginUserSql = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(loginUserSql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('登录失败，请稍后再试。');
      return;
    }
    if (result.length > 0) {
      console.log('User logged in successfully:', username);
      res.status(200).send('登录成功');
    } else {
      res.status(401).send('用户名或密码错误');
    }
  });
});


// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});





