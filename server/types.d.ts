import NextAuth from "next-auth";
import { Mentor, User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = User;
}
export interface registerMentorTypes extends Mentor {
  course?: string;
  course_day?: string;
  course_time?: string;
  mentoring_location?: string;
  experience_position?: string;
  experience_company?: string;
  certification_course?: string;
  certification_institution?: string;
}
