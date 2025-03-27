import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Eğer token yoksa ve kullanıcı login sayfasında değilse, login sayfasına yönlendir
  if (!token && req.nextUrl.pathname !== "/giris-yap") {
    return NextResponse.redirect(new URL("/giris-yap", req.url));
  }

  return NextResponse.next();
}

// Middleware'in hangi sayfalarda çalışacağını belirle
export const config = {
  matcher: ["/patient/:path*"],  // /dashboard dizinindeki tüm sayfalarda çalışacak
};
