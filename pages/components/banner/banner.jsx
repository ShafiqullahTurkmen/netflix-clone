import styles from "./banner.module.css";

const Banner = ({title, subTitle, imgUrl}) => {

  const handleOnPlay = () => {
    console.log("Button clicked");
  }

  return (
    <div>
      <h3>{title}</h3>
      <h3>{subTitle}</h3>
      <button onClick={handleOnPlay}>Play</button>
      <div className={styles.bannerBackgroundImage} style={{ backgroundImage: `url(${imgUrl})`}}></div>
    </div>
  )
}
 
export default Banner