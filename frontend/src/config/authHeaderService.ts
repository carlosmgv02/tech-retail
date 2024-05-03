import Cookies from "js-cookie";

/**
 * Function to use in all requests that require authentication from user
 *
 * @returns object with the token
 */
export default function authHeader(): object {
  const token = Cookies.get("token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

export function authUser(): string {
  const user = Cookies.get("username");
  if (user) {
    return user;
  } else {
    return "";
  }
}
