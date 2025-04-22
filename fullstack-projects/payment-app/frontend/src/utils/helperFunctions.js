import { jwtDecode } from "jwt-decode";

export const domain = "http://localhost:4000/api/v1";

export function isAccessTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // in seconds
    
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return true; // assume expired if error
  }
}

export function proper(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getUser() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    undefined;
  }
  return jwtDecode(token);
}