import LikeRepo from "../../repository/like.repo.js";

import LikeCountRepo from "../../repository/likecount.repo.js";

class LikeService {
  static async likeBlog(blogId, userId) {
    const exists = await LikeRepo.findLike(blogId, userId);

    if (exists) return { message: "Already liked", success: false };

    await LikeRepo.addLike(blogId, userId);
    await LikeCountRepo.increment(blogId);

    return { message: "Like added", success: true };
  }

  static async unlikeBlog(blogId, userId) {
    const exists = await LikeRepo.findLike(blogId, userId);

    if (!exists) return { message: "Not liked yet", success: false };

    await LikeRepo.removeLike(blogId, userId);
    await LikeCountRepo.decrement(blogId);

    return { message: "Like removed", success: true };
  }

  static async getLikeCount(blogId) {
    const data = await LikeCountRepo.getCount(blogId);
    return { count: data?.count || 0 };
  }
}

export default new LikeService();
