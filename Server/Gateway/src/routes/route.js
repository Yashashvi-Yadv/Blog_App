export const ApiServiceRoute = [
  {
    prefix: "/api/auth/",
    target: process.env.USER_AUTH_URL,
  },
  {
    prefix: "/blogs",
    target: "http://localhost:5002",
  },
];
