// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import pool from "../../../../../lib/db";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { type: "email" },
//         password: { type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const result = await pool.query(
//           "SELECT id, name, email, password FROM users WHERE email = $1",
//           [credentials.email]
//         );

//         if (result.rows.length === 0) return null;

//         const user = result.rows[0];

//         if (user.password !== credentials.password) return null;

//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id;
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// Above is for normal signup with email and password  











// Below is for the google signup provider too 

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import pool from "../../../../../lib/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await pool.query(
          "SELECT id, name, email, password FROM users WHERE email = $1",
          [credentials.email]
        );

        if (result.rows.length === 0) return null;

        const user = result.rows[0];

        if (user.password !== credentials.password) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { email, name } = user;

        const existingUser = await pool.query(
          "SELECT id FROM users WHERE email = $1",
          [email]
        );

        if (existingUser.rows.length === 0) {
          await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2)",
            [name, email]
          );
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const result = await pool.query(
          "SELECT id FROM users WHERE email = $1",
          [user.email]
        );

        token.id = result.rows[0]?.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
