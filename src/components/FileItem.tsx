import styles from "./archive.module.css";
import FileTypeIcon from "./FileTypeIcon";
import downloadIcon from "../assets/download Icon.png";
import copyIcon from "../assets/copy Icon.png";
import wordIcon from "../assets/Word icon.png";
import deleteIcon from "../assets/del Btn.png";

import rstyles from "./resultConverting.module.css";

import { useState } from "react";

import downloadIconHover from "../assets/download Icon hover.png";
import copyIconHover from "../assets/copy Icon hover.png";
import wordIconHover from "../assets/Word icon hover.png";
import deleteIconHover from "../assets/del Btn hover.png";

import Tooltip from "@mui/material/Tooltip";
import { Outlet } from "react-router-dom";
import Progress from "./Progress";
import { useAppDispatch } from "./store/store";
import { Segment } from "@mui/icons-material";
import { setFileSegments } from "./store/slices/fetchFileSegmentsSlice";

import { removeFile } from "./store/slices/FetchFiles";

type FileType = "mic" | "upload" | "chain";

type Language = "persian" | "english";

interface Segment {
  start: string;
  end: string;
  text: string;
}

interface MyComponentProps {
  fileDescription: string | null | undefined;
  fileDate: string;
  fileType: string;
  fileTime: string;
  fileLogo: FileType;

  blueText: boolean;
  backGround: boolean;

  lang: Language;
  fileId: number;
  segments: Segment[];
}

const FileItem: React.FC<MyComponentProps> = (props) => {
  const [downloadIconImg, setDownloadIconImg] = useState(downloadIcon);
  const [wordIconImg, setWordIconImg] = useState(wordIcon);
  const [copyIconImg, setCopyIconImg] = useState(copyIcon);
  const [deleteIconImg, setDeleteIconImg] = useState(deleteIcon);

  const [fileResult, setFileResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const deleteFile = async () => {
    setLoading(true);
    await timeout(1000);
    dispatch(removeFile(props.fileId));
    await timeout(1000);

    setLoading(false);
  };

  const toPersianNumber = (num: number | string) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num
      .toString()
      .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleOpenItem = () => {
    dispatch(setFileSegments(props.segments));
    setFileResult((prev) => !prev);
  };

  const handleDeleteClick = async () => {
    await deleteFile();
  };

  return (
    <>
      {!loading ? (
        !fileResult ? (
          <div
            className={
              props.backGround ? styles.fileItemBackground : styles.fileItem
            }
          >
            <div className={styles.fileName}>
              <button className="buttonStyle" onClick={handleOpenItem}>
                <FileTypeIcon fileType={props.fileLogo}></FileTypeIcon>

                <div
                  className={
                    props.blueText
                      ? styles.fileDescriptionUrl
                      : props.lang === "english"
                      ? styles.fileDescription
                      : styles.fileDescriptionRight
                  }
                >
                  <p style={{ paddingLeft: "1rem" }}>{props.fileDescription}</p>
                </div>
              </button>
            </div>

            <div className={styles.fileDate}>
              <p>{toPersianNumber(props.fileDate)}</p>
            </div>

            <div className={styles.fileType}>
              <p>{props.fileType}</p>
            </div>

            <div className={styles.fileTime}>
              <p>{toPersianNumber(props.fileTime)}</p>
            </div>

            <div className={styles.fileActions}>
              <Tooltip title="۳.۱۸ مگابایت">
                <button className="buttonStyle">
                  <img
                    src={downloadIconImg}
                    alt="Changeable"
                    onMouseOver={() => setDownloadIconImg(downloadIconHover)}
                    onMouseOut={() => setDownloadIconImg(downloadIcon)}
                  />
                </button>
              </Tooltip>
              <button className="buttonStyle">
                <img
                  src={wordIconImg}
                  alt="Changeable"
                  onMouseOver={() => setWordIconImg(wordIconHover)}
                  onMouseOut={() => setWordIconImg(wordIcon)}
                />
              </button>

              <button className="buttonStyle">
                <img
                  src={copyIconImg}
                  alt="Changeable"
                  onMouseOver={() => setCopyIconImg(copyIconHover)}
                  onMouseOut={() => setCopyIconImg(copyIcon)}
                />
              </button>

              <button className="buttonStyle" onClick={handleDeleteClick}>
                <img
                  src={deleteIconImg}
                  alt="Changeable"
                  onMouseOver={() => setDeleteIconImg(deleteIconHover)}
                  onMouseOut={() => setDeleteIconImg(deleteIcon)}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.fileItemSelected}>
            <div className={styles.fileItem}>
              <div className={styles.fileName}>
                <button className="buttonStyle" onClick={handleOpenItem}>
                  <FileTypeIcon fileType={props.fileLogo}></FileTypeIcon>

                  <div
                    className={
                      props.blueText
                        ? styles.fileDescriptionUrl
                        : props.lang === "english"
                        ? styles.fileDescription
                        : styles.fileDescriptionRight
                    }
                  >
                    <p style={{ paddingLeft: "2rem" }}>
                      {props.fileDescription}
                    </p>
                  </div>
                </button>
              </div>

              <div className={styles.fileDate}>
                <p>{props.fileDate}</p>
              </div>

              <div className={styles.fileType}>
                <p>{props.fileType}</p>
              </div>

              <div className={styles.fileTime}>
                <p>{props.fileTime}</p>
              </div>

              <div className={styles.fileActions}>
                <Tooltip title="۳.۱۸ مگابایت">
                  <button className="buttonStyle">
                    <img
                      src={downloadIconImg}
                      alt="Changeable"
                      onMouseOver={() => setDownloadIconImg(downloadIconHover)}
                      onMouseOut={() => setDownloadIconImg(downloadIcon)}
                    />
                  </button>
                </Tooltip>

                <button className="buttonStyle">
                  <img
                    src={wordIconImg}
                    alt="Changeable"
                    onMouseOver={() => setWordIconImg(wordIconHover)}
                    onMouseOut={() => setWordIconImg(wordIcon)}
                  />
                </button>

                <button className="buttonStyle">
                  <img
                    src={copyIconImg}
                    alt="Changeable"
                    onMouseOver={() => setCopyIconImg(copyIconHover)}
                    onMouseOut={() => setCopyIconImg(copyIcon)}
                  />
                </button>

                <button className="buttonStyle" onClick={handleDeleteClick}>
                  <img
                    src={deleteIconImg}
                    alt="Changeable"
                    onMouseOver={() => setDeleteIconImg(deleteIconHover)}
                    onMouseOut={() => setDeleteIconImg(deleteIcon)}
                  />
                </button>
              </div>
            </div>

            <div className={styles.resultBody}>
              <div className={rstyles.resultCard}>
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        )
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          {" "}
          <Progress progressColor="blue"></Progress>{" "}
        </div>
      )}
    </>
  );
};

export default FileItem;
