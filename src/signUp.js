import express from 'express';
import path from 'path';
import url from 'url';
import bodyParser from 'body-parser';
import server from './index.js';
import Client from './client.js';

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
				// console.log('Sent: ', fileName);
			}
		}
	);
});

signUpRouter.post('/', (req, res, next) => {
	const {username, password} = req.body;

	if ( server.signUp(username, password) ) {
		server.addClient(req.session.id, new Client(username));
		req.session.loggedIn = true;
		res.send('Signed up!<br><a href="/">Back<a/>');

	} else {
		res.send('Sign up failed!<br><a href="/">Back<a/>');
	}
});

export default signUpRouter;