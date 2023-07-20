const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { login } = require("./auth.gateway");

const signin = async (req, res = Response) => {
  try {
    const { email, password } = req.body;
    
    const { token, rol_id } = await login(email, password);

    res.json({ token, rol_id });
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json(message);
  }
};

//
const authRouter = Router();
authRouter.post("/", signin);

module.exports = {
  authRouter,
};
