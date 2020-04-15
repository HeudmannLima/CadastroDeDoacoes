const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// para um lugar especifico acessar => cors({ origin: 'http://xxx.com'});
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
