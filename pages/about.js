
import { useEffect, useState } from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css'; // or use your own CSS Reset
import Consolation from "./components/Consolation";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  /* Add your own custom styles */
  body {
    margin: 0;
  }
`;

export default function About() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('games')
  }, []);

  return (
      isClient && 
      <Consolation/>
  );
}