import jwt from "jsonwebtoken";

export async function verifyToken(token) {
    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decodedToken.issuer;
        return userId;
    }
    return null;
}

export const redirectUser = async (context) => {
    const token = context.req ? context.req.cookies?.token : null;

    const userId = await verifyToken(token);

    if (!userId) {
        return {
            props: {},
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        userId,
        token,
    };
};