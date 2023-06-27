import NextAuth from "next-auth";
import { authOptions } from "components/server/auth";

export default NextAuth(authOptions);
