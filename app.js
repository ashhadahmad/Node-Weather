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
		console.log(JSON.stringify(results, undefined, 2));
		let location = results;
		weather.getWeather(location, (errorMessage, results) => {
			if (errorMessage) console.log(errorMessage);
			else {
				console.log(JSON.stringify(results, undefined, 2));
			}
		});
	}
});

//8b1a18ff3e501ff65b145390d7699c75
