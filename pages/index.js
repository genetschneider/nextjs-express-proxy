import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { sleep } from "../utils";

export default function Home({ random }) {
  const { locale } = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js!</h1>
        <h3 className={styles.title}>SSR: {random}</h3>

        <Link className={styles.description} locale={locale} href="/about">
          Click here to navigate
        </Link>

        <Link
          className={styles.description}
          prefetch={false}
          locale={locale}
          href="/not-about"
        >
          Click here to redirect successfully through express
        </Link>
        
        <Link
          className={styles.description}
          prefetch={false}
          locale={locale}
          href="/404"
        >
          Click here to redirect to 404 page
        </Link>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  await sleep(500);

  return {
    props: {
      random: Date.now(),
    },
  };
};
