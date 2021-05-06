const cordsService = require("./../services/cords");

let respuesta = {};

exports.list = async function(req, res){
	const {direccion} = req.query;
  if (!direccion) {
  	throw 'La direccion es requerida';
  }
  try{
		respuesta['hereApi'] = await cordsService.hereApi(direccion);
		respuesta['tomTomApi'] = await cordsService.tomTomApi(direccion);
		res.json({aprox:respuesta})
  }catch(e){
  	throw e.message
  }
};