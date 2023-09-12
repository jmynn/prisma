import { ErrorResponse, prisma } from "@/services/database.service"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await prisma.$connect()
        const eid = cookies().get('eid')?.value
        if (!eid) throw new Error()
        const posts = await prisma.posts.findMany({ where: { userId: eid } })
        return NextResponse.json({ posts })
    } catch (e: any) {
        return ErrorResponse
    } finally {
        await prisma.$disconnect()
    }
}
export async function DELETE(req: Request) {
    try {
        await prisma.$connect()
        const eid = cookies().get('eid')?.value
        if (!eid) throw new Error()
        const { id } = await req.json()
        await prisma.posts.delete({ where: { id } })
        return NextResponse.json({ state: true })
    } catch (e: any) {
        return ErrorResponse
    } finally {
        await prisma.$disconnect()
    }
}
export async function POST(req: Request) {
    try {
        await prisma.$connect()
        const eid = cookies().get('eid')?.value
        if (!eid) throw new Error()
        const data = await req.formData()
        const title = data.get('title')?.toString()
        const description = data.get('description')?.toString()

        await prisma.posts.create({
            data: {
                title: title!,
                description: description,
                userId: eid
            }
        })
        return NextResponse.json({ state: true })
    } catch (e: any) {
        return ErrorResponse
    } finally {
        await prisma.$disconnect()
    }
}