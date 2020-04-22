module.exports = function (streetSchema) {
  streetSchema.statics.getAllStreetsViews = async function (query) {
    try {
      const streetViews = await this.find(query).lean().distinct("name");
      return streetViews;
    } catch (error) {
      throw error;
    }
  };
};
