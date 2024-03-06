import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
<<<<<<< HEAD
    "/api/webhook(.*)",
=======
    "/api/webhooks(.*)",
>>>>>>> cba886f6334fde40738db09c37130d03217be8e3
    "question/:id",
    "tags/:id",
    "tags",
    "/profile/:id",
    "/community",
    "/jobs",
  ],
<<<<<<< HEAD
  ignoredRoutes: ["/api/webhook(.*)", "/api/chatgpt"],
=======
  ignoredRoutes: ["/api/webhooks(.*)", "/api/chatgpt"],
>>>>>>> cba886f6334fde40738db09c37130d03217be8e3
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
