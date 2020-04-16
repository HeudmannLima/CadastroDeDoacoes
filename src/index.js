const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const server = require('http').Server(app).listen(process.env.PORT || 3000);
const io = require('socket.io')(server);

// para um lugar especifico acessar => cors({ origin: 'http://xxx.com'});
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(routes);
