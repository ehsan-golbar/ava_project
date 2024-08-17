import micIconWhite from "../assets/mic Icon white.png";
import styles from "./speech.module.css";
import chainicon from "../assets/chain Icon.png";
import uploadIcon from "../assets/upload Icon.png";
import bigMicIcon from "../assets/big mic Icon.png";
// import dropIcon from "../assets/drop Icon.png";

import SpeechCardFoot from "./SpeechCardFoot";
import { Link } from "react-router-dom";

export default function RecordSpeech() {
  return (
    <>
      <div className={styles.speechCard}>
        <div className={styles.cardHead}>
          <div className={styles.cardHeadItems}>
            {/* <div className={styles.cardHeadItemOne}> */}
            <div className={styles.cardHeadItemOne}>
              <button className="buttonStyle">
                <Link to="/convert-speech/record" className="linkStyle">
                  <img src={micIconWhite} alt="micIcon" />
                  {/* <img src={micIcon} alt="micIcon" /> */}
                  <p>ضبط صدا</p>
                </Link>
              </button>
            </div>

            <div className={styles.cardHeadItem}>
              <button className="buttonStyle">
                <Link to="/convert-speech/upload" className="linkStyle">
                  <img src={uploadIcon} alt="uploadIcon" />
                  <p>بارگذاری فایل</p>
                </Link>
              </button>
            </div>

            <div className={styles.cardHeadItem}>
              <button className="buttonStyle">
                <Link to="/convert-speech/link" className="linkStyle">
                  <img src={chainicon} alt="chainIcon" />

                  <p>لینک</p>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.cardBodyRecord}>
          <div className={styles.bodyDescriptionRecord}>
            <button className="buttonStyle">
              <div className={styles.recordLogo}>
                <img src={bigMicIcon} alt="micIcon" />
              </div>
            </button>
            <p className={styles.recordDescription}>
              برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا
              ظاهر شود
            </p>
          </div>
        </div>

        <SpeechCardFoot></SpeechCardFoot>
      </div>
    </>
  );
}
