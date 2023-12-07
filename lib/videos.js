
export const getCommonVideos = async (url) => {
    try {
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
        const BASE_URL = "youtube.googleapis.com/youtube/v3";
        const response = await fetch(`https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
        if (!response.ok) throw new Error("Some thing went wrong with Youtube API");

        const data = await response.json();    
        return data?.items?.map((item, i) => ({
           title: item?.snippet?.title || "",
           imgUrl: item?.snippet?.thumbnails?.high?.url || "",
           id: item?.id?.videoId || i, 
        }));
    } catch (error) {
        console.error("Something went wrong with video library", error);
        return [];
    }
   
}

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`;
    return getCommonVideos(URL);
};

export const getPopularVideos = () => {
const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
return getCommonVideos(URL);
};