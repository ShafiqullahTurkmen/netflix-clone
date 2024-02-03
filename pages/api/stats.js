import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

export default async function Stats(req, res) {
  try {
    if (req.method !== "POST" && req.method !== "GET")
      return res.status(405).json({ message: "Invalid Request" });
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: "Forbidden" });

    const { videoId, favourited, watched = true } = req.method === "POST" ? req.body : req.query;
    if (!videoId) return res.status(400).json({ message: "Missing params!" });
    if(req.method === "POST" && !([0,1].includes(favourited))) return res.status(400).json({message: "missing body!"})

    const userId = await verifyToken(token);

    const findVideo = await findVideoIdByUser(token, userId, videoId);
    const isStatsExist = findVideo?.length > 0;
    if (req.method === "GET") {
      if (!isStatsExist) return res.status(404).json({ msg: "video state not found", user: null }); 
      return res.status(200).json({ findVideo, msg: "Video states" });
    }

    if (isStatsExist) {
      const response = await updateStats(token, {
        watched,
        userId,
        videoId,
        favourited,
      });
      return res.status(200).json({ msg: "state updated", response });
    }

    const response = await insertStats(token, {
      watched,
      userId,
      videoId,
      favourited,
    });
    return res.status(200).json({ msg: "state inserted", response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Something went wrong" });
  }
}
