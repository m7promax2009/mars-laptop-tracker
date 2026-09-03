import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Default fast login for Mars IT staff:
    // Credentials: admin / mars2026 or pin 1234 or mars
    const validUsername = username?.toLowerCase()?.trim();
    const isMarsAuthorized = 
      (validUsername === "admin" && (password === "mars2026" || password === "mars" || password === "1234")) ||
      (validUsername === "mars" && password === "mars") ||
      (password === "mars2026");

    if (!isMarsAuthorized) {
      return NextResponse.json(
        { success: false, message: "Login yoki parol noto'g'ri! (Standart: admin / mars2026)" },
        { status: 401 }
      );
    }

    const userData = {
      username: validUsername || "admin",
      name: "Mars IT Administrator",
      role: "admin",
    };

    const response = NextResponse.json({
      success: true,
      message: "Tizimga muvaffaqiyatli kirildi",
      user: userData,
    });

    // Set cookie for authentication
    response.cookies.set({
      name: "mars_auth_token",
      value: "mars_authenticated_session_token",
      httpOnly: false, // Accessible to client-side fast check if needed
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Server xatosi" },
      { status: 500 }
    );
  }
}
