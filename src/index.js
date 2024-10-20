import mainRouter from './main.js';
import testRouter from './test.js';
import signUpRouter from './signUp.js';
import signInRouter from './signIn.js';
import express from 'express';
import session from 'express-session';
import Server from './server.js';

const server = new Server();

const app = express();

const port = 25565;

app.use(session({
	secret: 'woiqhfwqedjqpoijaskdfqpewoldq',
	resave: false,
	saveUninitialized: true,
}));

app.use(mainRouter);
app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/test', testRouter);

app.listen(port, () => {
	console.log(`Server listening on port: ${port}.`);
});

export default server;