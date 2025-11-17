import Blog from "../models/blog.model.js";

class BlogRepository {
  async findallpostbyuserid(id) {
    return await Blog.find({ userid: id });
  }
  async createpost(data) {
    return await Blog.create(data);
  }
  async DeletePost(data) {
    return await Blog.findOneAndDelete({ userid: data.id, _id: data._id });
  }
  async PostwithId(data) {
    return await Blog.findById(data);
  }
  async UpdatePost(data) {
    return await Blog.updateOne(
      { _id: data._id, userid: data.id },
      {
        title: data.title,
        content: data.content,
      }
    );
  }
  async ShowAllPost(data) {
    return await Blog.countDocuments({ userid: data });
  }
}
export default new BlogRepository();
