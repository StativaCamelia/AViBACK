//make a function that calculetes the number for the counter

module.exports = function (accidentSchema) {
  accidentSchema.methods.getNumberOfAccidents = async function () {
    try {
      console.log("HEREEEE");
      var number = 0;
      var currentDate = new Date();
      var currentMonth = currentDate.getUTCMonth() + 1;
      var currentDay = currentDate.getUTCDate();
      this.find().forEach((element) => {
        var month = element.Start_Time.getUTCMonth() + 1;
        var day = element.Start_Time.getUTCDate();
        if (month === currentMonth && day === currentDay) {
          number++;
        }
      });
      return number;
    } catch (error) {
      throw error;
    }
  };
};
