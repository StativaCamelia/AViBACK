module.exports = function (citySchema) {
  citySchema.statics.getAllCitiesViews = async function (query) {
    try {
      const citiesViews = await this.find(query).lean().distinct("name");
      return citiesViews;
    } catch (error) {
      throw error;
    }
  };

  citySchema.statics.findByQuery = async function (payload) {
    try {
      const { query } = payload;
      const counties = await this.find(query).distinct("name");
      return counties;
    } catch (error) {
      throw error;
    }
  };
};
