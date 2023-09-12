import { NextRequest, NextResponse } from "next/server";
import { middlewareUser } from "./services/users.service";

const redirect = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}`, 301)

export async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname === '/posts') {
        const eid = req.headers.get('eid') || null
        if(!eid) return redirect
        if(!await middlewareUser()) return redirect
    }   

}