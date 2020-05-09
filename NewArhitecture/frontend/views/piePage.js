const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const piePageLocation = path.join(__dirname, "./components/piePageContent.pug");

class PiePage {
  constructor() {}

  getPiePage(
    statesValues,
    countiesValues,
    citiesValues,
    streetsValues,
    numbersValues,
    timezoneValues,
    roadSideValues,
    weatherValues,
    windDirectionValues,
    ids
  ) {
    try {
      const compiledFunction = pug.compileFile(piePageLocation);
      const content = compiledFunction({
        states: JSON.stringify(statesValues),
        counties: JSON.stringify(countiesValues),
        cities: JSON.stringify(citiesValues),
        streets: JSON.stringify(streetsValues),
        numbers: JSON.stringify(numbersValues),
        timezones: JSON.stringify(timezoneValues),
        roadSides: JSON.stringify(roadSideValues),
        weather: JSON.stringify(weatherValues),
        windDirections: JSON.stringify(windDirectionValues),
        activeIds: JSON.stringify(ids),
      });
      const contentType = staticFileLoader.getContentType(piePageLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = PiePage;
