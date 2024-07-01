import { constructResponse } from "../client/response.js";

const helloWordController = async (req, res) => {
  return await res
    .status(200)
    .send(constructResponse(200, false, ["user-1", "user-2", "Welcome Home "]));
};

export { helloWordController };
