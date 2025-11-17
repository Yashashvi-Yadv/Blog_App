import FollowModel from "../models/follow.model.js";

class FollowRepo {
  // Add a new follow entry
  async addFollower(followerId, followingId) {
    return FollowModel.create({
      followerId,
      followingId,
    });
  }

  // Check if already following
  async isFollowing(followerId, followingId) {
    return FollowModel.findOne({ followerId, followingId });
  }

  // Remove follow
  async removeFollower(followerId, followingId) {
    return FollowModel.deleteOne({ followerId, followingId });
  }

  // Get list of people I follow
  async getFollowing(followerId) {
    return FollowModel.find({ followerId });
  }

  // Get list of my followers
  async getFollowers(followingId) {
    return FollowModel.find({ followingId });
  }
}

export default new FollowRepo();
