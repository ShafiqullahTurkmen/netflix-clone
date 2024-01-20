import { findVideoIdByUser } from "@/lib/db/hasura";
import jwt from "jsonwebtoken";

export default async function Stats(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ message: "Invalid Request" });

    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Forbidden" });

    const {videoId} = req.query;
    if (!videoId) return res.status(400).json({ message: "Missing param:!"})

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.issuer;

    const findVideoId = await findVideoIdByUser(token, userId, videoId);
    console.log({ findVideoId });
    res.status(200).json({ msg: "it works", decodedToken, findVideoId });

  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Something went wrong" });
  }
}
