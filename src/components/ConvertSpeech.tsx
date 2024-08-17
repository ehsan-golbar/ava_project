import styles from "./speech.module.css";

import "../App.css";

import { Outlet } from "react-router-dom";

export default function ConvertSpeech() {
  return (
    <>
      <div className={styles.speechBody}>
        <div className={styles.speechOverview}>
          <p className={styles.speechTitle}>تبدیل گفتار به متن</p>
          <p className={styles.speechDetails}>
            آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف، زبان فارسی
            را یادگرفته است و میتواند متن صحبت ها را بنویسد.
          </p>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
