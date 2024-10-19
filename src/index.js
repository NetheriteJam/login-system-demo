import mainRouter from './main.js';
import testRouter from './test.js';
import signUpRouter from './signUp.js';
import express from 'express';

const app = express();

const port = 25565;

app.use(mainRouter);

app.use('/signup', signUpRouter);

app.use('/test', testRouter);

app.listen(port, () => {
	console.log(`Server listening on port: ${port}.`);
});
