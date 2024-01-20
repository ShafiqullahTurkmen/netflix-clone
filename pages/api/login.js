import jwt from 'jsonwebtoken';
import { createNewUser, isNewUser } from "@/lib/db/hasura";
import { magicAdmin } from "@/lib/magic";
import { setTokenCookie } from "../../lib/cookies";


export default async function Login(req, res) {
    try {
        if (req.method !== "POST") return res.status(405).json({ message: "Invalid request"});
        const didToken = req?.headers?.authorization?.split(" ")?.[1];
        if(!didToken) return res.status(401).json({ message: "Invalid credentials"});
        
        const metaData = await magicAdmin.users.getMetadataByToken(didToken);

       const token = jwt.sign(
        {
          ...metaData,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metaData.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      (await isNewUser(token, metaData.issuer)) && await createNewUser(token, metaData);
      setTokenCookie(token, res);
      return res.status(200).json({ done: true })
        
    } catch (error) {
        console.error("Something went wrong logging in", error, error?.message);
        res.status(500).send({ 
            message: error?.message,
            errorData: error?.data?.length || error?.code || "Something went wrong"
        })
    }
}