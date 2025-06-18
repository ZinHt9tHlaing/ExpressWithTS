import express from "express";
import authRoute from "./authentication/authRoute";
import userRoute from "./users/userRoutes";

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  userRoute(router);

  return router;
};
