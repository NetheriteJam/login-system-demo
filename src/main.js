import express from 'express';
import path from 'path';
import url from 'url';

const mainRouter = express.Router();

mainRouter.get('/', (req, res, next) => {
	const options = {
		root: path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client'),
		dotfiles: 'deny',
		header: {},
	};

	const fileName = 'index.html';

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

export default mainRouter;