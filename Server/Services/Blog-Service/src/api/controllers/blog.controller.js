import BlogService from "../service/Blog.Service.js";
export const creatPost = async (req, res) => {
  try {
    console.log(req.user.id, req.body);
    const data = {
      userid: req.user.id,
      title: req.body.title,
      content: req.body.content,
    };
    if (!req.user.id) {
      return res.json({
        success: false,
        message: "invalid credentials",
      });
    }
    const post = await BlogService.CreatePost(data);
    if (post) {
      return res.json({
        success: true,
        message: "post created",
        post,
      });
    }
    return res.json({
      success: false,
      message: "something went wrong",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "internal server Error",
    });
  }
};

export const ShowPost = async (req, res, next) => {
  try {
    const id = req.user.id;
    const blogs = await BlogService.ShowPost(id);
    if (blogs) {
      return res.json({
        success: true,
        blogs,
        message: "blog found",
      });
    }
    return res.json({
      success: false,
      message: "blog not found,",
    });
  } catch (error) {
    next(error);
  }
};

export const DeletePost = async (req, res, next) => {
  try {
    const id = req.user.id;
    const _id = req.params.id;

    const data = { id, _id };
    const user = await BlogService.DeletePost(data);
    if (user) {
      return res.json({
        success: true,
        message: "post deleted",
      });
    }
    return res.json({
      success: false,
      message: "something went wrong",
    });
  } catch (error) {
    next(error);
  }
};
export const postwithid = async (req, res, next) => {
  try {
    const id = req.user.id;
    const _id = req.params.id;
    const data = { id, _id };

    const blog = await BlogService.showpostwithid(data);
    if (blog) {
      return res.json({ success: true, blog });
    }
    return res.json({ success: false });
  } catch (error) {
    next(error);
  }
};
export const UpdatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const id = req.user.id;
    const _id = req.params.id;
    const data = { _id, title, content, id };
    const blog = await BlogService.UpdatePost(data);
    if (blog) {
      return res.json({
        message: "blog updated",
        success: true,
        blog,
      });
    }
    return res.json({
      success: false,
      message: "blog not found",
    });
  } catch (error) {
    next(error);
  }
};
