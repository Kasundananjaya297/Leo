/** @format */

import { Request, Response, NextFunction } from "express";
import { createUserService, loginService } from "../services/userService";
import { responseDTO } from "../DTO/response";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const credentials = req.body;
  let user;
  try {
    if (!credentials) {
      res.status(400).json({ message: "User details are required" });
      return;
    }
    if (!credentials.email || !credentials.password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    user = await loginService(credentials.email, credentials.password);
    if (user && user.success === false) {
      res.status(500).json(responseDTO("false", [], user.message));
    } else {
      res
        .status(200)
        .json(responseDTO(user.success.toString(), user, user.message));
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
    console.error("Error logging in user", error);
    return;
  }
};
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const credentials = req.body;
  let user;
  console.log("Creating user", credentials);
  try {
    if (!credentials) {
      res.status(400).json({ message: "User details are required" });
      return;
    }
    if (!credentials.email || !credentials.password || !credentials.role) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    user = await createUserService(credentials);
    if (user && user.success === "false") {
      res.status(500).json(responseDTO("false", [], user.message));
    }
    res
      .status(200)
      .json(responseDTO(user.success.toString(), user, user.message));
  } catch (error) {
    res.status(500).json({ message: "Failed to add user" });
    console.error("Error creating user", error);
    return;
  }
};

export { userLogin, createUser };
