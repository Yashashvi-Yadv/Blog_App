import FollowService from "../service/follow.service.js";

export const follow = async (req, res) => {
  console.log(req.body);
  try {
    const { fromUser, toUser } = req.body;
    const result = await FollowService.followUser(fromUser, toUser);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

export const unfollow = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    const result = await FollowService.unfollowUser(followerId, followingId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { followerId } = req.params;
    const result = await FollowService.getFollowingList(followerId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { followingId } = req.params;
    const result = await FollowService.getFollowersList(followingId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
