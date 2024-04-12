import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || "RobloxAndoridScript",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "username", placeholder: "username" },
      },
      async authorize(credentials, req) {
        const { username } = credentials as {
          username: string;
        };

        if (username == "") {
          return null;
        }

        return {
          id: Math.floor(Math.random() * 10).toString(),
          name: username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/pages/index.tsx",
  },
};

export default NextAuth(authOptions);
