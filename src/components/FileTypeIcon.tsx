import styles from "./archive.module.css";
import littleChain from "../assets/little chain Icon.png";

import littleUpload from "../assets/little upload Icon.png";

import littleMic from "../assets/little mic Icon.png";

type FileType = "mic" | "upload" | "chain";

interface MyComponentProps {
  fileType: FileType;
}

const FileTypeIcon: React.FC<MyComponentProps> = (props) => {
  switch (props.fileType) {
    case "mic":
      return (
        <>
          <div className={styles.micLogo}>
            <img src={littleMic} alt="littleMic" />
          </div>
        </>
      );
      break;

    case "upload":
      return (
        <>
          <div className={styles.uploadLogo}>
            <img src={littleUpload} alt="littleUpload" />
          </div>
        </>
      );
      break;

    case "chain":
      return (
        <>
          <div className={styles.chainLogo}>
            <img src={littleChain} alt="typeLogo" />
          </div>
        </>
      );
      break;

    default:
      return (
        <>
          <p>no type found</p>
        </>
      );
      break;
  }
};

export default FileTypeIcon;
