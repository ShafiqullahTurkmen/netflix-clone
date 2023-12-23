import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "./videoId.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;

  return (
    <div className={styles.container}>
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
      </Modal>
    </div>
  );
};

export default Video;
