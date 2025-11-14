import AuthService from "../services/auth.service.js";
import { RESPONSE_MESSAGES } from "../../core/constant/Message.js";
import { STATUS_CODES } from "../../core/constant/StatusCode.js";

export const register = async (req, res) => {
  try {
    const { user, token } = await AuthService.handleregister(req.body);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
      users: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Internal Server Erro",
    });
  }
};

export const User = async (req, res, next) => {
  try {
    const user = await AuthService.handleuser(req.user);

    if (user) {
      return res.json({
        success: true,
        message: "user found",
        user,
      });
    }
    return res.json({
      success: false,
      message: "not a vailid user",
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    await AuthService.handlelogout();
    return res.clearCookie("access_token");
  } catch (error) {
    res.json({
      success: false,
      message: "internal server Error",
    });
  }
};
