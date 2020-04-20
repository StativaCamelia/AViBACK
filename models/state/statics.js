module.exports = function (stateSchema) {
  stateSchema.statics.getAllStates = async function () {
    try {
      const states = this.find({});
      return states;
    } catch (error) {
      throw error;
    }
  };
};
