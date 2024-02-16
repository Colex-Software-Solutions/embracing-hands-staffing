import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";
interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export async function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(secret_key!)
    );
    return decoded.payload as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
