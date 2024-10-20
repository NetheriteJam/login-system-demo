class Server {
	clients = {};

	accountDB = {};

	signUp(username, password) {
		if ( !this.accountDB[username] ) {
			this.accountDB[username] = password;
		} else {
			return false;
		}
	}

	addClient(sessionID, client) {
		this.clients[sessionID] = client;
	}
}

export default Server;