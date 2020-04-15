const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// LOGIN - CRIAR SESSÃO
routes.post('/session', SessionController.create);

// TABELA ONG
routes.get('/ongs', OngController.index);   // LISTAR REGISTROS
routes.post('/ongs', OngController.create);  // CRIAR REGISTRO

// TABELA INCIDENTS
routes.get('/incidents', IncidentController.index);     // LISTAR CASOS
routes.post('/incidents', IncidentController.create);    // CRIAR CASO
routes.delete('/incidents/:id', IncidentController.delete); // DELETAR CASO X

// MOSTRA AS INCIDENTS POR ONG
routes.get('/profile', ProfileController.index); // LISTAR CASOS DE ONG ESPECIFICA


module.exports = routes;