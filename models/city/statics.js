module.exports = function (citySchema) {
  citySchema.statics.getAllCitiesViews = async function (query) {
    try {
      const citiesViews = await this.find(query).lean().distinct("name");
      return citiesViews;
    } catch (error) {
      throw error;
    }
  };
};
