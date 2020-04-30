exports.getRes = async (req, res) => {
  const { path, fullPath, method, body } = req;
  if (path.endsWith("/accidents/delete") && method === "delete") {
    try {
      const { success, data } = await adminController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("/accidents/add") && method === "post") {
    try {
      const { success, data } = await adminController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("/filtres/create") && method === "get") {
    try {
      const { success, data } = await adminController.createFilterDatabase(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
