"use server";

import db from "@/server/db";

export const getUserByUserName = async (userName: string) => {
  const user = await db.user.findUnique({
    where: {
      userName,
    },
  });
  return user;
};
