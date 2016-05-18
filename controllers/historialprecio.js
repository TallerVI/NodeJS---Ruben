
/*
 * GET users listing.
 */

/**RUBEN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var historialprecio		= sequelize.import("../models/historialprecios");

/** 
 * Private Functions 
 * */
var all 			= function(request, response){
	historialprecio.findAll().then(function(historialprecio){
		historialprecio.forEach(function(item){
			item['dataValues'].articulo = "/articulo/" + item['dataValues'].articuloid;
			delete item['dataValues'].articuloid;
		});
		response.jsonp(historialprecio);
	});
};
var findById 		= function(request, response){
	historialprecio.findAll({
		where : {
			historialprecioid :  request.params.historialprecioid
		}
	}).then(function(historialprecio){
		historialprecio.forEach(function(item){
			item['dataValues'].articulo = "/articulo/" + item['dataValues'].articuloid;
			delete item['dataValues'].articuloid;
		});
		response.jsonp(historialprecio);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     historialprecio.create({ 
		    	 articuloid : request.body.articuloid,
		    	 fecha_desde : request.body.fecha_desde,
		    	 fecha_hasta :request.body.fecha_hasta
		     }, {transaction : transaction})
		]);
	}).then(function(historialprecio){
		historialprecio.forEach(function(item){
			item['dataValues'].articulo = "/articulo/" + item['dataValues'].articuloid;
			delete item['dataValues'].articuloid;
		});
		response.jsonp(historialprecio);
	}).catch(function(error){
		//response.set_status(400);
		response.jsonp(error);
	});
};
var updateAll 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updateAll" });
};
var updatePart 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		historialprecio.destroy(
			{ where : { historialprecioid : request.params.historialprecioid }, transaction : transaction }
		).then(function( rowdeleted ){
			if(rowdeleted != request.params.historialprecioid ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el historialprecio" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ historialprecio : "/historialprecio/" + request.params.historialprecioid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;
exports.updateAll 	= updateAll;
exports.updatePart 	= updatePart;
exports.deleteById 	= deleteById;