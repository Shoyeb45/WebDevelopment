import jwtDecode from "jwt-decode";


export const accessToken = localStorage.getItem("accessToken");
export const id = jwtDecode(accessToken)._id;

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