import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "./videoId.module.css";
import { getYoutubeVideoById } from "@/lib/videos";
import Navbar from "../components/nav/navbar";
import Like from "../components/icons/like-icon";
import DisLike from "../components/icons/dislike-icon";
import { useState } from "react";

Modal.setAppElement("#__next");

const Video = ({
  video: {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  },
}) => {
  const router = useRouter();
  const { videoId } = router.query;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  const handleToggleDislike = async () => {
    console.log("handleToggleDislike");
    setToggleDisLike(!toggleDisLike);
    setToggleLike(false);
  };

  const handleToggleLike = async () => {
    console.log("handleToggleLike");
    setToggleLike(!toggleLike);
    setToggleDisLike(false);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=1`}
          frameborder="0"
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDisLike} />
            </div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export async function getStaticProps(context) {
  const videoArray = await getYoutubeVideoById(context?.params?.videoId);
  return {
    props: {
      video: (videoArray && videoArray.length && videoArray[0]) || {},
    },
    revalidate: 10,
  };
}

export async function getStaticPaths(context) {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export default Video;
