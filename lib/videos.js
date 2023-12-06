
export const getVideos = async () => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&type=video&key=${YOUTUBE_API_KEY}`)
    if (!response.ok) throw new Error("Some thing went wrong with Youtube API");

    const data = await response.json();

    console.log(response.ok);

    return data?.items?.map((item, i) => ({
       title: item?.snippet?.title || "",
       imgUrl: item?.snippet?.thumbnails?.high?.url || "",
       id: item?.id?.videoId || i, 
    }));
}