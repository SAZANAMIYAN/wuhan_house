// 引入所需模块
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const { exec } = require('child_process');

// 创建 Express 应用
const app = express();
// 设置应用使用的模板引擎和静态文件目录
app.use(cors());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'node_modules/layui/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// 连接到 SQLite 数据库

const db_lite = new sqlite3.Database('./house_wuhan.db', (err) => {
  if (err) {
      console.error('Error connecting to the database', err.message);
  } else {
      console.log('Connected to the SQLite database.');
  }
});

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


// 处理搜索请求
app.post('/search', (req, res) => {
    const { table, query } = req.body;

    // 构建 SQL 查询语句
    const sql = `SELECT * FROM ${table} WHERE 名称 LIKE '%${query}%'`;

    // 执行数据库查询
    db_lite.all(sql, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // console.log('查询结果:', rows)
        // 返回查询结果
        res.json(rows);
    });
});

// POST 请求处理
app.post('/evaluate', (req, res) => {
    const { model, houseInfoText } = req.body;
    console.log(model, houseInfoText);

    // 确保使用 UTF-8 编码
    const command = `python llms.py ${model} "${houseInfoText}"`;
    exec(command, { encoding: 'utf8' }, (error, stdout, stderr) => {
        console.log(`Executing command: python llms.py "${model}" "${houseInfoText}"`);
        if (error) {
            console.error(`执行 Python 脚本时出错：${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // 发送评估结果到客户端
        res.json({ result: stdout.trim() });
    });
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});