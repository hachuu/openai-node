import Head from "next/head";
import {useEffect} from "react";
import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css'; // or use your own CSS Reset
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  /* Add your own custom styles */
  body {
    margin: 0;
  }
`;

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if(typeof document !== 'undefined') {
      // you are safe to use the "document" object here
      console.log(document.location.href);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>OpenAI Embedding + Completion Model</title>
        <link rel="icon" href="/quokka.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Cute+Font&family=Dongle:wght@300&family=Rubik+Pixels&display=swap" rel="stylesheet"/>
      </Head>
      <Main/>

      {/* <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter> */}
    </div>
  );
}
