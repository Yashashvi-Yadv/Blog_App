import userModel from "../models/user.model.js";

class BlogRepo {
  async handlecreated(data) {
    const updatedata = { totalPosts: data.count };

    await userModel.findByIdAndUpdate(
      data._id,
      { $set: updatedata },
      { new: true }
    );
  }

  async handledeleted(data) {
    const updatedata = { totalPosts: data.count };

    await userModel.findByIdAndUpdate(
      data._id,
      { $set: updatedata },
      { new: true }
    );
  }
}

export default new BlogRepo();
