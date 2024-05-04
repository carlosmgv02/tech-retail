import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.JWT_SECRET || "snfuysbftysfctres";

export const getUserFromtoken = (token: string) => {
  try {
    const actualToken = token.slice(7);
    console.log(SECRET_KEY);

    const user = jwt.verify(actualToken, SECRET_KEY) as JwtPayload;
    console.log(user);

    return user.id;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    return null;
  }
};
