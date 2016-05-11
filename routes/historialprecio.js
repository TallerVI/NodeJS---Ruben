/**
 * New node file
 */
var appFastplate = require("../app");
var historialprecio = require("../controllers/historialprecio");

appFastplate.get('/historialprecio', historialprecio.all);
appFastplate.get('/historialprecio/:historialprecioid', historialprecio.findById);
appFastplate.post('/historialprecio', historialprecio.create);