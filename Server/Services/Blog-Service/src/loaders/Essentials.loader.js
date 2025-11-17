import { runner } from "../worker/blog.worker.js";

export function loader() {
  try {
    runner();
  } catch (err) {
    console.log(err);
  }
}
