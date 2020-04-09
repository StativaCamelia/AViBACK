module.exports = (schema) => {
  schema.virtual("details", {
    localField: "_id",
    justOne: true,
    autopopulate: true,
  });
};
