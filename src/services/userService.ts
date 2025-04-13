/** @format */
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";
import { findUserByEmailRepo } from "../repos/userRepo";
import User from "../models/userModels";
import * as userRepo from "../repos/userRepo";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as string;
const soltRounds = 10;

const loginService = async (email: string, password: string) => {
  try {
    const user = await findUserByEmailRepo(email);

    if (!user) {
      console.warn(`User not found with email: ${email}`);
      return {
        message: "User not found",
        success: false,
      };
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = Jwt.sign(
        { email: user.email, role: user.role },
        jwtSecret.toString(),
        { expiresIn: "24h" },
      );
      return {
        message: "Login successful",
        success: true,
        data: {
          userID: user.studentId,
          email: user.email,
          role: user.role,
          name: user.name,
          token,
        },
      };
    } else {
      console.warn(`Invalid password for user: ${email}`);
      return {
        message: "Invalid password",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error in loginService", error);
    return {
      message: "Failed to login",
      success: false,
    };
  }
};

const createUserService = async (userDetail: IUser) => {
  const hashPassword = await bcrypt.hash(userDetail.password, soltRounds);
  try {
    let existingUser;
    existingUser = await findUserByEmailRepo(userDetail.email);
    existingUser = await userRepo.findUserByStudentIdRepo(userDetail.studentId);
    if (existingUser) {
      console.warn(`User Already Exists ${userDetail.email} `);
      return {
        message: "User Already Exists",
        success: false,
        data: {
          email: userDetail.email,
          role: userDetail.role,
          name: userDetail.name,
        },
      };
    }
    const token = Jwt.sign(
      { email: userDetail.email, role: userDetail.role },
      jwtSecret.toString(),
      { expiresIn: "24h" },
    );
    const user = new User({
      ...userDetail,
      password: hashPassword,
    });
    await userRepo.createUserRepo(user);
    return {
      message: "User Created Successfully",
      success: true,
      data: {
        userID: userDetail.studentId,
        email: userDetail.email,
        role: userDetail.role,
        name: userDetail.name,
        token,
      },
    };
  } catch (error) {
    return { success: "false", message: "Failed to add user" };
  }
};

export { loginService, createUserService };
