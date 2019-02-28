const request = require('request');
const keys = require('../keys/keys');

let geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		const encodedAddress = encodeURIComponent(address);
		request(
			{
				url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${keys.geocodekey}`,
				json: true
			},
			(error, response, body) => {
				if (error) reject('Unable to connect');
				else if (!body.results[0]) reject('Invalid Address');
				else {
					resolve({
						address: body.results[0].formatted,
						latitude: body.results[0].geometry.lat,
						longitude: body.results[0].geometry.lng
					});
				}
			}
		);
	});
};

module.exports.geocodeAddress = geocodeAddress;
