var nameDictionary = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  AS: "American Samoa",
  GU: "Guam",
  MP: "Northern Mariana Islands",
  PR: "Puerto Rico",
};

module.exports = function (accidentSchema) {
  accidentSchema.statics.getAllStates = async function () {
    try {
      const states = await this.find({}).distinct("State");
      return states;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getNumberOfAccidents = async function () {
    try {
      function formatDate() {
        var d = new Date(),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [month, day].join("-");
      }

      const currentDate = formatDate();
      var query = await this.find({
        Start_Time: {
          $regex: currentDate,
        },
      }).limit(1000000);
      return query.length;
    } catch (error) {
      throw error;
    }
  };
  accidentSchema.statics.getAllStatesEntities = async function () {
    try {
      const statesName = await this.find({}).distinct("State");
      const states = [];
      for (var state of statesName) {
        const stateEntry = {};
        const { Timezone } = await this.findOne({ State: state });
        stateEntry["abbreviation"] = state;
        stateEntry["timezone"] = Timezone;
        stateEntry["name"] = nameDictionary[state];
        states.push(stateEntry);
      }
      return states;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAllCounties = async function () {
    try {
      const states = await this.getAllStates();
      const counties = [];
      for (state of states) {
        const countiesFromAState = await this.find({ State: state }).distinct(
          "County"
        );
        for (county of countiesFromAState) {
          counties.push(county);
        }
      }
      return counties;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAllCountiesEntities = async function () {
    try {
      const states = await this.getAllStates();
      const countiesEntities = [];
      for (state of states) {
        const counties = await this.find({ State: state }).distinct("County");
        for (county of counties) {
          const countyEntity = {};
          countyEntity.name = county;
          countyEntity.state = nameDictionary[state];
          countiesEntities.push(countyEntity);
        }
      }
      return countiesEntities;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAllCities = async function () {
    try {
      const counties = await this.getAllCounties();
      const citiesEntities = [];
      for (county of counties) {
        const cities = await this.find({ County: county }).distinct("City");
        for (city of cities) {
          citiesEntities.push(city);
        }
      }
      return citiesEntities;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAllCitiesEntities = async function () {
    try {
      const counties = await this.getAllCounties();
      const citiesEntities = [];
      for (county of counties) {
        const cities = await this.find({ County: county }).distinct("City");
        for (city of cities) {
          const cityEntity = {};
          cityEntity.name = city;
          cityEntity.county = county;
          cityEntity.state = state;
          citiesEntities.push(cityEntity);
        }
      }
      return citiesEntities;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAllStreetsEntities = async function () {
    try {
      const cities = await this.getAllCities();
      const streetsEntities = [];
      for (city of cities) {
        const streets = await this.find({ City: city }).distinct("Street");
        for (street of streets) {
          const streetEntity = {};
          streetEntity.name = street;
          streetEntity.city = city;
          const numbers = await this.find({ Street: street }).distinct(
            "Number"
          );
          streetEntity.numbers = numbers;
          streetsEntities.push(streetEntity);
        }
      }
      return streetsEntities;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAccidentsCount = async function (filters) {
    try {
      let accidents = await this.find(filters);
      return accidents.length;
    } catch (error) {
      throw error;
    }
  };

  accidentSchema.statics.getAccidentDetails = async function () {
    try {
      const details = await this.find({}, "Description")
        .select("-_id")
        .limit(10);

      let response = "<accidents>";
      let index = 1;
      let text = '"';

      details.forEach((element) => {
        response =
          response +
          "<accident id= " +
          text +
          index +
          text +
          ">" +
          element.Description +
          "</accident>";
        index++;
      });
      response = response + "</accidents>";
      return response;
    } catch (error) {
      throw error;
    }
  };
};
