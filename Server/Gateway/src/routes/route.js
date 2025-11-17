import { createProxyMiddleware } from "http-proxy-middleware";

export default function proxyRoutes(app) {
  // ✅ AUTH SERVICE
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: "http://localhost:8001",
      changeOrigin: true,
      pathRewrite: { "^/api/auth": "" },
      onProxyReq: (proxyReq, req) => {
        console.log(
          "🔁 [Gateway] → Auth Service:",
          req.method,
          req.originalUrl
        );
      },
    })
  );
  app.use(
    "/api/blog",
    createProxyMiddleware({
      target: "http://localhost:8002",
      changeOrigin: true,
      pathRewrite: { "^/api/blog": "" },
      onProxyReq: (proxyReq, req) => {
        console.log("gateway __>>> Blog Service", req.method, req.originalUrl);
      },
    })
  );
  app.use(
    "/api/request",
    createProxyMiddleware({
      target: "http://localhost:8004",
      changeOrigin: true,
      pathRewrite: { "^/api/request": "" },
      onProxyReq: (proxyReq, req) => {
        console.log(
          "gateway __>>> Request || Follow  Service",
          req.method,
          req.originalUrl
        );
      },
    })
  );
}
