import express from "express";
import {
  login,
  register,
} from "../../controllers/authentication/authController";

export default (router: express.Router) => {
  router.route("/auth/register").post(register);
  router.route("/auth/login").post(login);
};
