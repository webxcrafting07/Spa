import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/booking/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/therapist/:path*",
  ]
}
