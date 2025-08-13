import Head from 'next/head';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Alignment System - Accenture</title>
        <link rel='icon' href='/accenture-logo.svg' type='image/svg+xml' />
        <link rel='alternate icon' href='/accenture-logo.svg' />
        <meta
          name='description'
          content='Professional content analysis and job alignment system - Accenture'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
