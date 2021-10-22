import '../styles/globals.css';
import type { AppProps } from 'next/app';

function PsyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default PsyApp;
