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
                                <a href="javascript:;" onClick={()=>console.log('contact')}>Contact Us</a>
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
                    <div className={styles.container_fluid}>
                        <div className={styles.row}>
                            <div className={`${styles.col_lg_3} ${styles.col_md_4} ${styles.offset_md_1}`}>
                                <div id="carouselExampleIndicators" className={`${styles.carousel} ${styles.slide}`} data_ride="carousel">
                                    <ol className={styles.carousel_indicators}>
                                        <li data_target="#carouselExampleIndicators" data_slide_to="0" className={styles.active}>
                                        01
                                        </li>
                                        <li data_target="#carouselExampleIndicators" data_slide_to="1">
                                        02
                                        </li>
                                        <li data_target="#carouselExampleIndicators" data_slide_to="2">
                                        03
                                        </li>
                                        <li data_target="#carouselExampleIndicators" data_slide_to="3">
                                        04
                                        </li>
                                    </ol>
                                    <div className={styles.carousel_inner}>
                                        <div className={`${styles.carousel_item} ${styles.active}`}>
                                        <div className={`${styles.img_box} ${styles.b_1}`}>
                                            <img src="images/slider_img.png" alt="" />
                                        </div>
                                        </div>
                                        <div className={styles.carousel_item}>
                                        <div className={`${styles.img_box} ${styles.b_2}`}>
                                            <img src="images/hot_1.png" alt="" />
                                        </div>
                                        </div>
                                        <div className={styles.carousel_item}>
                                        <div className={`${styles.img_box} ${styles.b_3}`}>
                                            <img src="images/hot_2.png" alt="" />
                                        </div>
                                        </div>
                                        <div className={styles.carousel_item}>
                                        <div className={`${styles.img_box} ${styles.b_4}`}>
                                            <img src="images/hot_3.png" alt="" />
                                        </div>
                                        </div>
                                    </div>
                                    <div className={styles.carousel_btn_box}>
                                        <a className={styles.carousel_control_prev} href="#carouselExampleIndicators" role="button" data_slide="prev">
                                            <span className={styles.sr_only}></span>
                                            {/* Previous */}
                                        </a>
                                        <a className={styles.carousel_control_next} href="#carouselExampleIndicators" role="button" data_slide="next">
                                            <span className={styles.sr_only}></span>
                                            {/* Next */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.col_md_5} ${styles.offset_md_1}`}>
                                <div className={styles.detail_box}>
                                    <h1>
                                        Open AI <br/>
                                        Toy Project
                                    </h1>

                                    <div className={styles.btn_box}>
                                        <a href="" className={styles.btn_1}>
                                        Contact Us
                                        </a>
                                        <a href="" className={styles.btn_2}>
                                        Order Now
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}