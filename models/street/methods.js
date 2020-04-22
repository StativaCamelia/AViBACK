module.exports = function (streetSchema) {
  streetSchema.statics.findNumbersByStreet = async function (query) {
    try {
      const street = await this.findOne({ query });
      const numbers = street.numbers;
      return numbers;
    } catch (error) {
      throw error;
    }
  };
};
