// import style from '../../../styles.scss'
import styles from "../../style.module.scss";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
export default function Home() {
    const router = useRouter();
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <>
            <div className={styles.hero_area}>
                <header className={styles.header_section}>
                    <div className={styles.container_fluid}>
                        <nav className={`${styles.navbar} ${styles.navbar_expand_lg} ${styles.custom_nav_container}`}>
                        <a className={styles.navbar_brand} href="index.html">
                            <img src="images/logo.png" alt="" />
                            <span>
                            Goid
                            </span>
                        </a>

                        <div className={styles.navbar_collapse} id="">
                            <div className={styles.custom_menu_btn}>
                            <button onClick={()=>setToggleMenu(!toggleMenu)}>
                                <span className={styles.s_1}> </span>
                                <span className={styles.s_2}> </span>
                                <span className={styles.s_3}> </span>
                            </button>
                            </div>
                            <div id="myNav" className={ `${styles.overlay} ${toggleMenu ? styles.menu_width : ''}`}>
                            <div className={styles.overlay_content}>
                                <a href="#">HOME</a>
                                <a href="#">ABOUT</a>
                                <a href="javascript:;" onClick={()=>router.push('/games')}>Game</a>
                                <a href="javascript:;" onClick={()=>console.log('contact')}>Contact Me</a>
                            </div>
                            </div>
                        </div>
                        </nav>
                    </div>
                </header>
                <section className={`${styles.slider_section} ${styles.position_relative}`}>
                    <div className={styles.side_heading}>
                        <h5>
                        G
                        P
                        T
                        H
                        A
                        C
                        H
                        U
                        💌
                        </h5>
                    </div>
                </section>
            </div>
        </>
    )
}