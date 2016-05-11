
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

/**
 * Export functions
 * 
 */
exports.all 		= all;
exports.findById 	= findById;
exports.create 		= create;