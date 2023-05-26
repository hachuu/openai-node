
import { useEffect, useState } from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import Main from './components/Main';
import Liar from './components/Liar';
import normalize from 'normalize.css'; // or use your own CSS Reset
import Twenties from "./components/Twenties";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  /* Add your own custom styles */
  body {
    margin: 0;
  }
`;

export default function Games() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('games')
  }, []);

  return (
      isClient && 
      // <div>
      //   <h1>Games</h1>
      //   <BrowserRouter>
      //     <ul>
      //       <li>
      //         <Link to="/games">Main</Link>
      //       </li>
      //       <li>
      //         <Link to="/games/twenty">Twenty</Link>
      //       </li>
      //       <li>
      //         <Link to="/games/liar">Liar</Link>
      //       </li>
      //     </ul>
      //     <Routes>
      //       <Route exact path='/games'/>
      //       <Route path='/games/twenty' element={<Twenties />}/>
      //       {/* <Route path='/twenty' element={<Main />}/> */}
      //       <Route path='/games/liar' element={<Liar />}/>
      //     </Routes>
      //   </BrowserRouter>
      // </div>
      <Twenties/>
  );
}