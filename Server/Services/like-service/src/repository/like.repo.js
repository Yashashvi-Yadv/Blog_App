import Likes from "../models/like.model.js";

class LikeRepo {
  static async findLike(blogId, userId) {
    return Likes.findOne({ blogId, userId });
  }

  static async addLike(blogId, userId) {
    return Likes.create({ blogId, userId });
  }

  static async removeLike(blogId, userId) {
    return Likes.deleteOne({ blogId, userId });
  }
}

export default new LikeRepo();
