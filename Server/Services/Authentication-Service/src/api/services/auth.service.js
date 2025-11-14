import UserRepository from "../../repositories/auth.repository.js";
import Token from "../../core/utils/user.token.js";
import { RESPONSE_MESSAGES } from "../../core/constant/Message.js";

class AuthService {
  async handleregister(data) {
    const { googleId, email, name, picture } = data;

    // Find user by Google ID
    let user = await UserRepository.findbyGoogleId(googleId);
    if (!user) {
      user = await UserRepository.createuser({
        googleId,
        email,
        name,
        picture,
      });
    }

    // Generate JWT token
    const token = Token.createtoken(user);

    return { user, token };
  }

  async handlelogout() {
    try {
      return { success: true, message: RESPONSE_MESSAGES.LOGOUT_SUCCESS };
    } catch (err) {
      throw new Error("Logout failed");
    }
  }

  async handleuser(data) {
    const { id } = data;
    console.log(id);
    try {
      let user = null;
      user = await UserRepository.findbyid(id);
      return user;
    } catch (error) {
      throw new Error("Internal server Error or Database Error");
    }
  }
}

export default new AuthService();
