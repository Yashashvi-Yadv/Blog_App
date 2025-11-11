// this is a morgan logger file that can read the upcoming request and response

// and also it can show the status code as well
// best for analyzing the req of api's whether they are hitting the end point or not.

import morgan from "morgan";

export const morganconsole = morgan("dev");
