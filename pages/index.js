import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "./components/banner/banner";
import Navbar from "./components/nav/navbar";
import SectionCard from "./components/card/section-cards";
import { getVideos, getPopularVideos, getWatchItAgainVideos } from '../lib/videos';
import { redirectUser } from "@/lib/utils";

export async function getServerSideProps (context) {
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("Traver");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchItAgainVideos
    }
  }
}

export default function Home({ disneyVideos, productivityVideos, travelVideos, popularVideos, watchItAgainVideos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Navbar username="ankita@ank.com" />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="4zH5iYM4wJo"
        />

        <div className={styles.sectionWrapper}>
          <SectionCard key="Disney" title="Disney" videos={disneyVideos} size="large"/>
          <SectionCard key="Disney" title="Watch it again" videos={watchItAgainVideos} size="small"/>
          <SectionCard key="Travel" title="Travel" videos={travelVideos} size="small"/>
          <SectionCard key="Productivity" title="Productivity" videos={productivityVideos} size="medium"/>
          <SectionCard key="Popular" title="Popular" videos={popularVideos} size="small"/>
        </div>
      </div>
    </div>
  );
}
