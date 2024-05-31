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



// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });



// app.post('/register', (req, res) => {
//   const { username, password, confirmPassword } = req.body;

//   // 检查密码是否匹配
//   if (password !== confirmPassword) {
//     return res.status(400).send('密码不匹配');
//   }

//   // 检查用户名是否已存在
//   db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('服务器内部错误');
//     }

//     if (results.length > 0) {
//       return res.status(400).send('用户名已存在');
//     }

//     // 将用户信息插入数据库
//     db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (error, results) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).send('服务器内部错误');
//       }

//       // 注册成功，重定向到登录页面
//       res.redirect('/login');
//     });
//   });
// });

// // 检查用户名是否存在
// app.post('/checkUsername', (req, res) => {
//   const { username } = req.body;

//   db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ error: '服务器内部错误' });
//     }

//     const exists = results.length > 0;
//     res.json({ exists });
//   });
// });

// app.post('/login', (req, res) => {
//   // 获取登录表单数据
//   const username = req.body.username;
//   const password = req.body.password;
//   const role = req.body.role;

//   // 查询数据库判断用户名是否存在
//   const query = "SELECT * FROM users WHERE username = ?";
//   db.query(query, [username], (error, results) => {
//     if (error) {
//       console.error(error);
//       res.sendStatus(500);
//       return;
//     }

//     if (results.length === 0) {
//       // 用户名不存在，登录失败
//       const errorMessage = '登录失败，用户名不存在';
//       res.render('login', { errorMessage });
//       return;
//     }

//     // 用户名存在，继续验证密码和角色
//     const user = results[0];

//     if (user.password !== password) {
//       // 密码错误，登录失败
//       const errorMessage = '登录失败，密码错误';
//       res.render('login', { errorMessage });
//       return;
//     }

//     if (user.role !== role) {
//       // 角色错误，登录失败
//       const errorMessage = '登录失败，角色错误';
//       res.render('login', { errorMessage });
//       return;
//     }

//     // 登录成功
// // 你可以根据角色跳转到不同的页面
// if (role === 'user') {
//   res.redirect('/user_dashboard');
// } else if (role === 'admin') {
//   res.redirect('/admin_dashboard');
// } else if (role === 'agent') {
//   res.redirect('/agent_dashboard');
// }
//   });
// });


// //
// // 设置 404 页面
// app.use((req, res) => {
//     res.status(404).render('404');
//   });
  
  
//   // 后端路由处理
// app.get('/check-username', (req, res) => {
//   const { username } = req.query;

//   // 查询数据库检查用户名是否已存在
//   connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
//     if (error) {
//       console.error('Error:', error);
//       res.json({ exists: false });
//     } else {
//       const exists = results.length > 0;
//       res.json({ exists });
//     }
//   });
// });

