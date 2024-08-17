// import micIconWhite from "../assets/mic Icon white.png";
import styles from "./speech.module.css";
import chainiconWhite from "../assets/chain Icon white.png";

import micIcon from "../assets/mic Icon.png";
import littleChainIcon from "../assets/little chain Icon.png";

import uploadIcon from "../assets/upload Icon.png";

import SpeechCardFoot from "./SpeechCardFoot";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

// import { FileData, useFileFetch } from './FileFetchContext';

import rstyles from "./resultConverting.module.css";
// import { Flag } from "@mui/icons-material";
import Progress from "./Progress";
import { useAppDispatch } from "./store/store";
import { setFileSegments } from "./store/slices/fetchFileSegmentsSlice";

interface Segment {
  start: string;
  end: string;
  text: string;
}

interface Stats {
  words: number;
  known_words: number;
}

interface FileData {
  duration: string;
  // id: number;
  // processed: string;

  media_url: string;
  segments: Segment[];
  // length: number;
  stats: Stats;
}

export default function LinkFile() {
  const [fileUrl, setFileUrl] = useState<string>("");

  // const { fetchFile } = useFileFetch();

  const [showResult, setShowResult] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<FileData>();

  const [loading, setLoading] = useState<boolean>(false);
  const url = "/api/transcribe_files/";
  const token = "a85d08400c622b50b18b61e239b9903645297196";
  const dispatch = useAppDispatch();

  const fetchFile = async () => {
    setLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },

      body: JSON.stringify({
        media_urls: [`${fileUrl}`],
      }),
    });

    console.log("post status : ", response.status);

    if (!response.ok) {
      alert(`HTTP error! status: ${response.status}`);
      setLoading(false);
      setShowResult(false);
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log("data : ", data[0].message);
      if (data[0].message === "Download error!") {
        alert(`URL does not exist on server`);
        setLoading(false);
        setShowResult(false);
      } else {
        console.log("item Id : ", data[0]);

        setSelectedFile(data[0]);
        dispatch(setFileSegments(data[0].segments));
        setLoading(false);
        setShowResult(true);
      }
    }
  };

  const handleChainButoonClick = () => {
    fetchFile();

    // console.log
    // const item = fetchFile.find((item) => item.url === fileUrl);
  };

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

            <div className={styles.cardHeadItem}>
              <button className="buttonStyle">
                <Link to="/convert-speech/upload" className="linkStyle">
                  <img src={uploadIcon} alt="uploadIcon" />
                  <p>بارگذاری فایل</p>
                </Link>
              </button>
            </div>

            <div className={styles.cardHeadItemThree}>
              <button className="buttonStyle">
                <Link to="/convert-speech/link" className="linkStyle">
                  <img src={chainiconWhite} alt="chainIcon" />

                  <p>لینک</p>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.cardBodyLink}>
          {!loading ? (
            !showResult ? (
              <div className={styles.bodyDescriptionUpload}>
                <div className={styles.linkInputSection}>
                  {/* <p>{fileUrl}</p> */}
                  <input
                    className={styles.linkInput}
                    placeholder="example.com/sample.mp3"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                  ></input>

                  <div className={styles.linkLogo}>
                    <button
                      className="buttonStyle"
                      onClick={handleChainButoonClick}
                    >
                      <img src={littleChainIcon} alt="littleChainIcon" />
                    </button>
                  </div>
                </div>

                <p className={styles.uploadDescription}>
                  نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را
                  فشار دهید{" "}
                </p>
              </div>
            ) : (
              //****************************************************** */

              <div className={rstyles.resultCard}>
                <Outlet
                  context={{ fileSegments: selectedFile?.segments }}
                ></Outlet>
              </div>
            )
          ) : (
            <Progress progressColor="red"></Progress>
          )}
        </div>

        <SpeechCardFoot></SpeechCardFoot>
      </div>
    </>
  );
}
