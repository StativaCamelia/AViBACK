const fetch = require("node-fetch");
const math = require("mathjs");
class Utils {
  constructor() {}

  static get corsHeader() {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, PUT, DELETE",
      "Access-Control-Allow-Headers": "auth-token, Content-Type",
    };
  }

  sendAnswer(success, data, res, statusCode = 200) {
    if (success) {
      const { content } = data;
      res.writeHead(statusCode, Utils.corsHeader);
      res.write(JSON.stringify({ content }, null, 2));
      res.end();
    } else {
      const { error } = data;
      console.log(error);
      res.writeHead(401, Utils.corsHeader);
      res.write(error.message);
      res.end();
    }
  }

  async sendEmail(content) {
    const { payload: query } = content;
    delete query._id;
    delete query._v;
    let queryString = this.getQueryStringFromObject(query);
    try {
      let result = await fetch(
        `http://localhost:5003/users/send-email?${queryString}`,
        {
          method: "get",
        }
      );
      if (result.status === 200) return true;
      else return false;
    } catch (error) {
      throw error;
    }
  }

  getQueryStringFromObject(object) {
    let queryString = "";
    for (let field in object) {
      queryString = this.concatQueryString(queryString, field, object[field]);
    }
    return queryString.substr(1);
  }

  concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
  }

  async getAuthorization(req) {
    try {
      const auth_token = req.headers["auth-token"];
      let result = await fetch(
        "http://localhost:5003/users/authorization?token=" + auth_token,
        {
          method: "get",
        }
      );
      if (result.status === 200) return true;
      else return false;
    } catch (error) {
      throw error;
    }
  }

  getBoudaries(content) {
    let value = content.map((element) => element.count);
    if (value.length > 0)
      return {
        first: [0, math.quantileSeq(value, 0.25)],
        second: [math.quantileSeq(value, 0.25), math.median(value)],
        third: [math.median(value), math.quantileSeq(value, 0.75)],
        fourth: [math.quantileSeq(value, 0.75), math.max(value)],
      };
    else
      return { first: [0, 0], second: [0, 0], third: [0, 0], fourth: [0, 0] };
  }

  getArraySorted(content, groupBy, query) {
    if (groupBy === "Years") {
      return content.sort(function (a, b) {
        return parseInt(a._id) - parseInt(b._id);
      });
    }
    if (groupBy === "Months") {
      return content.sort(function (a, b) {
        if (parseInt(a._id.substring(0, 4)) !== parseInt(b._id.substring(0, 4)))
          return (
            parseInt(a._id.substring(0, 4)) - parseInt(b._id.substring(0, 4))
          );
        else {
          return parseInt(
            a._id.substring(5, 7) - parseInt(b._id.substring(5, 7))
          );
        }
      });
    }
    if (groupBy === "Days") {
      return content.sort(function (a, b) {
        if (parseInt(a._id.substring(0, 4)) !== parseInt(b._id.substring(0, 4)))
          return (
            parseInt(a._id.substring(0, 4)) - parseInt(b._id.substring(0, 4))
          );
        else if (
          parseInt(a._id.substring(5, 7)) !== parseInt(b._id.substring(5, 7))
        ) {
          return parseInt(
            a._id.substring(5, 7) - parseInt(b._id.substring(5, 7))
          );
        } else
          return (
            parseInt(a._id.substring(8, 10)) - parseInt(b._id.substring(8.1))
          );
      });
    }
    if (groupBy === "Hours") {
      if (query.Start_Date) {
        return content.sort(function (a, b) {
          if (
            parseInt(a._id.day.substring(0, 4)) !==
            parseInt(b._id.day.substring(0, 4))
          )
            return (
              parseInt(a._id.day.substring(0, 4)) -
              parseInt(b._id.day.substring(0, 4))
            );
          else if (
            parseInt(a._id.day.substring(5, 7)) !==
            parseInt(b._id.day.substring(5, 7))
          ) {
            return (
              parseInt(a._id.day.substring(5, 7)) -
              parseInt(b._id.day.substring(5, 7))
            );
          } else if (
            parseInt(a._id.day.substring(8, 10)) !==
            parseInt(b._id.day.substring(8, 10))
          ) {
            return (
              parseInt(a._id.day.substring(8, 10)) -
              parseInt(b._id.day.substring(8.1))
            );
          } else return parseInt(a._id.hour) - parseInt(a._id.hour);
        });
      } else
        return content.sort(function (a, b) {
          return parseInt(a._id) - parseInt(b._id);
        });
    }
  }

  async deleteBlankFieldsAfterGrouping(content) {
    for (let i = 0; i < content.length; i++) {
      if (!content[i]._id) {
        content.splice(i, 1);
      }
    }
    return content;
  }

  checkExistingElement(elements, element) {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i]._id === element) {
        return i;
      }
    }
    return -1;
  }

  fromNumericMonthsToAbbr(months) {
    let newMonths = [];
    const numericMonths = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const abbrMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 0; i < numericMonths.length; i++) {
      for (let j = 0; j < months.length; j++) {
        if (numericMonths[i] === months[j]._id) {
          newMonths.push({ _id: abbrMonths[i], count: months[j].count });
          break;
        }
      }
    }
    return newMonths;
  }

  async getYearsFromGroupResult(content) {
    let years = [];
    for (let i = 0; i < content.length; i++) {
      let yearId = content[i]._id.substring(0, 4);
      let yearCount = content[i].count;
      let index = await this.checkExistingElement(years, yearId);
      if (index === -1) {
        years.push({ _id: yearId, count: yearCount });
      } else {
        years[index].count += yearCount;
      }
    }
    years.sort(function (a, b) {
      return a._id.localeCompare(b._id);
    });
    return years;
  }

  async getMonthsFromGroupResult(content) {
    let months = [];
    for (let i = 0; i < content.length; i++) {
      let monthId = content[i]._id.substring(5, 7);
      let monthCount = content[i].count;
      let index = await this.checkExistingElement(months, monthId);
      if (index === -1) {
        months.push({ _id: monthId, count: monthCount });
      } else {
        months[index].count += monthCount;
      }
    }
    months = this.fromNumericMonthsToAbbr(months);
    return months;
  }

  async getDaysFromGroupResult(content) {
    let days = [];
    for (let i = 0; i < content.length; i++) {
      let dayId = content[i]._id.substring(8, 10);
      let dayCount = content[i].count;
      let index = await this.checkExistingElement(days, dayId);
      if (index === -1) {
        days.push({ _id: dayId, count: dayCount });
      } else {
        days[index].count += dayCount;
      }
    }
    days.sort(function (a, b) {
      return a._id.localeCompare(b._id);
    });
    return days;
  }

  async getDaysOfWeekFromGroupResult(content) {
    let days = [];
    for (let i = 0; i < content.length; i++) {
      let dayId = new Date(content[i]._id)
        .toDateString()
        .substring(0, new Date(content[i]._id).toDateString().indexOf(" "));
      let dayCount = content[i].count;
      let index = await this.checkExistingElement(days, dayId);
      if (index === -1) {
        days.push({ _id: dayId, count: dayCount });
      } else {
        days[index].count += dayCount;
      }
    }
    let newDays = [];
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    for (let i = 0; i < daysOfWeek.length; i++) {
      for (let j = 0; j < days.length; j++) {
        if (days[j]._id === daysOfWeek[i]) {
          newDays.push({ _id: daysOfWeek[i], count: days[j].count });
          break;
        }
      }
    }
    return newDays;
  }

  async modifyStartDateResult(content) {
    let newContent = {};
    newContent.years = await this.getYearsFromGroupResult(content);
    newContent.months = await this.getMonthsFromGroupResult(content);
    newContent.days = await this.getDaysFromGroupResult(content);
    newContent.daysOfWeek = await this.getDaysOfWeekFromGroupResult(content);
    newContent.allDates = content;
    return newContent;
  }

  async modifyStartHourResult(content) {
    const hours = [
      "00:00:00",
      "01:00:00",
      "02:00:00",
      "03:00:00",
      "04:00:00",
      "05:00:00",
      "06:00:00",
      "07:00:00",
      "08:00:00",
      "09:00:00",
      "10:00:00",
      "11:00:00",
      "12:00:00",
      "13:00:00",
      "14:00:00",
      "15:00:00",
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00",
      "21:00:00",
      "22:00:00",
      "23:00:00",
    ];
    let newHours = [];
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < hours.length - 1; j++) {
        if (content[i]._id >= hours[j] && content[i]._id <= hours[j + 1]) {
          let hourId =
            hours[j].substring(0, 5) + "-" + hours[j + 1].substring(0, 5);
          let hourCount = content[i].count;
          let index = this.checkExistingElement(newHours, hourId);
          if (index === -1) {
            newHours.push({ _id: hourId, count: hourCount });
          } else {
            newHours[index].count += hourCount;
          }
        }
      }
    }
    newHours.sort(function (a, b) {
      return a._id.localeCompare(b._id);
    });
    return newHours;
  }
}

module.exports = Utils;
