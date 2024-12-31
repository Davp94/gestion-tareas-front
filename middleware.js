import { NextResponse } from "next/server";

export async function middleware(request){
    const token = request.cookies.get('token')?.value;
    const path = request.nextUrl.pathname;
    const url = request.nextUrl.clone();

    // if(!token && path !== '/auth/login'){
    //     url.pathname = '/auth/login';
    //     return NextResponse.redirect(url);
    // }

    // if(token && path === '/auth/login'){
    //     url.pathname = '/'
    //     return NextResponse.redirect(url);
    // }

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public/|layout/|styles/|app/|types/|config/|feature/|app/|demo/).*)',]
}