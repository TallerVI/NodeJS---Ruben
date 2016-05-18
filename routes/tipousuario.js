/**
 * New node file
 */
var appFastplate = require("../app");
var tipousuario = require("../controllers/tipousuario");

appFastplate.get('/tipousuario', tipousuario.all);
appFastplate.get('/tipousuario/:tipousuarioid', tipousuario.findById);
appFastplate.post('/tipousuario', tipousuario.create);
appFastplate.put('/tipousuario', tipousuario.updateAll);
appFastplate.path('/tipousuario', tipousuario.updatePart);
appFastplate.delete('/tipousuario/:tipousuarioid', tipousuario.deleteById);