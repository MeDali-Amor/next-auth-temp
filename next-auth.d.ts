import { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

export type ExtendedUser = {
    role: Role;
} & DefaultSession["user"];

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}
