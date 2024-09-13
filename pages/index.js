import React, { useContext, useEffect, useState } from 'react'
import styles from "../styles/login_page.module.css";
import RandomizeLoginApt from './api/RandomizeLoginApt';
import { DayNightContext } from './api/DayNightMode';
import DayNightToggleButton from "./api/DayNightToggleButton";
import Image from 'next/image';
import Link from 'next/link'

function Index() {

  // Login Handler
  const handleLogin = () => {
    window.location.href = 'https://studiofy-01b981afc50a.herokuapp.com/login';
  }

  // Image Randomizer GET
  const [aptImages, setAptImages] = useState({});
  const [loadedImages, setLoadedImages] = useState(false);
  const [switchAnimation, setSwitchAnimation] = useState(false);
  const {mode, stylesList} = useContext(DayNightContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect (() => {
    const updateFurniture = () => {
      setSwitchAnimation(true);
      setTimeout(() => {
        setAptImages(RandomizeLoginApt());
        setSwitchAnimation(false);
      }, 1000);
    };

    const intialLoad = async () => {
      await setAptImages(RandomizeLoginApt());
      setLoadedImages(true);
    };

    intialLoad();
    const intervalID = setInterval(updateFurniture, 5000) // in ms, 1000 = 1 second

    return () => clearInterval(intervalID);
  }, []);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if(!isMounted) {
        return null;
    }

  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.container} style={{backgroundColor: stylesList.backgroundColor}}>
        <DayNightToggleButton></DayNightToggleButton>

          <div className={styles.mainWindow}>
            <Image width={100} height={100} src={stylesList.bgTallWindowImageSrc} alt='Tall Background Window' className={styles.bgWindowTall}></Image>
            <Image width={100} height={100} src={stylesList.bgWideWindowImageSrc} alt='Wide Background Window' className={styles.bgWindowWide}></Image>
            <Image width={100} height={100} src={stylesList.bgSquareWindowImageSrc} alt='Square Background Window' className={styles.bgWindowSquare}></Image>

            <Image width={755} height={633} src={stylesList.loginPageImageSrc} alt='Main Window' className={styles.mainWindowImage}></Image>

            <div className={styles.pixelborder}>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} src={aptImages.randomAptWallFloor} alt='apt_wallfloor'></Image>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.1s"}} src={aptImages.randomAptLivingRoom} alt='apt_living'></Image>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.2s"}} src={aptImages.randomAptBedroom} alt='apt_bedroom'></Image>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.3s"}} src={aptImages.randomAptKitchen} alt='apt_kitchen'></Image>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.4s"}} src={aptImages.randomAptEntrance} alt='apt_entrance'></Image>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{animationDelay: "0.5s"}} src={aptImages.randomAptOffice} alt='apt_office'></Image>
              <Image width={1024} height={722} className={`${styles.pixel} ${switchAnimation ? styles.switch : styles.drop}`} style={{mixBlendMode: "multiply"}} src={aptImages.randomAptLighting} alt='apt_lighting'></Image>
            </div>
          </div>
          

          <div className={styles.sideContainer}>
            <Image width={650} height={300} src='/images/studiofyText.png' className={styles.studiofyText} alt='Studiofy'></Image>
            <button className={styles.loginButton} onClick={handleLogin}><Image width={480} height={85} src='/images/loginButton.png' className={styles.loginButton} alt='Login Button'></Image></button>
          </div>
      

        
        </div>

        <footer className={styles.footer}>
            <div className={styles.footerOptionsContainer}>
              <Link className={styles.footerOptions} href='https://studiofy-01b981afc50a.herokuapp.com/about'>ABOUT</Link>
              <Link className={styles.footerOptions} href='https://studiofy-01b981afc50a.herokuapp.com/privacy'>PRIVACY</Link>
              <Link className={styles.footerOptions} href='https://studiofy-01b981afc50a.herokuapp.com/main'>MAIN TEST</Link>
            </div>

            <a href= "mailto: studiofy.team@gmail.com" className={styles.footerEmail}>
              <Image width={36} height={36} className={styles.emailIcon} src='/images/blackMail.png' alt='Mail Icon'></Image>STUDIOFY.TEAM@GMAIL.COM
            </a>
        </footer>
      </div>
    </>
  );
}

export default Index