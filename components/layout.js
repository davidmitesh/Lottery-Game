import React from "react";
// import Header from "./Header";
import { Container } from "semantic-ui-react";
// import Head from "next/head"; //This is a react component that can be used under
//any other react components.Any child tags put inside this tag will
//be moved to the head tag of the HTML document.
export default props => {
  return (
    <Container>
      <Head>
        {/*anything placed under this is move to the HTML head tag*/}
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>

    //   <Header />
    //   {props.children}
    // </Container>
  );
};
