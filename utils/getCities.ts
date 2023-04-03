// Suggestion algorithm to get location information
import { countries } from "./countries";

interface CountryInterface {
  name: String;
  states?: {
    name: String;
    cities: String[];
  }[];
  cities?: String[];
}

async function getCities(country: CountryInterface, text: String) {
  let ret = [];

  if (country.states) {
    for (let state of country.states) {
      if (state.cities) {
        for (let city of state.cities) {
          if (city.toLowerCase().includes(text.toLowerCase())) {
            ret.push(`${city}, ${state.name}, ${country.name}`);
          }
        }
      }

      if (state.name.toLowerCase().includes(text.toLowerCase())) {
        ret.push(`${state.name}, ${country.name}`);
      }
    }
  } else if (country.cities) {
    for (let city of country.cities) {
      if (city.toLowerCase().includes(text.toLowerCase())) {
        ret.push(`${city}, ${country.name}`);
      }
    }
  }

  return ret;
}

export async function getCitySuggestions(text: String) {
  let promises = [];
  let ret = [];

  for (let country of countries) {
    promises.push(getCities(country, text));
  }

  let results = await Promise.all(promises);

  for (let result of results) {
    if (result.length > 0) {
      for (let city of result) {
        ret.push(city);
      }
    }
  }

  return ret;
}
