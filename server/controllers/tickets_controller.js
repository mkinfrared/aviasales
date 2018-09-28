const tickets = require('../../tickets');

module.exports = {
	getTicket: (req, res) => {
		setTimeout(() => res.status(200).send(tickets), 10000);
	}
};