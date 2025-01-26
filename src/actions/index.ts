"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export const customRevalidation = (path: string) => {
  revalidatePath(path);
};

export async function login(username: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      cookies().set("authToken", data.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 24 * 3,
        path: "/",
      });
      return { success: true };
    } else {
      return { success: false, error: data.error || "Login gagal" };
    }
  } catch (err) {
    return { success: false, error: "Terjadi kesalahan saat login" };
  }
}

export async function logout() {
  cookies().delete("authToken");
  redirect("/login");
}

export async function getAuthToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  return token;
}
