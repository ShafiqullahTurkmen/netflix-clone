import Link from "next/link";
import Card from "../card";
import styles from "./index.module.css";
const SectionCard = ({ title="Disney", videos=[], size="large" }) => {
  return (
    <section className={`${styles.container}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
      {
        videos?.map(({imgUrl, id}, i) => (
          <Link href={`/video/${id}`} key={id}>
            <Card imgUrl={imgUrl} size={size} id={i}/>
          </Link>
        ))
      }
      </div>
    </section>
  );
};

export default SectionCard;
