import styles from "./archive.module.css";
import "../App.css";

import { Pagination } from "@mui/material";

// import axios from "axios";



import FileItem from "./FileItem";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";

import { useAppSelector } from "./store/store";

// import { useFileFetch } from "./FileFetchContext";
import Progress from "./Progress";
// import React from "react";
// import { setDeleteStatus } from "./store/slices/DeleteStatus";

const theme = createTheme({
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#FFFFFF", // Text color of the selected page
            backgroundColor: "#07B49B", // Background color of the selected page
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
          justifyContent: "center", // Center align pagination items
          padding: "0", // Remove default padding
          margin: "0", // Remove default margin
          alignItems: "end",

          // bottom:'0'
        },
      },
    },
  },
});

// type FileType = "mic" | "upload" | "chain";

// type Language = "persian" | "english";



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
  length: number;
  url: string;
}

export default function Archive() {

// const dispatch = useAppDispatch()

const deleteLoading = useAppSelector( (state) => state.deleteStatus.status)

  const [ fetchFile, setFetchFile ] = useState<FileData[]>([]);

  // const [deleteFromChild, setDeleteFromChild] = useState<boolean>(false);

  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(false);

  // const [fetchToggle, setFetchToggle] = useState(false);
  // const [firstLoading ]

  const url = "/api/requests/";
  // const baseURL = import.meta.env.VITE_API_BASE_URL;
// const endpoint = '/requests/';
// const url = `${baseURL}${endpoint}`;
  const token = "a85d08400c622b50b18b61e239b9903645297196";

  useEffect(() => {

    
    const fetchRequest = async (fetchUrl : string) => {
      console.log ("base url",url )

      setFirstLoading(true)

      
      try {
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            // 'Access-Control-Allow-Origin': '*',
          },
        });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // setFetchFile(data.results);

      
       setFetchFile(prevFiles => {
        const newFiles = data.results.filter((newFile: FileData)  => !prevFiles.some(prevFile => prevFile.id === newFile.id));
        return [...prevFiles, ...newFiles];
      });

        if (data.next){
          const nextUrlParts = data.next.split('/');
          const relativePath = '/' + nextUrlParts.slice(3).join('/');
          fetchRequest(relativePath)
        }
        console.log("Response data:", data.results);
        setFirstLoading(false)
        // setDeleteLoading(false);
        // dispatch(setDeleteStatus(false))
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the function

    setFetchFile([])
    fetchRequest(url);

    // setDeleteFromChild(false);s
   console.log("load" , firstLoading)
   
  }, [deleteLoading]);

  // console.log(' data:',fetchFile[0].url );

  const [page, setPage] = useState<number>(1);

  // const[openItem, setopenItem] = useState<number | null>(null);

  // Total number of pages (could be dynamic based on data)
  // const totalPages: number = 10;
  // const lastPageSel : number = 1 ;
  // Handler for page change event

  // const handleOpenItem  =(index:number) =>{
  //     if (index === openItem){
  //         setopenItem(null);
  //     }else{
  //       setopenItem(index)
  //     }
  // }

  const handlePageChange = (
    // event: React.ChangeEvent<unknown>,
    // event: React.ChangeEvent<unknown> ,
    value: number
  ) => {
    setPage(value);
    // event.type
    // Fetch new data based on the new page, if necessary
  };

  const formatDuration = (duration: string): string => {
    // Split the duration into parts based on colons
    const parts = duration.split(":");

    // Extract hours, minutes, and seconds
    let hours = parts.length === 3 ? parts[0] : ""; // Hours are present if there are 3 parts
    let minutes = parts.length === 3 ? parts[1] : parts[0]; // If 3 parts, minutes are in the second slot
    let seconds = parts.length === 3 ? parts[2] : parts[1]; // If 3 parts, seconds are in the third slot

    // Remove milliseconds from seconds
    seconds = seconds.split(".")[0];

    // Ensure minutes and seconds are two digits long
    if (hours === "0" || hours === "") {
      if (minutes.startsWith("0")) minutes = minutes[1];
    } else {
      if (minutes.length === 1) minutes = "0" + minutes;
    }
    if (seconds.length === 1) seconds = "0" + seconds;

    // Combine hours (if present), minutes, and seconds
    if (hours !== "0") {
      return `${hours}:${minutes}:${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to get only the items for the current page
  const currentFiles = fetchFile.slice(startIndex, endIndex);


  // const handleFileDeleted = (entry :boolean) => {
  //   // Toggle fetchToggle to trigger re-fetch
  //   // setDeleteLoading(true);
  // };


  return (
    <>
      <div className={styles.archive}>
        <div className={styles.archiveHead}>
          <p> آرشیو من</p>
        </div>

        {!firstLoading  && !deleteLoading ? (<div className={styles.archiveFiles}>
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
                {/* <button className="buttonStyle"   onClick={() => handleOpenItem(startIndex + index)}> */}
                <FileItem
                  fileDescription={file.url || "No description"}
                  fileDate={file.processed.split("T")[0]}
                  fileType={`.${
                    file.url.split(".")[file.url.split(".").length - 1]
                  }`}
                  fileTime={formatDuration(file.duration)}
                  fileLogo={file.url.split(".")[file.url.split(".").length - 1] === 'mp3' ? 'chain':( file.url.split(".")[file.url.split(".").length - 1] === 'mp4' ? 'upload' : 'mic')}
                  // fileResult={ false}
                  blueText={true}
                  backGround={(index + 1) % 2 === 0 ? true : false}
                  lang={"english"}
                  fileId={file.id}
                  segments={file.segments}

                ></FileItem>

                {/* </button> */}
              </li>
            ))}
          </ul>
        </div>) : <Progress progressColor="blue"></Progress>}
      </div>
      <div className={styles.pagination}>
        <ThemeProvider theme={theme}>
          <Pagination
            count={Math.ceil(fetchFile.length / itemsPerPage)}
            defaultPage={1}
            siblingCount={1}
            boundaryCount={1}
            page={page}
            onChange={(_blank, value) => handlePageChange( value)}
            // color="primary"
            // color=""
          ></Pagination>
          {/* 
        <p>{page}</p> */}
        </ThemeProvider>
        {/* <PaginationItem MuiPaginationItem-icon = {styles.a} disabled ></PaginationItem> */}
      </div> 
    </>
  );
}
