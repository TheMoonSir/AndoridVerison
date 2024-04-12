import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
      signIn: "/",
    },
});

export const config = { matcher: ["/live/Script", "/((?!api|v1/Andorid|:user|SendScript.ts).*)"] }