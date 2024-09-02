import styles from "./archive.module.css";
import "../App.css";

import { Pagination } from "@mui/material";

import FileItem from "./FileItem";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";

import { useAppSelector } from "./store/store";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#FFFFFF",
            backgroundColor: "#07B49B",
          },
          "&.MuiPaginationItem-root": {
            fontFamily: "IRANSansXFaNum",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "1px",
            textAlign: "center",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          display: "flex",
          justifyContent: "center",
          padding: "0",
          margin: "0",
          alignItems: "end",
        },
      },
    },
  },
});

interface Segment {
  start: string;
  end: string;
  text: string;
}

interface FileData {
  duration: string;
  id: number;
  processed: string;
  segments: Segment[];

  url: string;
}

export default function Archive() {
  const updateFiles = useAppSelector((state) => state.removeFile.files);

  const [fetchFile, setFetchFile] = useState<FileData[]>([]);

  useEffect(() => {
    setFetchFile(updateFiles);
  }, [updateFiles]);

  const [page, setPage] = useState<number>(1);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const formatDuration = (duration: string): string => {
    const parts = duration.split(":");

    let hours = parts.length === 3 ? parts[0] : "";
    let minutes = parts.length === 3 ? parts[1] : parts[0];
    let seconds = parts.length === 3 ? parts[2] : parts[1];

    seconds = seconds.split(".")[0];

    if (hours === "0" || hours === "") {
      if (minutes.startsWith("0")) minutes = minutes[1];
    } else {
      if (minutes.length === 1) minutes = "0" + minutes;
    }
    if (seconds.length === 1) seconds = "0" + seconds;

    if (hours !== "0") {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentFiles = fetchFile.slice(startIndex, endIndex);

  return (
    <>
      <div className={styles.archive}>
        <div className={styles.archiveHead}>
          <p> آرشیو من</p>
        </div>

        {
          <div className={styles.archiveFiles}>
            <div className={styles.fileItems}>
              <div style={{ width: "50%" }}>
                <p className={styles.fileItemsTitle}>نام فایل</p>
              </div>

              <div style={{ width: "10%" }}>
                <p className={styles.fileItemsTitle}>تاریخ بارگذاری</p>
              </div>

              <div style={{ width: "10%" }}>
                <p className={styles.fileItemsTitle}>نوع فایل </p>
              </div>

              <div style={{ width: "10%" }}>
                <p className={styles.fileItemsTitle}>مدت زمان </p>
              </div>
            </div>
            <ul className="ulStyle">
              {currentFiles.map((file, index) => (
                <li key={index}>
                  <FileItem
                    fileDescription={file.url || "No description"}
                    fileDate={file.processed.split("T")[0]}
                    fileType={`.${
                      file.url.split(".")[file.url.split(".").length - 1]
                    }`}
                    fileTime={formatDuration(file.duration)}
                    fileLogo={
                      file.url.split(".")[file.url.split(".").length - 1] ===
                      "mp3"
                        ? "chain"
                        : file.url.split(".")[
                            file.url.split(".").length - 1
                          ] === "mp4"
                        ? "upload"
                        : "mic"
                    }
                    blueText={true}
                    backGround={(index + 1) % 2 === 0 ? true : false}
                    lang={"english"}
                    fileId={file.id}
                    segments={file.segments}
                  ></FileItem>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
      <div className={styles.pagination}>
        <ThemeProvider theme={theme}>
          <Pagination
            count={Math.ceil(fetchFile.length / itemsPerPage)}
            defaultPage={1}
            siblingCount={1}
            boundaryCount={1}
            page={page}
            onChange={(_blank, value) => handlePageChange(value)}
          ></Pagination>
        </ThemeProvider>
      </div>
    </>
  );
}
