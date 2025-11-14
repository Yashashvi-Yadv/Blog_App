import User from "../models/user.model.js";

class UserRepository {
  async findbyGoogleId(googleId) {
    return await User.findOne({ googleId });
  }
  async findbyemail(email) {
    return await User.findOne({ email });
  }
  async findbyid(id) {
    return await User.findById(id);
  }
  async createuser(data) {
    return await User.create(data);
  }
}
export default new UserRepository();
