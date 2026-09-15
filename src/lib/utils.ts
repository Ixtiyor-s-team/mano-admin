import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<{ uid: string }>(token);
    return decoded.uid;
  } catch (error) {
    return null;
  }
}
