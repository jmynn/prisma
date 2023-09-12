import { ErrorResponse, prisma } from "@/services/database.service"
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function GET(req: Request): Promise<NextResponse> {
    try {
        await prisma.$connect()
        const eid = req.headers.get('eid')
        if(eid) {
            const user = await prisma.users.findUnique({
                where: {
                    externalId: `${eid}`
                }
            })
            if(!user) throw new Error()
            return NextResponse.json({state: true})
        }
        const users = await prisma.users.findMany()
        return NextResponse.json({ users })
    } catch (e: any) {
        return ErrorResponse
    } finally {
        await prisma.$disconnect()
    }
}
export async function POST(req: Request) {
    try {
        await prisma.$connect()
        let state: boolean = false

        const formData = await req.formData()
        const requestParamUser = formData.get('user') //? eid, name
        const requestParamLogin = formData.get('login')
        const requestParamPassword = formData.get('password')
        const key = formData.get('key')?.toString()

        if (key === 'log') {
            const data = await prisma.users.findMany({
                where: {
                    AND: [
                        { externalId: `${requestParamUser}` },
                        { login: `${requestParamLogin}` },
                        { password: `${requestParamPassword}` }
                    ]
                }
            })
            state = data.length ? true : false
            cookies().set('eid', `${requestParamUser}`)
        }
        if(key === 'reg') {
            await prisma.users.create({
                data: {
                    name: `${requestParamUser}`,
                    login: `${requestParamLogin}`,
                    password: `${requestParamPassword}`
                }
            })
            state = true
        }
        return NextResponse.json({ state })
    } catch (e: any) {
        return ErrorResponse
    } finally {
        await prisma.$disconnect()
    }
}