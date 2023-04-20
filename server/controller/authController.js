import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) return res.send({ message: "Name is Required" });
    if (!email) return res.send({ message: "Email is Required" });
    if (!password) return res.send({ message: "Password is Required" });
    if (!phone) return res.send({ message: "Phone is Required" });
    if (!answer) return res.send({ message: "Answer is Required" });

    // check user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(200).send({
      success: true,
      message: "user Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// login controller
export const loginCotroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });

    // token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    // check
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong Email or Answer" });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};
