const express    = require('express'),
	  bodyParser = require('body-parser'),
	  tc         = require('./controllers/tickets_controller');

const app = express();

app.use(bodyParser.json());

app.get('/api/tickets', tc.getTicket);

app.listen(3232, () => console.log('Server is running on port 3232'));