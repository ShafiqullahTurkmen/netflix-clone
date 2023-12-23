import vidoeTestData from '@/data/videos.json';  

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
    console.log(process.env.NODE_ENV , "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk node_env");
    const data = process.env.NODE_ENV === "development" ? vidoeTestData : await fetchVideos(url);
    return data?.items?.map((item, i) => ({
      title: item?.snippet?.title || "",
      imgUrl: item?.snippet?.thumbnails?.high?.url || "",
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
