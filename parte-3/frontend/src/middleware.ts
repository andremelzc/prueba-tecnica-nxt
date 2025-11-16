import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Obtener el token de las cookies
  const token = request.cookies.get("token")?.value;

  // Definimos el URL de login
  const loginUrl = new URL("/login", request.url);

  // Si el usuario intenta acceder a /expedientes sin token, redirigir al login
  if (request.nextUrl.pathname.startsWith("/expedientes") && !token) {
    // Redirigir a /login
    return NextResponse.redirect(loginUrl);
  }

  // Si el usuario intenta acceder a /login con token, redirigir a /expedientes
  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/expedientes", request.url));
  }

  // Cualquier otro caso
  return NextResponse.next();
}

// Configuración para que el middleware solo se aplique a ciertas rutas
export const config = {
  matcher: ["/expedientes/:path*", "/login"],
};
