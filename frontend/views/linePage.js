const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const linePageLocation = path.join(
  __dirname,
  "./components/linePageContent.pug"
);

class LinePage {
  constructor() {}

  getLinePage(
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
      const compiledFunction = pug.compileFile(linePageLocation);
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
      const contentType = staticFileLoader.getContentType(linePageLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = LinePage;
