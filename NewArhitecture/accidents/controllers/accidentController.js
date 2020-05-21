const { utils } = require("../utils/index");

class AccidentController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  async getData(query, type) {
    try {
      let content;
      if (type === "map") {
        content = await this.getMapRepresentation(query);
      } else if (type === "pie") {
        console.log("Fa pie");
        content = await this.database.Accident.getAccidentsCount(query);
      } else if (type === "chart") {
        console.log("Fa chart");
        content = "abc";
      }
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getMapRepresentation(query) {
    try {
      const locationTypes = [
        "State",
        "County",
        "City",
        "Street",
        "Timezone",
        "Number",
      ];
      const hasALocationKey = locationTypes.filter((type) => {
        return query.hasOwnProperty(type);
      });
      let content;
      if (hasALocationKey.length) {
        content = await this.getMapMarkers(query);
      } else {
        content = await this.getMapByStates(query);
      }
      return content;
    } catch (error) {
      throw error;
    }
  }

  async getMapMarkers(query) {
    try {
      delete query["Types"];
      const marker = await this.database.Accident.find(query).limit(1);
      return {
        Start_Lat: marker[0].Start_Lat,
        Start_Lng: marker[0].Start_Lng,
        State: marker[0].State,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMapByStates(query) {
    try {
      const result = await this.getNumberOfAccidentsByQueryAndGroupBy(
        query,
        "State"
      );
      const boudaries = utils.getBoudaries(result);
      return { dataset: result, boudaries };
    } catch (error) {
      throw error;
    }
  }

  //numarul de accidente in functie de niste criterii grupate pe un criteriu dat de noi(*Georgiana nu uita ca ai sters aia cu map si ai zis ca folosesti asta in schimb)
  async getNumberOfAccidentsByQueryAndGroupBy(query, groupBy) {
    try {
      delete query["Type"];
      let aggregatorOpts;
      aggregatorOpts = [
        {
          $match: query,
        },
        {
          $unwind: "$" + groupBy,
        },
        {
          $group: {
            _id: "$" + groupBy,
            count: { $sum: 1 },
          },
        },
      ];
      const content = await this.database.Accident.aggregate(aggregatorOpts);
      return content;
    } catch (error) {
      throw error;
    }
  }

  async getDailyAccidents() {
    try {
      const content = await this.database.Accident.getNumberOfAccidents();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAccidentsDetails() {
    try {
      const content = await this.database.Accident.getAccidentDetails();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //creeaza baza de date pentru filtre
  async createFilterDatabase() {
    try {
      const content = await this.service.filtresController.createFilterDatabase();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //Returneaza numarul de accidente care respecta o serie de criterii
  async getNumberOfAccidentsByCriterias(query) {
    try {
      const { queryStringObject: criteria } = query;
      const content = await this.database.Accident.find(
        criteria
      ).countDocuments();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //adauga un accident in functie de informatiile din body(admin)
  async addAccident(payload) {
    const content = new this.database.Accident(payload);
    try {
      await content.save();
      await utils.sendEmail({ payload });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //sterge toate accidentele(admin)
  async deleteAllAccidents(req, res) {
    try {
      const content = await this.database.Accident.deleteMany({});
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //returneaza toate accidentele din baza de date(admin)
  async getAllAccidents() {
    try {
      const content = await this.database.Accident.find({}).limit(20);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //updateaza datele unui accident cu ajutorul informatiilor primite in body(trebuie pus id-ul accidentului in query string)
  async updateAccident(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const { accidentId, body: newContent } = payload;
      const content = await this.database.Accident.findOneAndUpdate(
        {
          _id: accidentId,
        },
        { newContent },
        options
      );
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //sterge un accident primit in queryString
  async deleteAccident(payload) {
    try {
      const { accidentId } = payload;
      const content = await this.database.Accident.findOneAndDelete({
        _id: accidentId,
      });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  //returneaza accidentele(toate informatiile) in functie de datele din query string(ex. State='OH')
  async getAccidentsByQuery(payload) {
    try {
      const { queryStringObject: query } = payload;
      const content = await this.database.Accident.find(query);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getPieRepresentation(query, infoObject) {
    try {
      const criterion = infoObject.pieCriterion;
      let content = await this.getNumberOfAccidentsByQueryAndGroupBy(
        query,
        criterion
      );

      console.log("aiciii");
      console.log(content);
      return content;
    } catch (error) {
      throw error;
    }
  }

  hourPredicate(accident, firstHourDate, secondHourDate) {
    if (
      accident.Start_Time.getUTCHours() > firstHourDate.getUTCHours() &&
      accident.Start_Time.getUTCHours() < secondHourDate.getUTCHours()
    ) {
      return true;
    } else {
      if (
        accident.Start_Time.getUTCHours() === firstHourDate.getUTCHours() &&
        accident.Start_Time.getUTCHours() === secondHourDate.getUTCHours()
      ) {
        if (
          accident.Start_Time.getUTCMinutes() >=
            firstHourDate.getUTCMinutes() &&
          accident.Start_Time.getUTCMinutes() <= secondHourDate.getUTCMinutes()
        ) {
          return true;
        }
      }
    }
    return false;
  }

  async filterDataByHour(data, infoObject) {
    let accidents = data;
    if (
      (infoObject.firstDate &&
        infoObject.secondDate &&
        infoObject.firstHour &&
        infoObject.secondHour) ||
      (infoObject.firstHour && infoObject.secondHour)
    ) {
      const hourOne = infoObject.firstHour.substring(0, 2);
      const minuteOne = infoObject.firstHour.substring(3);
      let firstHourDate = new Date();
      firstHourDate.setUTCHours(hourOne, minuteOne);

      const hourTwo = infoObject.secondHour.substring(0, 2);
      const minuteTwo = infoObject.secondHour.substring(3);
      let secondHourDate = new Date();
      secondHourDate.setUTCHours(hourTwo, minuteTwo);

      accidents = accidents.filter((accident) =>
        this.hourPredicate(accident, firstHourDate, secondHourDate)
      );
    } else {
      if (infoObject.firstHour) {
        const hourOne = infoObject.firstHour.substring(0, 2);
        const minuteOne = infoObject.firstHour.substring(3);
        let firstHourDate = new Date();
        firstHourDate.setUTCHours(hourOne, minuteOne);

        let secondHourDate = new Date();
        secondHourDate.setUTCHours("23", "59");

        accidents = accidents.filter((accident) =>
          this.hourPredicate(accident, firstHourDate, secondHourDate)
        );
      } else {
        if (infoObject.secondHour) {
          let firstHourDate = new Date();
          firstHourDate.setUTCHours("00", "00");

          const hourTwo = infoObject.secondHour.substring(0, 2);
          const minuteTwo = infoObject.secondHour.substring(3);
          let secondHourDate = new Date();
          secondHourDate.setUTCHours(hourTwo, minuteTwo);

          accidents = accidents.filter((accident) =>
            this.hourPredicate(accident, firstHourDate, secondHourDate)
          );
        }
      }
    }
    return accidents;
  }
}

module.exports = AccidentController;
