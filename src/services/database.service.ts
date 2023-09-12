import { TPost, TUser } from "@/types/types"
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"
import { NextResponse } from "next/server"

export const prisma = new PrismaClient()

export type TErrorObject = { message: string }
export const ErrorObject: TErrorObject = { message: "Произошла ошибка" }
export const ErrorResponse = NextResponse.json(ErrorObject, { status: 500 })
 

// *************************************************************

export async function query<T>(action: any): Promise<T[]| []>{
    try{
        await prisma.$connect()
        return await action()
    } catch (e: any) {
        return []
    } finally {
        await prisma.$disconnect()
    }
}

type TFM = Prisma.PrismaPromise<TUser[] | TPost[] | []> 
type TPOR<T extends TUser | TPost> = T

type TCUD<T extends TUser | TPost, P extends Prisma.Prisma__PostsClient<T, never, DefaultArgs> | Prisma.Prisma__UsersClient<T, never, DefaultArgs>> = P
type TRF = TCUD<TPost, Prisma.Prisma__PostsClient<TPost, never, DefaultArgs>> | TCUD<TUser, Prisma.Prisma__UsersClient<TUser, never, DefaultArgs>> | TFM

type g1 = Extract<keyof typeof prisma, "posts" | "users">
type g2 = keyof typeof prisma[g1]

type g3<T extends g1> = keyof typeof prisma[T]

export async function f<T extends g1>(m: g3<T>, t: T){
    try {
        prisma.$connect()
        const p = 'd'
        return await prisma[t][m]
    } catch (e: any) {
        return []
    } finally {
        prisma.$disconnect()
    }
}

f<"posts">("findMany", "posts")

export const getValues = Prisma.defineExtension((client) => {
    return client.$extends({
      model: {
        $allModels: {
          async getValuesByField<T, K extends Prisma.Result<T, null, "findMany">>(
            this: T,
            field: keyof K[0],
            where: Prisma.Args<T, "findMany">["where"]
          ): Promise<K[0][]> {
            const context = Prisma.getExtensionContext(this);
            const result = await (context as any).findMany({
              where,
              select: { [field]: true },
            });
  
            return result.map((item: any) => item[field]);
          },
          async getValues<T>(
            this: T,
          ): Promise<T[]> {
            const context = Prisma.getExtensionContext(this)
            const result = await (context as any).findMany()
  
            return result
          },
        },
      },
    });
})
export async function main(){
    const prisma1 = new PrismaClient().$extends(getValues)
    const r = await prisma1.posts.getValuesByField("description", {})
    const r1 = await prisma1.users.getValues() as unknown as TUser[]
    console.log("r", r)
    console.log("r1", r1)
}




