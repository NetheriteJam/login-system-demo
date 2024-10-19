import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

const testRouter = express.Router();

// 用于存储用户数据的内存对象
const users = {};

// 配置中间件
testRouter.use(bodyParser.json()); // 用于解析 JSON 格式的数据
testRouter.use(bodyParser.urlencoded({ extended: true })); // 用于解析 URL-encoded 格式的数据

// 根路径路由
testRouter.get('/', (req, res) => {
    res.send('欢迎来到注册和登录系统！');
});

// 注册页面（GET 请求，返回简单 HTML）
testRouter.get('/register', (req, res) => {
    res.send(`
        <form action="/test/register" method="POST">
            <label>用户名: <input type="text" name="username" /></label><br/>
            <label>密码: <input type="password" name="password" /></label><br/>
            <button type="submit">注册</button>
        </form>
    `);
});

// 登录页面（GET 请求，返回简单 HTML）
testRouter.get('/login', (req, res) => {
    res.send(`
        <form action="/test/login" method="POST">
            <label>用户名: <input type="text" name="username" /></label><br/>
            <label>密码: <input type="password" name="password" /></label><br/>
            <button type="submit">登录</button>
        </form>
    `);
});

// 注册路由（POST 请求，处理用户注册）
testRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
	console.log(req.body);

    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码不能为空' });
    }

    if (users[username]) {
        return res.status(400).json({ message: '用户已存在' });
    }

    try {
        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);
        users[username] = { password: hashedPassword };
        res.status(201).json({ message: '注册成功' });
    } catch (error) {
        res.status(500).json({ message: '注册失败' });
    }
});

// 登录路由（POST 请求，处理用户登录）
testRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码不能为空' });
    }

    const user = users[username];
    if (!user) {
        return res.status(400).json({ message: '用户不存在' });
    }

    try {
        // 验证密码
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.status(200).json({ message: '登录成功' });
        } else {
            res.status(400).json({ message: '密码错误' });
        }
    } catch (error) {
        res.status(500).json({ message: '登录失败' });
    }
});

export default testRouter;