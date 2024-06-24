import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// In "ClerkMiddelware" all routes are public while 'authMiddleware' is vice-versa
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
const isPublicRoutes = createRouteMatcher([
  "/",
  "/api/webhooks(.*)",
  "/question/:id",
  "/tags/:id",
  "/tags",
  "/profile/:id",
  "/community",
  "/jobs",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/chatgpt",
]);

// exclude public routes and Protect all other routes.
export default clerkMiddleware((auth, request) => {
  if (!isPublicRoutes(request)) {
    auth().protect();
  }
});

// NOTE: 'authMiddleware' is depriciated, So we're using clerkMiddleware

// export default authMiddleware({
//   publicRoutes: [
//     "/",
//     "/api/webhooks(.*)",
//     "/question/:id",
//     "/tags/:id",
//     "/tags",
//     "/profile/:id",
//     "/community",
//     "/jobs",
//   ],
//   ignoredRoutes: ["/api/webhooks(.*)", "/api/chatgpt"],
// });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
