const express = require('express');

const routes = express.Router();

const viagemController = require('./database/controllers/viagemController');
const rotaController = require('./database/Controllers/rotaController');
const usuarioController = require('./database/Controllers/usuarioController');
const passagemController = require('./database/Controllers/passagemController');
const onibusController = require('./database/Controllers/onibusController');
const empresaController = require('./database/Controllers/empresaController');
const cidadeController = require('./database/Controllers/cidadeController');
const sessionController = require('./database/Controllers/sessionController')

routes.post('/session', sessionController.create);

routes.get('/viagem', viagemController.index);
routes.post('/viagemfilter', viagemController.filter);
routes.get('/viagem/:id', viagemController.get);
routes.post('/viagem', viagemController.create);
routes.delete('/viagem/:id', viagemController.delete);
routes.put('/viagem', viagemController.update);

routes.get('/rota', rotaController.index);
routes.get('/rota/:id', rotaController.get);
routes.post('/rota', rotaController.create);
routes.delete('/rota/:id', rotaController.delete);
routes.put('/rota', rotaController.update);

routes.get('/usuario/', usuarioController.index);
routes.get('/usuario/:id', usuarioController.get);
//routes.get('/usuario/login', usuarioController.login);
routes.post('/usuario', usuarioController.create);
routes.delete('/usuario/:id', usuarioController.delete);
routes.put('/usuario', usuarioController.update);

routes.get('/passagem', passagemController.index);
routes.get('/passagem/:id', passagemController.get);
routes.post('/passagem', passagemController.create);
routes.delete('/passagem/:id', passagemController.delete);
routes.put('/passagem', passagemController.update);

routes.get('/onibus', onibusController.index);
routes.get('/onibus/:idEmpresa', onibusController.get);
routes.post('/onibus', onibusController.create);
routes.delete('/onibus/:id', onibusController.delete);
routes.put('/onibus', onibusController.update);

routes.get('/empresa', empresaController.index);
routes.get('/empresa/:id', empresaController.get);
routes.get('/empresaNoLogo', empresaController.indexNoImage);
routes.post('/empresa', empresaController.create);
routes.delete('/empresa/:id', empresaController.delete);
routes.put('/empresa', empresaController.update);

routes.get('/cidade', cidadeController.index);
routes.get('/cidade/:id', cidadeController.get);
routes.post('/cidade', cidadeController.create);
routes.delete('/cidade/:id', cidadeController.delete);
routes.put('/cidade', cidadeController.update);

module.exports = routes;