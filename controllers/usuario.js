
/*
 * GET users listing.
 */

/** RUBEN
 * Private Attributes
 * */
var sequelize		= require ("../app").get("sequelize");
var usuario		= sequelize.import("../models/usuarios");
var host			= require ("./host");

/** RUBEN
 * Private Functions 
 * */
var all 			= function(request, response){
	var h = host.getHost(request, response);
	usuario.findAll().then(function(usuario){
		usuario.forEach(function(item){
			item['dataValues'].tipousuario = h + "/tipousuario/" + item['dataValues'].tipousuarioid;
			item['dataValues'].maquinaestado = h + "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].password;
		});
		response.jsonp(usuario);
	});
};
var findById 		= function(request, response){
	var h = host.getHost(request, response);
	usuario.findAll({
		where : {
			usuarioid : request.params.usuarioid
		}
	}).then(function(usuario){
		usuario.forEach(function(item){
			item['dataValues'].tipousuario = h + "/tipousuario/" + item['dataValues'].tipousuarioid;
			item['dataValues'].maquinaestado = h + "/maquinaestado/" + item['dataValues'].maquinaestadoid;
			delete item['dataValues'].articuloid;
			delete item['dataValues'].maquinaestadoid;
			delete item['dataValues'].password;
		});
		response.jsonp(usuario);
	});
};
var create 			= function(request, response){
	var h = host.getHost(request, response);
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
			item['dataValues'].tipousuario = h + "/tipousuario/" + item['dataValues'].tipousuarioid;
			item['dataValues'].maquinaestado = h + "/maquinaestado/" + item['dataValues'].maquinaestadoid;
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
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		usuario.update({ 
		    	 nombre : request.body.nombre,
		    	 password : request.body.password,
		    	 tipousuarioid : request.body.tipousuarioid,
		    	 maquinaestadoid : request.body.maquinaestadoid,
		    	 username : request.body.username
		     },
			{ where : { usuarioid : request.body.usuarioid } }, 
			{ transaction : transaction }
		).then(function( rowUpdated ){
			if(rowUpdated.pop() == 0){
				transaction.rollback();
				response.status(500).jsonp({ response : "No se ha podido actualizar usuario" });
			} else {
				transaction.commit();
				usuario.findById(request.body.usuarioid).then(function(usuario){
					response.status(200).jsonp(usuario);
				});
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};
var updatePart 		= function(request, response){
	var h = host.getHost(request, response);
	response.status(500).jsonp({ response : "Implementar updatePart" });
};
var deleteById 		= function(request, response){
	var h = host.getHost(request, response);
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
				response.status(200).jsonp([{ usuario : h + "/usuario/" + request.params.usuarioid }]);
			}
		});
	}).catch(function(error){
		response.status(500).jsonp(error);
	});
};

var updatePassword = function(request, response){
	var h = host.getHost(request, response);
	sequelize.transaction(
	).then(function(transaction){
		usuario.findById(request.body.usuarioid).then(function(usuario){
			usuario.update({ 
			    	password : request.body.password,
				},
				{ where : { usuarioid : request.body.usuarioid } }, 
				{ transaction : transaction }
			).then(function( usuario ){
				item['dataValues'].tipousuario = h + "/tipousuario/" + item['dataValues'].tipousuarioid;
				item['dataValues'].maquinaestado = h + "/maquinaestado/" + item['dataValues'].maquinaestadoid;
				delete item['dataValues'].articuloid;
				delete item['dataValues'].maquinaestadoid;
				delete item['dataValues'].password;
				transaction.commit();
				response.status(200).jsonp(usuario);
			}).catch(function(error){
				response.status(500).jsonp({ error : "No ha sido posible cambiar la contraseña "});
			});
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
exports.updatePassword 	= updatePassword;