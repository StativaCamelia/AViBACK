module.exports = (schema) => {
  // Add virtual fields to schema
  schema.virtual("details", {
    localField: "_id",
    justOne: true,
    autopopulate: true,
  });
};
