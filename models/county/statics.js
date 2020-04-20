module.exports = function (contySchema) {
  contySchema.statics.getAllCountiesViews = async function (query) {
    try {
      const countiesViews = await this.find(query).distinct("name");
      return countiesViews;
    } catch (error) {
      throw error;
    }
  };
};
