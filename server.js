const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { exec } = require('child_process');

const app = express();
const port = 3500;

// 连接到 SQLite 数据库
const db = new sqlite3.Database('house_wuhan.db');

// 设置静态文件目录
app.use(express.static(__dirname)); // 将当前目录作为静态文件目录

// 使用 JSON 中间件解析请求体
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/房源评估.html'); // 发送房源评估.html作为响应
});

// 处理搜索请求
app.post('/search', (req, res) => {
    const { table, query } = req.body;

    // 构建 SQL 查询语句
    const sql = `SELECT * FROM ${table} WHERE 名称 LIKE '%${query}%'`;

    // 执行数据库查询
    db.all(sql, (err, rows) => {
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


// 启动 Express 服务器
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
