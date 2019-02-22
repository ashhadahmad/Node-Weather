const request = require('request');
const keys = require('../keys/keys');

let getWeather = (loc, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/${keys.darkskykey}/${loc.latitude},${loc.longitude}?units=si`,
			json: true
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				});
			} else {
				callback('Unable to fetch weather');
			}
		}
	);
};

module.exports.getWeather = getWeather;
