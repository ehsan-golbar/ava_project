import styles from "./speech.module.css";
import chainicon from "../assets/chain Icon.png";
import uploadIconWhite from "../assets/upload Icon white.png";
import bigUploadIcon from "../assets/big upload Icon.png";
import micIcon from "../assets/mic Icon.png";
import rstyles from "./resultConverting.module.css";

import SpeechCardFoot from "./SpeechCardFoot";
import { Link, Outlet } from "react-router-dom";

import { useAppSelector } from "./store/store";

type UploadState = "upload" | "simpleResult" | "timedResult";

interface MyComponentProps {
  state: UploadState;
}

export default function UploadFile(props: MyComponentProps) {
  // const resultLanguage = useSelector((state: RootState) => state.data.resultLanguage);
  const resultLanguage = useAppSelector((state) => state.data.resultLanguage);
  // const dispatch: AppDispatch = useDispatch();

  if (props.state === "upload") {
    return (
      <>
        <div className={styles.speechCard}>
          <div className={styles.cardHead}>
            {/* <div className={styles.cardHeadItemOne}> */}
            <div className={styles.cardHeadItems}>
              <div className={styles.cardHeadItem}>
                <button className="buttonStyle">
                  <Link to="/convert-speech/record" className="linkStyle">
                    {/* <img src={micIconWhite} alt="micIcon" /> */}
                    <img src={micIcon} alt="micIcon" />
                    <p>ضبط صدا</p>
                  </Link>
                </button>
              </div>

              <div className={styles.cardHeadItemTwo}>
                <button className="buttonStyle">
                  <Link to="/convert-speech/upload" className="linkStyle">
                    <img src={uploadIconWhite} alt="uploadIcon" />
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

          <div className={styles.cardBodyUpload}>
            <div className={styles.bodyDescriptionUpload}>
              <button className="buttonStyle">
                <div className={styles.uploadLogo}>
                  <img src={bigUploadIcon} alt="bigUploadIcon" />
                </div>
              </button>

              {resultLanguage === "fa" ? (
                <p className={styles.uploadDescription}>
                  برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن
                  پیاده شده آن، در اینجا ظاهر می شود
                </p>
              ) : (

                <div>
                <p className={rstyles.bodyTextEnglish}>
                  To upload a speech file (audio/video), press the button
                  </p>

                  <p className={rstyles.bodyTextEnglish}>
                   Text
                  Unloaded, it appears here
                  </p>
                  </div>
              )}
            </div>
          </div>

          <SpeechCardFoot></SpeechCardFoot>
        </div>
      </>
    );
    // break;
  } else if (props.state === "simpleResult" || props.state === "timedResult") {
    return (
      <>
        <div className={styles.speechCard}>
          <div className={styles.cardHead}>
            <div className={styles.cardHeadItems}>
              {/* <div className={styles.cardHeadItemOne}> */}

              <div className={styles.cardHeadItem}>
                <button className="buttonStyle">
                  <Link to="/convert-speech/record" className="linkStyle">
                    {/* <img src={micIconWhite} alt="micIcon" /> */}
                    <img src={micIcon} alt="micIcon" />
                    <p>ضبط صدا</p>
                  </Link>
                </button>
              </div>

              <div className={styles.cardHeadItemTwo}>
                <button className="buttonStyle">
                  <Link to="/convert-speech/upload" className="linkStyle">
                    <img src={uploadIconWhite} alt="uploadIcon" />
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

          <div className={styles.cardBodyUpload}>
            <div className={rstyles.resultCard}>
              <Outlet context={{ fileSegments: [] }}></Outlet>
            </div>
          </div>

          <SpeechCardFoot></SpeechCardFoot>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>error</div>
      </>
    );
  }
}
