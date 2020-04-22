module.exports = function (countySchema) {
  countySchema.statics.getAllCountiesViews = async function (query) {
    try {
      const countiesViews = await this.find(query).lean().distinct("name");
      return countiesViews;
    } catch (error) {
      throw error;
    }
  };

  countySchema.statics.findByState = async function (query) {
    try {
      const counties = await this.find(query).distinct("name");
      return counties;
    } catch (error) {
      throw error;
    }
  };
};
