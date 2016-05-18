/**
 * New node file
 */
var appFastplate = require("../app");
var usuario = require("../controllers/usuario");

appFastplate.get('/usuario', usuario.all);
appFastplate.get('/usuario/:usuarioid', usuario.findById);
appFastplate.post('/usuario', usuario.create);
appFastplate.put('/usuario', usuario.updateAll);
appFastplate.path('/usuario', usuario.updatePart);
appFastplate.delete('/usuario/:usuarioid', usuario.deleteById);