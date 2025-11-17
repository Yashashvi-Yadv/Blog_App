import BlogService from "../service/Blog.Service.js";
import KafkaServiceBlog from "../service/Kafka.service.js";
import redis from "../../config/redis.js";

// ------------------------------------------------------
// CREATE POST
// ------------------------------------------------------
export const creatPost = async (req, res) => {
  try {
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
      let count = await BlogService.showpostcount(req.user.id);
      await KafkaServiceBlog.sendcreateblog(count, req.user.id);

      // ❌ Clear cached list for this user
      await redis.del(`blog:${req.user.id}`);

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
    console.log(err);
    res.json({
      success: false,
      message: "internal server Error",
    });
  }
};

// ------------------------------------------------------
// SHOW POSTS (with Redis caching)
// ------------------------------------------------------
export const ShowPost = async (req, res, next) => {
  try {
    const id = req.user.id;

    // 🔍 1) Try Redis cache
    const cache = await redis.get(`blog:${id}`);
    if (cache) {
      return res.json({
        success: true,
        blogs: JSON.parse(cache),
        message: "blog found (cache)",
      });
    }

    // 📦 2) Fetch from MongoDB
    const blogs = await BlogService.ShowPost(id);
    if (blogs) {
      // Save in Redis
      await redis.setex(`blog:${id}`, 600, JSON.stringify(blogs));

      return res.json({
        success: true,
        blogs,
        message: "blog found",
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

// ------------------------------------------------------
// DELETE POST
// ------------------------------------------------------
export const DeletePost = async (req, res, next) => {
  try {
    const id = req.user.id;
    const _id = req.params.id;

    const data = { id, _id };
    const user = await BlogService.DeletePost(data);

    if (user) {
      let count = await BlogService.showpostcount(req.user.id);
      await KafkaServiceBlog.senddeleteblog(count, req.user.id);

      // ❌ Remove cache after delete
      await redis.del(`blog:${req.user.id}`);

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

// ------------------------------------------------------
// SHOW POST WITH ID
// ------------------------------------------------------
export const postwithid = async (req, res, next) => {
  try {
    const blog = await BlogService.showpostwithid(req.params.id);

    if (blog) {
      return res.json({ success: true, blog });
    }

    return res.json({ success: false });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------
// UPDATE POST
// ------------------------------------------------------
export const UpdatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const id = req.user.id;
    const _id = req.params.id;

    const data = { _id, title, content, id };

    const blog = await BlogService.UpdatePost(data);

    if (blog) {
      // ❌ Clear user's post list cache
      await redis.del(`blog:${req.user.id}`);

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
