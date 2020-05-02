const { userController } = require("../../controllers/index");

exports.getAuth = async (req) => {
  const auth_token = req.headers["auth-token"];
  try {
    if (auth_token) {
      const isAdmin = await userController.verifyAdmin({ auth_token });
      if (isAdmin.success) {
        return { succes: true };
      } else
        return { succes: false, data: { error: { message: "unauthorized" } } };
    } else {
      return { succes: false, data: { error: { message: "unauthorized" } } };
    }
  } catch (error) {
    console.log(error);
    return { succes: false };
  }
};
