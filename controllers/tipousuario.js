
/*
 * GET users listing.
 */

/**
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var tipousuario		= sequelize.import("../models/tiposusuario");

/** RUBEN
 * Private Functions 
 * */
var all 			= function(request, response){
	tipousuario.findAll().then((users) => {
		response.jsonp(users);
	});
};
var findById 		= function(request, response){
	tipousuario.findAll({
		where : {
			tipousuarioid : request.params.tipousuarioid
		}
	}).then((users) => {
		response.jsonp(users);
	});
};
var create 			= function(request, response){
	sequelize.transaction((transaction) => {
		return Promise.all([
		     tipousuario.create({ 
		    	 descripcion : request.body.descripcion
		     }, {transaction : transaction})
		]);
	}).then((tipousuario) => {
		response.jsonp(tipousuario);
	}).catch((error) => {
		response.jsonp(error);
	});
};
var updateAll 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		tipousuario.update({ 
		    	 descripcion : request.body.descripcion
		     },
			{ where : { tipousuarioid : request.body.tipousuarioid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar tipousuario" });
			} else {
				transaction.commit();
				tipousuario.findById(request.body.tipousuarioid).then(function(tipousuario){
					response.status(200).jsonp(tipousuario);
				});
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var updatePart 		= function(request, response){
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	sequelize.transaction(
	).then(function(transaction){
		tipousuario.destroy(
			{ where : { tipousuarioid : request.params.tipousuarioid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el tipousuario" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ tipousuario : "/tipousuario/" + request.params.tipousuarioid }]);
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