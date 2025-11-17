import FollowRepo from "../../repository/follow.repo.js";

class FollowService {
  // FOLLOW A USER
  async followUser(followerId, followingId) {
    // Cannot follow yourself
    if (followerId === followingId) {
      return { message: "You cannot follow yourself.", success: false };
    }

    // Check if already following
    const exists = await FollowRepo.isFollowing(followerId, followingId);
    if (exists) {
      return { message: "Already following this user.", success: false };
    }

    // Create follow entry
    await FollowRepo.addFollower(followerId, followingId);

    // (Optional) Add Kafka event here: FOLLOW_CREATED

    return { message: "Followed successfully.", success: true };
  }

  // UNFOLLOW A USER
  async unfollowUser(followerId, followingId) {
    // Check if follow exists
    const exists = await FollowRepo.isFollowing(followerId, followingId);
    if (!exists) {
      return { message: "You are not following this user.", success: false };
    }

    await FollowRepo.removeFollower(followerId, followingId);

    return { message: "Unfollowed successfully.", success: true };
  }

  async getFollowingList(followerId) {
    const following = await FollowRepo.getFollowing(followerId);
    return { following };
  }

  // GET ALL MY FOLLOWERS
  async getFollowersList(followingId) {
    const followers = await FollowRepo.getFollowers(followingId);
    return { followers };
  }
}

export default new FollowService();
