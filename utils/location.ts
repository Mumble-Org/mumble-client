// Get list of cities in each country by state

// const axios = require("axios");
// const fs = require("fs");
// const { countries } = require('./countries');
import axios from "axios";
import fs from "fs";
import { countries } from "./countries";

const cities = [];

async function getCities(countr) {
	let country = {};
	// @ts-ignore
	country.name = countr.name;
	country["states"] = [];

	let st = countr.states;

	if (st) {
		for (let stat of st) {
			let state = {};
			// @ts-ignore
			state.name = stat.name;

			// get cities
			try {
				const response = await axios.post(
					"https://countriesnow.space/api/v0.1/countries/state/cities",
					{
						// @ts-ignore
						country: country.name,
						state: state["name"],
					}
				);
				// @ts-ignore
				state.cities = response.data.data;
				// console.log(state);
			} catch (error) {
				console.log({
					// @ts-ignore
					country: country.name,
					state: state["name"],
				});
			}
			country["states"].push(state);
			// break;
		}
		// console.log(country);
		// console.log(country.states.length);
		// break;
	} else {
		// @ts-ignore
		country.cities = countr.cities;
	}
	return country;
}

async function getCountries() {
	let promises = [];
	for (let countr of countries) {
		promises.push(getCities(countr));
	}
	Promise.all(promises).then((result) => {
		// console.log(result);
		fs.writeFileSync("./cities.json", JSON.stringify(result));
	});
}

getCountries();
