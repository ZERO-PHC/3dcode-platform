import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import loader from "../loader";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <head>
          <link
            rel="preload"
            href="/assets/Monument/MonumentExtended-Regular.otf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/Monument/MonumentExtended-Ultrabold.otf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <style>{loader}</style>
        </head>
        <body>
          <div id={"globalLoader"}>
            <div className="loader">
              <div />
              <div />
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
