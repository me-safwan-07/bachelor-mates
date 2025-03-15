import "server-only";
import { TUser, TUserCreateInput, TUserUpdateInput, ZId, ZUserUpdateInput } from "@/types/user"
import { validateInputs } from "../validate"
import { DatabaseError, ResourceNotFoundError } from "@/types/errors";
import { Prisma } from "@prisma/client";
import { prisma } from "@/prisma";
import { userCache } from "./cache";
import { z } from "zod";
import { cache } from "../cache";


const responseSelection = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
//   role: true,
  identityProvider: true,
};


export const getUserByEmail = (email: string): Promise<TUser | null> =>
    cache(
      async () => {
        validateInputs([email, z.string().email()]);
  
        try {
          const user = await prisma.user.findFirst({
            where: {
              email,
            },
            select: responseSelection,
          });
  
          return user;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(error.message);
          }
  
          throw error;
        }
      },
      [`getUserByEmail-${email}`],
      {
        tags: [userCache.tag.byEmail(email)],
      }
    )();


export const updateUser = async (personId: string, data: TUserUpdateInput): Promise<TUser> => {
    validateInputs([personId, ZId], [data, ZUserUpdateInput.partial()]);

    try {
        const updateUser = await prisma.user.update({
            where: {
                id: personId,
            },
            data: data,
            select: responseSelection
        });

        userCache.revalidate({
            email: updateUser.email ?? undefined,
            id: updateUser.id
        })

        return updateUser as TUser;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2016") {
            throw new ResourceNotFoundError("User", personId);
          }
        throw error; // Re-throw any other errors
    }
};

export const createUser = async (data: TUserCreateInput): Promise<TUser> => {
    validateInputs([data, ZUserUpdateInput]);

    try {
        const user = await prisma.user.create({
            data: data,
            select: responseSelection,
        });

        userCache.revalidate({
            email: user.email,
            id: user.id,
            count: true,
        });

        // TODO send the new user email of registration
        
        return user;
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            throw new DatabaseError("User with this email already exists");
        }
    
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new DatabaseError(error.message);
        }
    
        throw error;
    }
};