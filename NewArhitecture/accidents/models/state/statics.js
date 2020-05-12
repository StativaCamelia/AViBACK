module.exports = function (stateSchema) {
  stateSchema.statics.getAllStatesViews = async function () {
    try {
      const states = await this.find({});
      const statesViews = [];
      for (state of states) {
        const stateView = {};
        stateView.id = state.abbreviation;
        stateView.value = state.name;
        statesViews.push(stateView);
      }
      return statesViews;
    } catch (error) {
      throw error;
    }
  };

  stateSchema.statics.getAllTimezones = async function () {
    try {
      const timezones = await this.find({}).distinct("timezone");
      return timezones;
    } catch (error) {
      throw error;
    }
  };

  stateSchema.statics.getAllStatesNames = async function () {
    try {
      const states = await this.find({}).lean();
      const statesNames = [];
      for (state of states) {
        statesNames.push(state.name);
      }
      return statesNames;
    } catch (error) {
      throw error;
    }
  };

  stateSchema.statics.findByQuery = async function (payload) {
    try {
      const { query } = payload;
      const counties = await this.find(query).distinct("name");
      return counties;
    } catch (error) {
      throw error;
    }
  };

  stateSchema.statics.getAbbrByName = async function (name) {
    try{
      const state = await this.findOne({name: name});
      return state.abbreviation;
    }catch (error) {
      throw error;
    }
  }
};
