import { useState } from "react";
import styles from "../index.module.scss"

export default function QuokkaLabel() {
  const [imgHover, setImgHover] = useState(false);
  function goMySource() {
    window.open('https://hachuu.github.io/hachu/');
  }
  return (
    <div>
      <img src="/quokka.svg" className={styles.icon} onMouseEnter={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)} onClick={()=>goMySource()}/>
      { imgHover ? (
        <div className={styles.balloon}>
          <div className={styles.balloon__text}>
            {/* 하트표시 */}
            quokka ❤️
            {/* <span role="img" aria-label="heart"></span> */}
          </div>
        </div>
      ) : null }
    </div>
  );
}