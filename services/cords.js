const axios = require('axios');
const config = require('./../config');

module.exports = {
	hereApi,
	tomTomApi
};

function hereApi(direccion) {
	return new Promise((resolve, reject) => {
	 	axios.get('https://geocode.search.hereapi.com/v1/geocode',{params:{
			q:direccion,
			apiKey:config.HERE_API_HEY,
			limit:1
		}})
		.then(function ({data}) {
			if (data && data['items'] && data['items'][0] && data['items'][0]['position']) {
				resolve({title:data['items'][0]['title'], lat:data['items'][0]['position']['lat'], lng:data['items'][0]['position']['lng']}) 
			}else{
				resolve({title:'No encontrada', lat:null, lng:null}) 
			}
		})
		.catch(function (error) {
			throw error
		});
	});
}

function tomTomApi(direccion) {
	return new Promise((resolve, reject) => {
		let str = direccion.replace('#','')  
		str = str.replace('/','')
		str = str.replace('?','')
		axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURI(str)}.json?key=sLVtqcQ8eOGT1BbGanpVBiTH1wjORjDS&limit=1`)
		.then(function ({data}) {
			if (data && data['results'] && data['results'][0] && data['results'][0]['position']) {
				resolve({title:data['results'][0]['address']['freeformAddress'], lat:data['results'][0]['position']['lat'], lng:data['results'][0]['position']['lon']}) 
			}else{
				resolve({title:'No encontrada', lat:null, lng:null}) 
			}
		})
		.catch(error => resolve({error:error.message}));
	});
}