import styles from "./speech.module.css";
import chainiconWhite from "../assets/chain Icon white.png";

import micIcon from "../assets/mic Icon.png";
import littleChainIcon from "../assets/little chain Icon.png";

import uploadIcon from "../assets/upload Icon.png";

import SpeechCardFoot from "./SpeechCardFoot";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

import rstyles from "./resultConverting.module.css";

import { useAppDispatch, useAppSelector } from "./store/store";
import { findFileByUrl } from "./store/slices/FetchFiles";
import { setFileSegments } from "./store/slices/fetchFileSegmentsSlice";

interface Segment {
  start: string;
  end: string;
  text: string;
}

export interface FileData {
  duration: string;
  id: number;
  processed: string;
  segments: Segment[];

  url: string;
}

export default function LinkFile() {
  const [fileUrl, setFileUrl] = useState<string>("");

  const dataState = useAppSelector((state) => state.removeFile);

  const [showResult, setShowResult] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<FileData | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();

  const fetchFile = () => {
    const file = findFileByUrl(dataState, fileUrl);
    setSelectedFile(file);
    if (file !== undefined) dispatch(setFileSegments(file.segments));
    console.log(file?.segments);

    setShowResult(true);
  };

  const handleChainButoonClick = () => {
    fetchFile();
  };

  return (
    <>
      <div className={styles.speechCard}>
        <div className={styles.cardHead}>
          <div className={styles.cardHeadItems}>
            <div className={styles.cardHeadItem}>
              <button className="buttonStyle">
                <Link to="/convert-speech/record" className="linkStyle">
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
          {!showResult ? (
            <div className={styles.bodyDescriptionUpload}>
              <div className={styles.linkInputSection}>
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
            <div className={rstyles.resultCard}>
              <Outlet
                context={{ fileSegments: selectedFile?.segments }}
              ></Outlet>
            </div>
          )}
        </div>

        <SpeechCardFoot></SpeechCardFoot>
      </div>
    </>
  );
}
