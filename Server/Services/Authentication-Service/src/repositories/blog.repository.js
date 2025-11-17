import userModel from "../models/user.model.js";

class BlogRepo {
  // 📌 Called when a blog is created
  async handlecreated(count, id) {
    try {
      if (!count && count !== 0) throw new Error("Count missing");
      if (!id) throw new Error("User id missing");

      const user = await userModel.findByIdAndUpdate(
        id,
        { $set: { totalPosts: count } },
        { new: true }
      );

      return user;
    } catch (err) {
      console.error("❌ handlecreated error:", err.message);
      throw err;
    }
  }

  // 📌 Called when a blog is deleted
  async handledeleted(data) {
    try {
      const { id, count } = data;

      if (!id || !count) {
        console.log(" Missing fields in delete event", data);
        return;
      }

      const updatedata = { totalPosts: count };

      const user = await userModel.findByIdAndUpdate(
        id,
        { $set: updatedata },
        { new: true }
      );

      if (user) {
        console.log(`Blog deleted & count updated: ${user.totalPosts}`);
      } else {
        console.log("User not found for deletion update:", id);
      }
    } catch (error) {
      console.error(" Error handling blog deletion:", error);
    }
  }
}

export default new BlogRepo();
