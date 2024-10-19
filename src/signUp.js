import express from 'express';
import path from 'path';
import url from 'url';
import bodyParser from 'body-parser';

const signUpRouter = express.Router();

signUpRouter.use(bodyParser.json());
signUpRouter.use(bodyParser.urlencoded({ extended: true}));

signUpRouter.get('/', (req, res, next) => {
	const options = {
		root: path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client'),
		dotfiles: 'deny',
		header: {},
	};

	const fileName = 'sign-up.html';

	res.sendFile(
		fileName,
		options,
		(err) => {
			if ( err ) {
				next(err);
			} else {
				console.log('Sent: ', fileName);
			}
		}
	);
	next();
});

signUpRouter.post('/', (req, res, next) => {
	const {username, password} = req;

	// some magic

	res.send('Signed up!<br><a href="/">Back<a/>');
	next();
});

signUpRouter.all('/', (req, res, next) => {
	console.log(req.method);
});

export default signUpRouter;