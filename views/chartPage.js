const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const chartPageLocation = path.join(
  __dirname,
  "./components/chartPageContent.pug"
);

class ChartPage {
  constructor() {}

  getChartPage(
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
      const compiledFunction = pug.compileFile(chartPageLocation);
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
      const contentType = staticFileLoader.getContentType(chartPageLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = ChartPage;
