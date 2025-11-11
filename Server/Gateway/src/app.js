/* 
 Importing Modules and using Fast-Gateway for redirecting 
 incoming API requests to their corresponding microservices.
*/

import express from "express";
import gateway from "fast-gateway";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { ApiServiceRoute } from "./routes/route.js";
import { morganconsole } from "./logger/Mlogger.js";

// Fast-Gateway itself creates an internal Express instance
const mid = [
  express.json(),
  express.urlencoded({ extended: true }),
  morganconsole,
];
export const createGateway = () => {
  const app = gateway({
    middlewares: mid,
    routes: ApiServiceRoute,
  });

  // ✅ Global Error Middleware (Express-style)

  return app;
};
