const yargs = require('yargs');
const axios = require('axios');
const keys = require('./keys/keys');

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

let encodedAddress = encodeURIComponent(argv.a);
let geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${keys.geocodekey}`;

let address;
axios
	.get(geocodeURL)
	.then((response) => {
		if (!response.data.results[0]) throw new Error('Invalid Address');
		address = response.data.results[0].formatted;
		let weatherURL = `https://api.darksky.net/forecast/${keys.darkskykey}/${response.data.results[0].geometry
			.lat},${response.data.results[0].geometry.lng}?units=si`;
		return axios.get(weatherURL);
	})
	.then((response) => {
		let temp = response.data.currently.temperature;
		let actualtemp = response.data.currently.apparentTemperature;
		console.log(`It's currently ${temp}°C in ${address}, but it feels like ${actualtemp}°C.`);
	})
	.catch((error) => {
		if (error.code === 'ENOTFOUND') reject('Unable to connect');
		console.log(error.message);
	});
