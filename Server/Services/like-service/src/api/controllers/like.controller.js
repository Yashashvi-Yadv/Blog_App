const like = async (req, res, next) => {
  try {
    console.log(req.body, console.log(req.params.blogId));
  } catch (error) {
    next(error);
  }
};
const unlike = async (req, res, next) => {};
const getCount = async (req, res, next) => {};
export default { like, unlike, getCount };
