import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
const Card = ({ imgUrl, size = "medium" }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);


  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = (e) => {
    console.log(e, e.message);
    setImgSrc("/static/clifford.webp");
  }

  return (
    <div className={styles.container}>
      Card
      <div className={classMap[size]}>
        <Image
          src={imgSrc}
          alt="card image"
          layout="fill"
          className={styles.cardImg}
          onError={handleOnError}
        />
      </div>
    </div>
  );
};

export default Card;
