/** @format */

import User from "../models/userModels";
import { IUser } from "../interfaces/index";

const createUserRepo = async (user: IUser) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    throw new Error("Error creating user");
  }
};
const findUserByEmailRepo = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};
const findUserByStudentIdRepo = async (studentId: string) => {
  try {
    const user = await User.find({ studentId });
    return user;
  } catch (error) {
    throw new Error("Error finding user by studentId");
  }
};

export { createUserRepo, findUserByEmailRepo, findUserByStudentIdRepo };
