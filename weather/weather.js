const request = require('request');

let getWeather = (loc, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/8b1a18ff3e501ff65b145390d7699c75/${loc.latitude},${loc.longitude}`,
			json: true
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, body.currently.temperature);
			} else {
				callback('Unable to fetch weather');
			}
		}
	);
};

module.exports.getWeather = getWeather;
