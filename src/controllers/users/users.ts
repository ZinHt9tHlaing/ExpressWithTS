import { Request, Response } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
} from "../../models/UserSchema";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);

    res.status(200).json(deleteUser);
  } catch (error) {
    console.log("error", error);
    res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const updatedUser = await getUserById(id);
    updatedUser.username = username;
    await updatedUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error", error);
    res.sendStatus(400);
  }
};
