import { prisma } from "@/prisma";
import { validateInputs } from "../validate";
// import { Prisma } from "@prisma/client";
import { TAccount, TAccountInput, ZAccountInput } from "@/types/account";
// import { DatabaseError } from "@/types/errors";


export const createAccount = async (accountData: TAccountInput): Promise<TAccount> => {
  validateInputs([accountData, ZAccountInput]);

  try {
    // const supportedAccountData = filterAccountInputData(accountData);
    const account = await prisma.account.create({
      data: accountData,
    });
    return account;
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   throw new DatabaseError(error.message);
    // }

    throw error;
  }
};
