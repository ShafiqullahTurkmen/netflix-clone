import vidoeTestData from '@/data/videos.json';  
import { getMyListVideos, getWatchedVideos } from "./db/hasura";


const fetchVideos = async (url) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );
    if (!response.ok) throw new Error("Some thing went wrong with Youtube API");
    return await response.json();
}

export const getCommonVideos = async (url) => {
  try {
    const data = process.env.NODE_ENV === "development" ? vidoeTestData : await fetchVideos(url);
    return data?.items?.map((item, i) => ({
      title: item?.snippet?.title || "",
      imgUrl:  `https://i.ytimg.com/vi/${item?.id?.videoId}/maxresdefault.jpg`,
      id: item?.id?.videoId || i,
      description: item?.snippet.description,
      publishTime: item?.snippet.publishedAt,
      channelTitle: item?.snippet.channelTitle,
      statistics: item?.statistics ? item.statistics : { viewCount: 0 },
    }));
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

// getYoutubeVideoById

export const getYoutubeVideoById = (vidoeID) => {
  const URL =
    `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vidoeID}`;
  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return videos?.map((video) => ({ id: video.videoId, imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`, })) || [];
};

export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      };
    }) || []
  );
};