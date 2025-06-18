import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../../controllers/users/users";
import express from "express";
import { isAuthenticated, isOwner } from "../../middlewares/authMiddleware";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router
    .route("/user/:id")
    .delete(isAuthenticated, isOwner, deleteUser)
    .put(isAuthenticated, isOwner, updateUser);
};
