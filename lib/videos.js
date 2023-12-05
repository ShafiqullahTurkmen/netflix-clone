import videoData from '../data/videos.json';

export const getVideos = () => {
    return videoData?.items?.map(item => ({
       title: item?.snippet?.title,
       imgUrl: item?.snippet?.thumbnails?.high?.url,
       id: item?.id?.videoId, 
    }));
}