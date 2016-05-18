/**
 * New node file
 */
var appFastplate = require("../app");
var historialprecio = require("../controllers/historialprecio");

appFastplate.get('/historialprecio', historialprecio.all);
appFastplate.get('/historialprecio/:historialprecioid', historialprecio.findById);
appFastplate.post('/historialprecio', historialprecio.create);
appFastplate.put('/historialprecio', historialprecio.updateAll);
appFastplate.path('/historialprecio', historialprecio.updatePart);
appFastplate.delete('/historialprecio/:historialprecioid', historialprecio.deleteById);