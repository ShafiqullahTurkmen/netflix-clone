import { jwtVerify } from "jose";

export async function verifyToken(token) {
    try {
        if (token) {
          const verified = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
          );
          return verified.payload && verified.payload?.issuer;
        }
        return null;
      } catch (err) {
        console.error({ err });
        return null;
      }
}

export const redirectUser = async (context) => {
    const token = context.req ? context.req.cookies?.token : null;

    const userId = await verifyToken(token);

    return {
        userId,
        token,
    };
};