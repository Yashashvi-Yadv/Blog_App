import LikeCount from "../models/count.like.js";

class LikeCountRepo {
  static async increment(blogId) {
    return LikeCount.updateOne(
      { blogId },
      { $inc: { count: 1 } },
      { upsert: true }
    );
  }

  static async decrement(blogId) {
    return LikeCount.updateOne({ blogId }, { $inc: { count: -1 } });
  }

  static async getCount(blogId) {
    return LikeCount.findOne({ blogId });
  }
}

export default new LikeCountRepo();
