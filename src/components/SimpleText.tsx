import styles from "./resultConverting.module.css";
// import textIconLight from "../assets/text icon light.png";
import textIcon from "../assets/text icon.png";
import timeIconLight from "../assets/time icon light.png";

import refreshIcon from "../assets/Refresh.png";

import downloadIconHover from "../assets/download Icon hover.png";
import copyIconHover from "../assets/copy Icon hover.png";
import copyIcon from "../assets/copy Icon.png";
import downloadIcon from "../assets/download Icon.png";
import { useState } from "react";

import AudioPlayer from "./AudioPlayer";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

// import { useData } from './DataContext';
import { useAppSelector } from "./store/store";

type Source = "upload" | "archive" |"link";
interface MyComponentProps {
  source: Source;
  // persian :boolean;
}




// interface Segment {
//   start: string;
//   end: string;
//   text: string;
// }

// interface FileContext {
//   fileSegments?: Segment[]; 
// }

export default function SimpleText(props: MyComponentProps) {
  const [downloadIconImg, setDownloadIconImg] = useState(downloadIcon);
  const [copyIconImg, setCopyIconImg] = useState(copyIcon);

  // const{ fileSegments  } = useOutletContext<FileContext>()


  const fileSegments = useAppSelector((state) => state.fileFetchSegments.fileSegments);



  const resultLanguage = useAppSelector((state) => state.data.resultLanguage);


  return (
    <>
   
      <div className={styles.resultHead}>
        <div className={styles.simpletextSelected}>
          <button className="buttonStyle">
            <Link
              to={
                props.source === "upload"
                  ? "/convert-speech/upload/simpleText"
                  :
                  props.source === "archive" 
                  ?
                  "/archive/simpleResult"
                  :
                  "/convert-speech/link/simpleText"
              }
              className="linkStyle"
            >
              <img src={textIcon} alt="textIcon" />
              <p className={styles.resultHeadItemSelected}> متن ساده </p>
            </Link>
          </button>
        </div>

        <div className={styles.timedText}>
          <button className="buttonStyle">
            <Link
              to={
                props.source === "upload"
                  ? "/convert-speech/upload/timedText"
                  : 
                  props.source === "archive" 
                  ?
                  "/archive/timedResult"
                  :
                  "/convert-speech/link/timedText"
              }
              className="linkStyle"
            >
              <img src={timeIconLight} alt="timeIcon" />
              <p className={styles.resultHeadItem}>متن زمانبندی شده</p>
            </Link>
          </button>
        </div>

        <div className={styles.resultActions}>
          <Tooltip title="۳.۱۸ مگابایت">
            <div className={styles.actionOne}>
              <button className="buttonStyle">
                <img
                  src={downloadIconImg}
                  alt="Changeable"
                  onMouseOver={() => setDownloadIconImg(downloadIconHover)}
                  onMouseOut={() => setDownloadIconImg(downloadIcon)}
                />
              </button>
            </div>
          </Tooltip>

          <div className={styles.actionOne}>
            <button className="buttonStyle">
              <img
                src={copyIconImg}
                alt="Changeable"
                onMouseOver={() => setCopyIconImg(copyIconHover)}
                onMouseOut={() => setCopyIconImg(copyIcon)}
              />
            </button>
          </div>

          {/* <div className={styles.actionOne}> */}
          <div className={styles.startAgain}>
            <button className="buttonStyle">
              <img src={refreshIcon} alt="refreshIcon" />
              <p className={styles.refreshItem}>شروع دوباره</p>
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>

{  resultLanguage === 'fa'  ? <div className={styles.resultBody}>

<p className={styles.bodyText}>
{ fileSegments &&  fileSegments
    .map(segment => segment.text) // Extract text from each segment
    .join(' ')}

</p>
        
      </div>
:

      <div className={styles.resultBody}>

        <p className={styles.bodyTextEnglish}>[---][---] Lili, take another walk out [of] your fake world [---][---] [Please] put all the drugs out of your hand [---][---] [---][---] You'll see that you can breathe without no back [up] [---][---] So much [stuff] you got to [understand] For every step [---][---] in any walkAny town of any thought[I'll] be your guideFor every street of [any] [sceneAny] place you've never [beenI'll] be your guide [---][---][---][---]</p>
        <p className={styles.bodyTextEnglish}>[---][---] Lili, take another walk out [of] your fake world [---][---] [Please] put all the drugs out of your hand [---][---] [---][---] You'll see that you can breathe without no back [up] [---][---] So much [stuff] you got to [understand] For every step [---][---] in any walkAny town of any thought[I'll] be your guideFor every street of [any] [sceneAny] place you've never [beenI'll] be your guide [---][---][---][---]</p>
        <p className={styles.bodyTextEnglish}>[---][---] Lili, take another walk out [of] your fake world [---][---] [Please] put all the drugs out of your hand [---][---] [---][---] You'll see that you can breathe without no back [up] [---][---] So much [stuff] you got to [understand] For every step [---][---] in any walkAny town of any thought[I'll] be your guideFor every street of [any] [sceneAny] place you've never [beenI'll] be your guide [---][---][---][---]</p>

      </div>
}
      <div className={styles.resultFoot}>
        <AudioPlayer></AudioPlayer>
      </div>
    </>
  );
}
