import { Request, Response } from "express";
import { authentication, random } from "../../helpers/authHelpers";
import { createUser, getUserByEmail } from "../../models/UserSchema";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).send("User already exists");
      return;
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    res.status(200).json(user).end();
  } catch (error) {
    console.log("error", error);
    res.sendStatus(400);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!existingUser) {
      res.status(401).send("User does not exist");
      return;
    }

    const expectedHash = authentication(
      existingUser.authentication.salt,
      password
    );
    if (existingUser.authentication.password !== expectedHash) {
      res.status(403).send("Incorrect password");
      return;
    }

    const salt = random();
    existingUser.authentication.sessionToken = authentication(
      salt,
      existingUser._id.toString()
    );

    await existingUser.save();

    res.cookie("SESSION_AUTH", existingUser.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    res.status(200).json(existingUser).end();
  } catch (error) {
    console.log("error", error);
    res.sendStatus(400);
  }
};
