
/*
 * GET users listing.
 */

/** RUBEN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var usuario		= sequelize.import("../models/usuarios");

/** RUBEN
 * Private Functions 
 * */
var all 			= function(request, response){
	usuario.findAll().then(function(usuario){
		usuario.forEach(function(item){
			item['dataValues'].tipousuario = "/tipousuario/" + item['dataValues'].tipousuarioid;
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].password;
		});
		response.jsonp(usuario);
	});
};
var findById 		= function(request, response){
	usuario.findAll({
		where : {
			usuarioid : request.params.usuarioid
		}
	}).then(function(usuario){
		usuario.forEach(function(item){
			item['dataValues'].tipousuario = "/tipousuario/" + item['dataValues'].tipousuarioid;
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].password;
		});
		response.jsonp(usuario);
	});
};
var create 			= function(request, response){
	sequelize.transaction(function(transaction){
		return Promise.all([
		     usuario.create({ 
		    	 nombre : request.body.nombre,
		    	 password : request.body.password,
		    	 tipousuarioid : request.body.tipousuarioid,
		    	 maquinaestadoid : request.body.maquinaestadoid,
		    	 username : request.body.username
		     }, {transaction : transaction})
		]);
	}).then(function(usuario){
		usuario.forEach(function(item){
			item['dataValues'].tipousuario = "/tipousuario/" + item['dataValues'].tipousuarioid;
			item['dataValues'].maquinaestado = "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].password;
		});
		response.jsonp(usuario);
	}).catch(function(error){
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
		usuario.destroy(
			{ where : { usuarioid : request.params.usuarioid }, transaction : transaction }
		).then(function( rowdeleted ){
			if( rowdeleted == 0 ){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido eliminar el usuario" });
			} else {
				transaction.commit();
				response.status(200).jsonp([{ usuario : "/usuario/" + request.params.usuarioid }]);
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