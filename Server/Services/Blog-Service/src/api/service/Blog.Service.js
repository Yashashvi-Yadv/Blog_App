import blogRepository from "../../repository/blog.repository.js";

class Blog_Service {
  async CreatePost(data) {
    let post;
    post = await blogRepository.createpost(data);
    return post;
  }
  async ShowPost(id) {
    return await blogRepository.findallpostbyuserid(id);
  }
  async DeletePost(data) {
    return await blogRepository.DeletePost(data);
  }
  async showpostwithid(data) {
    return await blogRepository.PostwithId(data);
  }
  async UpdatePost(data) {
    return await blogRepository.UpdatePost(data);
  }
}

export default new Blog_Service();
