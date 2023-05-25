import Head from "next/head";
import React, { useEffect, useState } from "react";
import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css'; // or use your own CSS Reset
import Twenties from './components/Twenties';
import { useRouter } from 'next/router';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/index/Home";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  /* Add your own custom styles */
  body {
    margin: 0;
  }
`;

export default function App() {
  const router = useRouter();
  const [isDocument, setIsDocument] = useState(false);

  useEffect(() => {
    if(typeof document !== 'undefined') {
      // you are safe to use the "document" object here
      console.log(document.location.href);
      setIsDocument(true);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>OpenAI Embedding + Completion Model</title>
        <link rel="icon" href="/quokka.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Cute+Font&family=Dongle:wght@300&family=Rubik+Pixels&display=swap" rel="stylesheet"/>
      </Head>
      {/* <button onClick={()=>router.push('/games')}>Games</button> */}
      <Home/>
      {/* {
        isDocument &&
          <BrowserRouter>
            <Switch>
              <Route exact path='/' Component={Main}/>
            </Switch>
          </BrowserRouter>
      } */}
    </div>
  );
}
