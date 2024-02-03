import Link from "next/link";
import Card from "../card";
import styles from "./index.module.css";
const SectionCard = ({ title, videos = [], size, shouldWrap = false, shouldScale  }) => {
  return (
    <section className={`${styles.container}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.cardWrapper} ${shouldWrap && styles.wrap || ""}`}>
      {
        videos?.map(({imgUrl, id}, i) => (
          <Link href={`/video/${id}`} key={id}>
            <Card imgUrl={imgUrl} size={size} id={i}  shouldScale={shouldScale} />
          </Link>
        ))
      }
      </div>
    </section>
  );
};

export default SectionCard;
