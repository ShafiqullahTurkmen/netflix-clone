import Head from "next/head";
import Navbar from "../components/nav/navbar";
import SectionCard from "../components/card/section-cards";
import styles from "./my-list.module.css";
import { redirectUser } from "@/lib/utils";
import { getMyList } from "@/lib/videos";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({myListVideos}) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
        <SectionCard title="My List" videos={myListVideos} size="small" shouldWrap shouldScale={false} />
        </div>
      </main>
    </div>
  );
};

export default MyList;
