import { randomBytes } from "crypto";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

type WithNonceProp = {
  nonce: string;
};

class MyDocument extends Document<WithNonceProp> {
  render() {
    const { nonce } = this.props;
    const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

    return (
      <Html>
        <Head nonce={nonce}>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <meta property="og:site_name" content="LipersInSlums Wiki" />
          <meta name="twitter:card" content="summary" />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();

    try {
      const originRenderPage = ctx.renderPage;

      ctx.renderPage = () =>
        originRenderPage({
          enhanceApp: (App: any) =>
            function EnhanceApp(props) {
              return sheet.collectStyles(<App {...props} />);
            },
        });

      const initialProps = await Document.getInitialProps(ctx);
      const nonce = randomBytes(128).toString("base64");

      return {
        ...initialProps,
        nonce,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}

export default MyDocument;
