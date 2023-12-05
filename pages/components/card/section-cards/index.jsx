import Card from "../card";
import styles from "./index.module.css";
const SectionCard = ({ title="Disney", videos, size="large" }) => {
  return (
    <section className={`${styles.container}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
      {
        videos?.map(({imgUrl, id}, i) => (
          <Card imgUrl={imgUrl} size={size} id={i} key={id} />
        ))
      }
 
     
      </div>
    </section>
  );
};

export default SectionCard;
