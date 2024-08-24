import Head from "next/head";
import { Home } from "../components/home/Home";

export default function home() {
  return (
    <>
      <Head>
        <title>Engida Lishan | Software Developer</title>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="description" content="Engida Lishan | Software Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Engida Lishan | Software Developer"
        />
        <meta
          name="description"
          content="Hey! I'm Engida Lishan, and I'm a Computer Science and Engineering Bachelor's degree graduate."
        />

        <meta
          property="og:title"
          content="Engida Lishan | Software Developer"
        />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://engida.com/screenshot.png" />
        <meta property="og:image" content="https://engida.com/screenshot.png" />
        <meta
          property="og:description"
          content="Hey! I'm Engida Lishan, and I'm a Computer Science and Engineering Bachelor's degree graduate."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@engida_lish" />
        <meta
          name="twitter:title"
          content="Engida Lishan | Software Developer"
        />
        <meta
          name="twitter:description"
          content="Hey! I'm Engida Lishan, and I'm a Computer Science and Engineering Bachelor's degree graduate."
        />
        <meta name="twitter:creator" content="@engida_lish" />
        <meta
          name="twitter:image"
          content="https://engida.com/screenshot.png"
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Engida Lishan" />
        <meta name="keywords" content="Engida Lishan, Software Developer" />
      </Head>
      <Home />
    </>
  );
}
