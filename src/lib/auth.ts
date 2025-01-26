import { cookies } from "next/headers";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export function removeAuthToken() {
  cookies().delete("authToken");
}

export function getAuthToken() {
  return cookies().get("authToken")?.value;
}

export async function verifyToken(token: string) {
  try {
    const response = await fetch(`${API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
