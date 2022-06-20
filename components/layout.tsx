import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rob Dodson</title>
        <link rel="canonical" href="https://robdodson.me" />
      </Helmet>
      <main>{children}</main>
    </>
  );
}
