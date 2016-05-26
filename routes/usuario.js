/**
 * New node file
 */
var appFastplate = require("../app");
var usuario = require("../controllers/usuario");

appFastplate.get('/usuario', usuario.all);
appFastplate.get('/usuario/:usuarioid', usuario.findById);
appFastplate.post('/usuario', usuario.create);
appFastplate.patch('/updateusuariopassword', usuario.updatePassword);
appFastplate.put('/usuario', usuario.updateAll);
appFastplate.patch('/usuario', usuario.updatePart);
appFastplate.delete('/usuario/:usuarioid', usuario.deleteById);