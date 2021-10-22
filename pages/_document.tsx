import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';

class PsyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true.toString()} />
          <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&family=Goldman:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default PsyDocument;
