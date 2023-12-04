import Image from "next/legacy/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from 'framer-motion';
const defaultImage = "https://images.unsplash.com/photo-1682687982107-14492010e05e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


const Card = ({ imgUrl=defaultImage, size = "medium" }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);


  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = (e) => {
    console.log(e, e.message);
    setImgSrc(defaultImage);
  }

  return (
    <div className={styles.container}>
      Card
      <motion.div 
        className={`${classMap[size]} ${styles.imgMotionWrapper}`}
        whileHover={{scale: 1.2}}
      >
        <Image
          src={imgSrc}
          alt="card image"
          layout="fill"
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
