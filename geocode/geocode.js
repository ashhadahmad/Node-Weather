const request = require('request');

let geocodeAddress = (address, callback) => {
	const encodedAddress = encodeURIComponent(address);
	request(
		{
			url: `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=75b26831eca34dbea3bbe1e8e78dc507`,
			json: true
		},
		(error, response, body) => {
			if (error) callback('Unable to connect');
			else if (!body.results[0]) callback('Invalid Address');
			else {
				callback(undefined, {
					address: body.results[0].formatted,
					latitude: body.results[0].geometry.lat,
					longitude: body.results[0].geometry.lng
				});
			}
		}
	);
};

module.exports.geocodeAddress = geocodeAddress;
