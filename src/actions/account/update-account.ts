"use server";
import { prisma } from "@/lib/db/prisma";
import { TUser, UserSchema } from "@/lib/types";

export const UpdateAccount = async ({
  accountId,
  data,
}: {
  accountId: string;
  data: TUser;
}) => {
  const validatedData = UserSchema.safeParse(data);
  if (!validatedData) return { status: 400, json: { error: "Invalid data" } };

  const account = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      DOB: data.DOB,
      gender: data.gender,
    },
  });

  if (!account) return { status: 404, json: { error: "Account not found" } };

  const user = await prisma.user.update({
    where: {
      id: account.userId,
    },
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    },
  });
  return { status: 200, json: user };
};
