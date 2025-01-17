const { utils } = require("../utils/index");
const mongoose = require("mongoose");

class AccidentController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
    this.accidentsNumber = 2974335;
  }

  async getData(query, type, criterion) {
    try {
      let content;
      if (type === "map") {
        content = await this.getMapRepresentation(query);
      } else if (type === "pie") {
        content = await this.getPieRepresentation(query, criterion);
      } else if (type === "chart") {
        content = await this.getChartRepresentation(query, criterion);
      } else if (type === "line") {
        content = await this.getLineRepresentation(query, criterion);
      }
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  getGroupByCriteria(groupBy, query) {
    if (groupBy === "Years") {
      return { $substr: ["$Start_Date", 0, 4] };
    } else if (groupBy === "Months") {
      return { $substr: ["$Start_Date", 0, 7] };
    } else if (groupBy === "Days") {
      return { $substr: ["$Start_Date", 0, 10] };
    } else if (groupBy === "Hours" && query.Start_Date) {
      return {
        day: { $substr: ["$Start_Date", 0, 10] },
        hour: { $substr: ["$Start_Hour", 0, 2] },
      };
    } else return { $substr: ["$Start_Hour", 0, 2] };
  }

  async getNumberOfAccidentsAndGroupByRegex(query, groupByValue) {
    try {
      let aggregatorOpts;
      let groupBy = this.getGroupByCriteria(groupByValue, query);
      aggregatorOpts = [
        {
          $match: query,
        },
        {
          $group: {
            _id: groupBy,
            count: { $sum: 1 },
          },
        },
      ];
      let content = await this.database.Accident.aggregate(aggregatorOpts);
      content = utils.getArraySorted(content, groupByValue, query);
      return content;
    } catch (error) {
      throw error;
    }
  }

  async getLineRepresentation(query, criterion) {
    try {
      const timeIntervals = {
        Start_Date: query["Start_Date"],
        Start_Hour: query["Start_Hour"],
      };
      const accidents = this.getNumberOfAccidentsAndGroupByRegex(
        query,
        criterion
      );
      return accidents;
    } catch (error) {
      throw error;
    }
  }

  async getChartRepresentation(query, criterion) {
    try {
      const timeIntervals = {
        Start_Date: query["Start_Date"],
        Start_Hour: query["Start_Hour"],
      };
      const accidents = this.getNumberOfAccidentsAndGroupByRegex(
        query,
        criterion
      );
      return accidents;
    } catch (error) {
      throw error;
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
      const marker = await this.database.Accident.find(query).limit(1);
      if (marker.length > 0) {
        return {
          Start_Lat: marker[0].Start_Lat,
          Start_Lng: marker[0].Start_Lng,
          State: marker[0].State,
        };
      } else
        return {
          Start_Lat: 0,
          Start_Lng: 0,
          State: "OH",
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

  async getNumberOfAccidentsByQueryAndGroupBy(query, groupBy) {
    try {
      let aggregatorOpts;
      aggregatorOpts = [
        {
          $match: query,
        },
        {
          $unwind: { path: "$" + groupBy, preserveNullAndEmptyArrays: false },
        },
        {
          $group: {
            _id: "$" + groupBy,
            count: { $sum: 1 },
          },
        },
      ];
      let content = await this.database.Accident.aggregate(aggregatorOpts);
      content = await utils.deleteBlankFieldsAfterGrouping(content);
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

  async createFilterDatabase() {
    try {
      const content = await this.service.filtresController.createFilterDatabase();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async addAccident(payload) {
    const content = new this.database.Accident(payload);
    try {
      await content.save();
      const log = new this.database.AccidentsLog({
        method: "create",
        date: new Date(),
      });
      await log.save();
      this.accidentsNumber++;
      await utils.sendEmail({ payload });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteAllAccidents(req, res) {
    try {
      const content = await this.database.Accident.deleteMany({});
      for (let i = 0; i < this.accidentsNumber; i++) {
        const log = new this.database.AccidentsLog({
          method: "delete",
          date: new Date(),
        });
        await log.save();
      }
      this.accidentsNumber = 0;
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAllAccidents() {
    try {
      const content = await this.database.Accident.find({}).limit(20);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

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
        newContent,
        options
      );
      const log = new this.database.AccidentsLog({
        method: "update",
        date: new Date(),
      });
      await log.save();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteAccident(payload) {
    try {
      const { accidentId } = payload;
      const content = await this.database.Accident.findOneAndDelete({
        _id: accidentId,
      });
      const log = new this.database.AccidentsLog({
        method: "delete",
        date: new Date(),
      });
      await log.save();
      this.accidentsNumber--;
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAccidentById(payload) {
    try {
      const { accidentId } = payload;
      const content = await this.database.Accident.findOne({
        _id: accidentId,
      });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAccidents(payload) {
    try {
      let filterDate = {};
      if (payload.dateOne && payload.dateTwo) {
        filterDate.Start_Date = {
          $gte: payload.dateOne,
          $lte: payload.dateTwo,
        };
      } else {
        if (payload.dateOne) {
          filterDate.Start_Date = {
            $gte: payload.dateOne,
          };
        } else {
          filterDate.Start_Date = {
            $lte: payload.dateTwo,
          };
        }
      }
      const content = await this.database.Accident.find(filterDate);
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async modifyIdForStates(result) {
    let modified = [];
    for (let i = 0; i < result.length; i++) {
      let id = await this.database.State.getNameByAbbr(result[i]._id);
      let count = result[i].count;
      modified.push({ _id: id, count: count });
    }
    return modified;
  }

  async getPieRepresentation(query, criterion) {
    try {
      let content = await this.getNumberOfAccidentsByQueryAndGroupBy(
        query,
        criterion
      );
      if (criterion === "State") {
        content = await this.modifyIdForStates(content);
      } else {
        if (criterion === "Start_Date") {
          content = await utils.modifyStartDateResult(content);
        } else {
          if (criterion === "Start_Hour") {
            content = await utils.modifyStartHourResult(content);
          } else {
            if (
              criterion === "Severity" ||
              criterion === "Wind_Chill(F)" ||
              criterion === "Wind_Speed(mph)" ||
              criterion === "Temperature(F)" ||
              criterion === "Humidity(%)" ||
              criterion === "Pressure(in)" ||
              criterion === "Visibility(mi)" ||
              criterion === "Precipitation(in)"
            ) {
              content.sort(function (a, b) {
                return a._id - b._id;
              });
            }
          }
        }
      }
      return content;
    } catch (error) {
      throw error;
    }
  }

  async getAccidentsGeneralDetails() {
    try {
      let content = {};
      const newAccidents = await this.database.AccidentsLog.findByMethod(
        "create"
      );
      const deletedAccidents = await this.database.AccidentsLog.findByMethod(
        "delete"
      );
      const updatedAccidents = await this.database.AccidentsLog.findByMethod(
        "update"
      );

      content.accidentsNumber = this.accidentsNumber;
      content.newAccidentsNumber = newAccidents;
      content.deletedAccidentsNumber = deletedAccidents;
      content.updatedAccidentsNumber = updatedAccidents;
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = AccidentController;
