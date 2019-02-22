const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h').argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if (errorMessage) console.log(errorMessage);
	else {
		weather.getWeather(results, (errorMessage, weatherResults) => {
			if (errorMessage) console.log(errorMessage);
			else {
				console.log(
					`It's currently ${weatherResults.temperature}°C in ${results.address}, but it feels like ${weatherResults.apparentTemperature}°C.`
				);
			}
		});
	}
});
