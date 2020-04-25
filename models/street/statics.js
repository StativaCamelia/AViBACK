module.exports = function (streetSchema) {
  streetSchema.statics.getAllStreetsViews = async function (query) {
    try {
      const streetViews = await this.find(query).lean().distinct("name");
      return streetViews;
    } catch (error) {
      throw error;
    }
  };

  streetSchema.statics.findByQuery = async function (payload) {
    try {
      const { query } = payload;
      const counties = await this.find(query).distinct("name");
      return counties;
    } catch (error) {
      throw error;
    }
  };
};
