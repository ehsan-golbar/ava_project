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
// import Progress from "./Progress";
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
  // length: number;
  url: string;
}


export default function Archive() {
  // const dispatch = useAppDispatch()

  // const deleteLoading = useAppSelector((state) => state.deleteStatus.status);
  const updateFiles = useAppSelector((state) => state.removeFile.files);

  const [fetchFile, setFetchFile] = useState<FileData[]>([]);

  // const [deleteFromChild, setDeleteFromChild] = useState<boolean>(false);

  // const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  // const [firstLoading, setFirstLoading] = useState<boolean>(false);

  // const [fetchToggle, setFetchToggle] = useState(false);
  // const [firstLoading ]

  // const url = "/api/requests/";
  // const baseURL = import.meta.env.VITE_API_BASE_URL;
  // const endpoint = '/requests/';
  // const url = `${baseURL}${endpoint}`;
  // const token = "a85d08400c622b50b18b61e239b9903645297196";

  useEffect(() => {
    //   const fetchRequest = async (fetchUrl : string) => {
    //     console.log ("base url",url )

        // setFirstLoading(true)

    //     try {
    //       const response = await fetch(fetchUrl, {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Token ${token}`,
    //           // 'Access-Control-Allow-Origin': '*',
    //         },
    //       });

    //     console.log("Response status:", response.status);
    //     console.log("Response headers:", response.headers);

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     // setFetchFile(data.results);

    //      setFetchFile(prevFiles => {
    //       const newFiles = data.results.filter((newFile: FileData)  => !prevFiles.some(prevFile => prevFile.id === newFile.id));
    //       return [...prevFiles, ...newFiles];
    //     });

    //       if (data.next){
    //         const nextUrlParts = data.next.split('/');
    //         const relativePath = '/' + nextUrlParts.slice(3).join('/');
    //         fetchRequest(relativePath)
    //       }
    //       console.log("Response data:", data.results);
    //       setFirstLoading(false)
    //       // setDeleteLoading(false);
    //       // dispatch(setDeleteStatus(false))

    //       setFetchFile(results);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };

    //   // Call the function

    //   setFetchFile([])
    //   fetchRequest(url);

    //   // setDeleteFromChild(false);s
    //  console.log("load" , firstLoading)

    setFetchFile(updateFiles);
  }, [updateFiles]);

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

        { (
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
                  {/* <button className="buttonStyle"   onClick={() => handleOpenItem(startIndex + index)}> */}
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
          </div>
        ) }
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


// const results: FileData[] = [
//   {
//     id: 2729,
//     url: "https://s-v4.tamasha.com/statics/videos_download/cf/7f/jzgWN_cf7ffa2fbdcc04590d3cd449e5b7e2382be65d6c_n_240.mp4",
//     duration: "0:01:8.000",
//     processed: "2024-08-03T20:17:11.046534Z",
//     segments: [
//       {
//         start: "0:00:0.150",
//         end: "0:00:7.980",
//         text: "رحمان الرحیم سلام عرض می کنم خدا قوت میگم به مهندس احمدی آذر",
//       },
//       {
//         start: "0:00:8.250",
//         end: "0:00:11.820",
//         text: "تا الان در خدمت تیم بودن به عنوان سرپرست و",
//       },
//       {
//         start: "0:00:11.910",
//         end: "0:00:17.940",
//         text: "به دلایل مشکلات شخصی نتونستن تیم و همراهی بکنند و من در خدمت تیم هستم",
//       },
//       {
//         start: "0:00:18.420",
//         end: "0:00:22.530",
//         text: "الحمدلله رب العالمین شرایط تیم شرایط خوبی هست و",
//       },
//       {
//         start: "0:00:23.130",
//         end: "0:00:26.250",
//         text: "تا الان هم ما سه تا بازی تدارکاتی داشتیم",
//       },
//       {
//         start: "0:00:26.820",
//         end: "0:00:34.800",
//         text: "انشالله صبح یک تمرین توپی و وزنه و بعد از ظهر هم یه بازی تدارکاتی دیگه با تیم استرالیا انجام می دهد",
//       },
//       {
//         start: "0:00:34.800",
//         end: "0:00:37.860",
//         text: "هرچی بتونیم بازی بیشتری انجام بدیم قطعا",
//       },
//       {
//         start: "0:00:37.920",
//         end: "0:00:41.160",
//         text: "هماهنگی تیم بهتر خواهد شد و",
//       },
//       {
//         start: "0:00:41.190",
//         end: "0:00:43.860",
//         text: "انشالله با یک رو",
//       },
//       {
//         start: "0:00:43.920",
//         end: "0:00:51.900",
//         text: "بالاتری به مسابقات پایین میذاریم از مردم عزیزم می خوام که تیم ملی جوانان تمام تیمامون رو دعا کن",
//       },
//       {
//         start: "0:00:51.900",
//         end: "0:00:55.500",
//         text: "و انشالله بتونیم با دست پر از اینجا",
//       },
//       {
//         start: "0:00:56.040",
//         end: "0:01:1.710",
//         text: "از اندونزی خارج بشیم شرایط تیم به الحمدلله شرایط بسیار خوبی هست و",
//       },
//       {
//         start: "0:01:1.920",
//         end: "0:01:8.010",
//         text: "صدای موسیقی",
//       },
//     ],
//   },
//   {
//     id: 2716,
//     url: "https://ups.music-fa.com//tagdl/1402/Jamal%20Mobarez%20-%20Delbari%20(320).mp3",
//     duration: "0:03:27.000",
//     processed: "2024-08-03T13:38:08.924384Z",
//     segments: [
//       {
//         start: "0:00:0.000",
//         end: "0:00:3.540",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:3.540",
//         end: "0:00:7.620",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:7.620",
//         end: "0:00:10.740",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:10.740",
//         end: "0:00:14.910",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:14.910",
//         end: "0:00:20.130",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:20.130",
//         end: "0:00:25.860",
//         text: "عشق به جورای توکو یه قندکی نگو تو",
//       },
//       {
//         start: "0:00:25.860",
//         end: "0:00:30.030",
//         text: "بدون تو معناقو نباشی زیر یه خاکو",
//       },
//       {
//         start: "0:00:30.030",
//         end: "0:00:36.570",
//         text: "قندول نازنین هر شب می آیی بر خواب یک هفته نبینومته",
//       },
//       {
//         start: "0:00:36.570",
//         end: "0:00:40.710",
//         text: "پژمرده و خراب بود لبخند زباله",
//       },
//       {
//         start: "0:00:40.770",
//         end: "0:00:46.980",
//         text: "صداهای نفوسای در قلبو نمیگیره هیچ کسی دیگر جای",
//       },
//       {
//         start: "0:00:47.010",
//         end: "0:00:49.080",
//         text: "بیا با ما یک جا شو",
//       },
//       {
//         start: "0:00:49.110",
//         end: "0:00:57.090",
//         text: "بساز و از دنیای مقبول ناز و ککه نه به مانون تنهایت عشق بیشتر مشه هر روز",
//       },
//       {
//         start: "0:00:57.090",
//         end: "0:01:1.620",
//         text: "ولی اول دادلم کم حالا کاملا عاشقت شده",
//       },
//       {
//         start: "0:01:1.620",
//         end: "0:01:7.860",
//         text: "بدتر از فرهاد و مجنه جستجو کدوم دنیا را اما مثل تو کسی نبود",
//       },
//       {
//         start: "0:01:7.860",
//         end: "0:01:13.590",
//         text: "همدم و رفیقم باشی کل دنیا را دارم با خور عشق یعنی تو",
//       },
//       {
//         start: "0:01:13.650",
//         end: "0:01:21.630",
//         text: "یعنی چشم و ابرو یعنی دلتنگ مشو دلتنگ دیدن رو عشق یعنی تو",
//       },
//       {
//         start: "0:01:21.630",
//         end: "0:01:29.610",
//         text: "دوگ دوگ قلبو از من باشین دور تو باشین در پهلو",
//       },
//       {
//         start: "0:01:29.610",
//         end: "0:01:32.910",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:32.940",
//         end: "0:01:38.400",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:38.400",
//         end: "0:01:42.060",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:42.060",
//         end: "0:01:48.300",
//         text: "صدای موزیک",
//       },
//       {
//         start: "0:01:48.300",
//         end: "0:01:51.720",
//         text: "روشی در بر من در بر همچفتو چسبیده",
//       },
//       {
//         start: "0:01:51.720",
//         end: "0:01:55.860",
//         text: "کاش به تنبسه صدای نفس هم باشی باشه بلند می اوزی",
//       },
//       {
//         start: "0:01:55.860",
//         end: "0:02:2.130",
//         text: "باشیم سوار لیموزین مشا تو ملکه م باشی هر دو ما تنها باشیم",
//       },
//       {
//         start: "0:02:2.130",
//         end: "0:02:8.370",
//         text: "تو در بغل مابی لبخند بزنی از خوشی عکس فیلم بگیریم و سلفی",
//       },
//       {
//         start: "0:02:8.430",
//         end: "0:02:10.470",
//         text: "خانم دهنستا استوری",
//       },
//       {
//         start: "0:02:10.470",
//         end: "0:02:18.450",
//         text: "بریم چکر بکنیم گردش دور دنیا رما بگردم بریم رستوران بتم فرمایش یکان کلاس جوس یکان هیسکریم",
//       },
//       {
//         start: "0:02:18.450",
//         end: "0:02:21.240",
//         text: "تو باشی پس نباش شکست عزیزم",
//       },
//       {
//         start: "0:02:21.270",
//         end: "0:02:29.250",
//         text: "من از تو می گیرم نفس اگه نباشی تو کنار من فکر می کنم که از تو مدق قفس دلم جمع نیست غمگی نبوغ",
//       },
//       {
//         start: "0:02:29.250",
//         end: "0:02:31.350",
//         text: "غصه بدل من میشینه",
//       },
//       {
//         start: "0:02:31.350",
//         end: "0:02:39.330",
//         text: "دل دوانه میخوای که یارم بیاد پشت و بشینم چطور کن و مکت دل مال دل بستیم و تو گل",
//       },
//       {
//         start: "0:02:39.330",
//         end: "0:02:44.730",
//         text: "شکر شیرینی از سلمه به تو کم شاشو سلمه کم لندی",
//       },
//       {
//         start: "0:02:44.790",
//         end: "0:02:52.770",
//         text: "دو دلمری به تو رفیق دقایق زقمه عاشق شاعر تو شقایق غم دمی شفیع زیر مرا لایح",
//       },
//       {
//         start: "0:02:52.770",
//         end: "0:02:59.520",
//         text: "دلم می بری برم از بای مثل پری افسون گری جادوگری ازم از بای",
//       },
//       {
//         start: "0:02:59.550",
//         end: "0:03:6.780",
//         text: "دلتنگت می شه",
//       },
//       {
//         start: "0:03:6.810",
//         end: "0:03:10.980",
//         text: "دل تنگ دیدن رو عشق یعنی تو",
//       },
//       {
//         start: "0:03:10.980",
//         end: "0:03:18.690",
//         text: "توک توک قلبم از من باشید تو باشید پهلو",
//       },
//       {
//         start: "0:03:18.720",
//         end: "0:03:26.340",
//         text: "موسیقی متن",
//       },
//     ],
//   },
//   {
//     id: 2715,
//     url: "https://dls.music-fa.com/song/alibz/1403/Soheil%20Mehrzadegan%20-%20Majnounetam%20Guitar%20Version%20(320).mp3",
//     duration: "0:03:26.000",
//     processed: "2024-08-03T09:47:37.784523Z",
//     segments: [
//       {
//         start: "0:00:1.920",
//         end: "0:00:8.580",
//         text: "سهیل بهرزاده کن",
//       },
//       {
//         start: "0:00:8.760",
//         end: "0:00:12.900",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:13.080",
//         end: "0:00:17.250",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:17.460",
//         end: "0:00:21.600",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:21.780",
//         end: "0:00:26.040",
//         text: "فرسان بارون بگیره",
//       },
//       {
//         start: "0:00:26.040",
//         end: "0:00:34.020",
//         text: "من زیر چتر تو باشم اسم ما رو بگی به",
//       },
//       {
//         start: "0:00:34.020",
//         end: "0:00:42.000",
//         text: "آخرین حرف تو باشم فرسی کنار دریا",
//       },
//       {
//         start: "0:00:42.000",
//         end: "0:00:49.980",
//         text: "خندی به دنیا",
//       },
//       {
//         start: "0:00:49.980",
//         end: "0:00:55.470",
//         text: "یا میگم هیسی می خودشون بخنده",
//       },
//       {
//         start: "0:00:56.520",
//         end: "0:01:4.500",
//         text: "من مجدونه تمدن لیلیه باش دنیا کیه دلم میشه کیه",
//       },
//       {
//         start: "0:01:4.500",
//         end: "0:01:12.480",
//         text: "یکی مثل من شده پیگیر تو یکی مثل من بهت خیر",
//       },
//       {
//         start: "0:01:12.480",
//         end: "0:01:20.460",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:20.460",
//         end: "0:01:28.440",
//         text: "یکی مثل من شده پیگیره تو یکی مثل",
//       },
//       {
//         start: "0:01:28.440",
//         end: "0:01:36.420",
//         text: "بهت خیلی نیام",
//       },
//       {
//         start: "0:01:36.420",
//         end: "0:01:44.400",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:44.400",
//         end: "0:01:52.380",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:52.380",
//         end: "0:02:0.360",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:02:0.360",
//         end: "0:02:7.410",
//         text: "موسیقی متن",
//       },
//       {
//         start: "0:02:8.040",
//         end: "0:02:11.550",
//         text: "شب چشمات شبمه یه تو باشی بس",
//       },
//       {
//         start: "0:02:11.550",
//         end: "0:02:19.530",
//         text: "شوخی می کنم بخن بگو",
//       },
//       {
//         start: "0:02:19.530",
//         end: "0:02:27.300",
//         text: "دیوونه به من چون میگن دیوونه ها از یاد نمیرن",
//       },
//       {
//         start: "0:02:28.410",
//         end: "0:02:36.390",
//         text: "مجنون تن تو لیلی بود دنیا کیرد در",
//       },
//       {
//         start: "0:02:36.390",
//         end: "0:02:44.370",
//         text: "یکی به سرم شده گیر تو یکی به سرم بهت خیر",
//       },
//       {
//         start: "0:02:44.370",
//         end: "0:02:52.350",
//         text: "با نذرتم قال لیوا تو دنیا کیه دلم می شه",
//       },
//       {
//         start: "0:02:52.350",
//         end: "0:03:0.330",
//         text: "یکی مسن شده پیگیره تو یکی مسن",
//       },
//       {
//         start: "0:03:0.330",
//         end: "0:03:8.310",
//         text: "بهت خیلی نیاز دارم",
//       },
//       {
//         start: "0:03:8.310",
//         end: "0:03:11.700",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:12.030",
//         end: "0:03:16.080",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:16.320",
//         end: "0:03:20.520",
//         text: "صدای موسیقی",
//       },
//     ],
//   },
//   {
//     id: 2712,
//     url: "https://dls.music-fa.com/tagdl/99/Ali%20Yasini%20-%20Cheraghooni%20(128).mp3",
//     duration: "0:02:15.000",
//     processed: "2024-08-02T08:55:51.366008Z",
//     segments: [
//       {
//         start: "0:00:0.840",
//         end: "0:00:9.510",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:10.440",
//         end: "0:00:16.170",
//         text: "گفته بودم بری زندگی",
//       },
//       {
//         start: "0:00:16.170",
//         end: "0:00:18.960",
//         text: "نمی کنم یه روزم",
//       },
//       {
//         start: "0:00:19.440",
//         end: "0:00:27.420",
//         text: "گفته بودم بد تو می میرم و زنده ام هنوزم ولی زخم",
//       },
//       {
//         start: "0:00:27.420",
//         end: "0:00:31.260",
//         text: "هی هست بدتر مرگ",
//       },
//       {
//         start: "0:00:31.740",
//         end: "0:00:37.890",
//         text: "بد شدی بد نبودم با یه دفعه که",
//       },
//       {
//         start: "0:00:38.700",
//         end: "0:00:43.950",
//         text: "تو کجایی الان ببین دنبال تو چه جوری می گردم",
//       },
//       {
//         start: "0:00:44.010",
//         end: "0:00:51.990",
//         text: "بودی شهر رو چراغونی می کردم من تو رو زندونی می کردم که نری فقط",
//       },
//       {
//         start: "0:00:51.990",
//         end: "0:00:59.970",
//         text: "تو کجایی الان ببین دنبال تو چه جوری می گردم بودی شهر و چراغونی می کردم",
//       },
//       {
//         start: "0:00:59.970",
//         end: "0:01:4.710",
//         text: "من تو رو زندونی می کردم که نری فقط",
//       },
//       {
//         start: "0:01:5.160",
//         end: "0:01:11.460",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:11.970",
//         end: "0:01:18.780",
//         text: "تو کجایی",
//       },
//       {
//         start: "0:01:19.350",
//         end: "0:01:22.200",
//         text: "تونی من آذرم بمیرم برات",
//       },
//       {
//         start: "0:01:22.200",
//         end: "0:01:30.180",
//         text: "تو غرق کنی من گل بگیرم برات من هر کاری می کنم فقط شکل خنده بگیرن لبات و",
//       },
//       {
//         start: "0:01:30.180",
//         end: "0:01:33.540",
//         text: "ولی تو گفتی برو تنام بزار و گفتی",
//       },
//       {
//         start: "0:01:33.600",
//         end: "0:01:36.660",
//         text: "آدم گوش کن فقط دم این یه بار رو",
//       },
//       {
//         start: "0:01:36.870",
//         end: "0:01:39.750",
//         text: "یه بغزاره میده گلوم و فشار رو دو",
//       },
//       {
//         start: "0:01:39.780",
//         end: "0:01:47.760",
//         text: "تو وا کن گردنم ترا بذار تو کوچه ای الان ببین دنبال تو چه جوری می گردم",
//       },
//       {
//         start: "0:01:47.760",
//         end: "0:01:51.240",
//         text: "بودی شهر رو چراغونی می کردم",
//       },
//       {
//         start: "0:01:51.300",
//         end: "0:01:58.410",
//         text: "من تو رو زندونی می کردم که نری فقط تو کجایی الان ببین دم",
//       },
//       {
//         start: "0:01:58.410",
//         end: "0:02:4.050",
//         text: "مال تو چه جوری می گردم بودی شهر و چراغونی می کردم",
//       },
//       {
//         start: "0:02:4.050",
//         end: "0:02:8.640",
//         text: "من تو رو زندونی می کردم که نری فقط",
//       },
//     ],
//   },
//   {
//     id: 2609,
//     url: "https://dls.music-fa.com/song/alibz/1403/Hossein%20Rezaei%20-%20Mardio%20Mardanegi%20(320).mp3",
//     duration: "0:08:2.000",
//     processed: "2024-08-01T18:27:02.413832Z",
//     segments: [
//       {
//         start: "0:00:0.210",
//         end: "0:00:4.950",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:5.250",
//         end: "0:00:9.510",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:9.540",
//         end: "0:00:13.080",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:13.710",
//         end: "0:00:17.760",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:19.050",
//         end: "0:00:27.030",
//         text: "مردی و مردانگی دورانی داشته دادا",
//       },
//       {
//         start: "0:00:27.030",
//         end: "0:00:29.220",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:29.310",
//         end: "0:00:37.290",
//         text: "ناموز پرستیا رفیق دورانی داشته دادابا",
//       },
//       {
//         start: "0:00:37.290",
//         end: "0:00:38.880",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:39.120",
//         end: "0:00:47.100",
//         text: "زندونی و آبسبدی دوران داشتی دادا یلبازی و",
//       },
//       {
//         start: "0:00:47.100",
//         end: "0:00:50.430",
//         text: "چاقو کشیدی",
//       },
//       {
//         start: "0:00:50.520",
//         end: "0:00:58.020",
//         text: "فایده نداره ندادم خط بکشی این",
//       },
//       {
//         start: "0:00:58.110",
//         end: "0:01:6.060",
//         text: "دادو خط غرمه خلاف نکم بر",
//       },
//       {
//         start: "0:01:6.570",
//         end: "0:01:11.670",
//         text: "شانه داد و خر کرد",
//       },
//       {
//         start: "0:01:12.300",
//         end: "0:01:20.280",
//         text: "مرددی و مردانی که هم دورانیداشته داداو ناموز فرستی یا دورانیداشته",
//       },
//       {
//         start: "0:01:20.280",
//         end: "0:01:28.260",
//         text: "زندانی و افسرده دوران داشته دادو یلبازی و چاقو کشید دوران",
//       },
//       {
//         start: "0:01:28.260",
//         end: "0:01:36.240",
//         text: "با صدای حسین رضایی",
//       },
//       {
//         start: "0:01:36.240",
//         end: "0:01:44.220",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:44.220",
//         end: "0:01:52.200",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:52.200",
//         end: "0:02:0.180",
//         text: "مردی و مردانگی هم دوره ای داشته دادام هموس پرستیا رفتم",
//       },
//       {
//         start: "0:02:0.180",
//         end: "0:02:8.160",
//         text: "دورانی داشته دادار زندونی و ابراز بد دورانی داشته دادار ین بازی و چنگ",
//       },
//       {
//         start: "0:02:8.160",
//         end: "0:02:16.140",
//         text: "آقا کیف کشید اورانی داشته داد با گشت اون روزکمر به خاطرش شناموس",
//       },
//       {
//         start: "0:02:16.140",
//         end: "0:02:24.120",
//         text: "عبقده داداش زندگیش بی نام بود صداقت اون مردانه که فایده نداره نداده",
//       },
//       {
//         start: "0:02:24.120",
//         end: "0:02:32.100",
//         text: "بیملا قاطی و این قاعده نداد نداد خط بکشینه داد خط گرم",
//       },
//       {
//         start: "0:02:32.100",
//         end: "0:02:40.080",
//         text: "خلاف نکنه دونید آدا غرق خط بکشیمه دادو خطی گرم است خلاف نکنه",
//       },
//       {
//         start: "0:02:40.080",
//         end: "0:02:48.060",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:02:48.060",
//         end: "0:02:56.040",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:02:56.040",
//         end: "0:03:4.020",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:4.020",
//         end: "0:03:12.000",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:12.000",
//         end: "0:03:19.980",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:19.980",
//         end: "0:03:27.960",
//         text: "از روزی که مرد بیام و بیام",
//       },
//       {
//         start: "0:03:27.960",
//         end: "0:03:35.940",
//         text: "مردی و مردانی",
//       },
//       {
//         start: "0:03:35.940",
//         end: "0:03:43.920",
//         text: "یتیم افسانه ی یه دادو زندونی و از بدی فایده ندارم ندادم زندونی",
//       },
//       {
//         start: "0:03:43.920",
//         end: "0:03:51.900",
//         text: "اشناسی من مردیده که به خاطرش شنامو",
//       },
//       {
//         start: "0:03:51.900",
//         end: "0:03:59.880",
//         text: "دعوت به این داداش جوانیش به یه نابود پهلوونی به پونیه به خانه قد و پا",
//       },
//       {
//         start: "0:03:59.880",
//         end: "0:04:7.860",
//         text: "هرگز به ناموس کسی دادانکن خیانت هرگز به ناموس کسی دادانکن",
//       },
//       {
//         start: "0:04:7.860",
//         end: "0:04:15.840",
//         text: "خیانت خط بکشیم داد و خط گرمه خلاف نکنم جان داد و غرق",
//       },
//       {
//         start: "0:04:15.840",
//         end: "0:04:23.820",
//         text: "بدبخت به شیمه دادو خط غریمه خلاف نکن به جان دادو خرگه",
//       },
//       {
//         start: "0:04:23.820",
//         end: "0:04:31.800",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:04:31.800",
//         end: "0:04:39.780",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:04:39.780",
//         end: "0:04:47.760",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:04:47.760",
//         end: "0:04:55.740",
//         text: "مواردی کم دادا مواردی کم مدادا و بخل با مردید من حال و وقت",
//       },
//       {
//         start: "0:04:55.740",
//         end: "0:05:3.720",
//         text: "چه سالی میره ملان قربان میره من معرفی کم بداد آبخرب و مردیر من",
//       },
//       {
//         start: "0:05:3.720",
//         end: "0:05:11.700",
//         text: "تالار بچه سالی میر مران قربانی رمن معرفی کم دادارنجر مردی",
//       },
//       {
//         start: "0:05:11.700",
//         end: "0:05:19.680",
//         text: "من با آن بچه به پروان بچه ی سنی من معرفی کم مداد و طبیعیت",
//       },
//       {
//         start: "0:05:19.680",
//         end: "0:05:27.660",
//         text: "ای مردیم من ای با وجود و فقلم و مهران قربانی ام",
//       },
//       {
//         start: "0:05:27.660",
//         end: "0:05:35.640",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:05:35.640",
//         end: "0:05:43.620",
//         text: "موسیقی آزادی ام و مهران گل",
//       },
//       {
//         start: "0:05:43.620",
//         end: "0:05:51.600",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:05:51.600",
//         end: "0:05:59.580",
//         text: "از بین با بند و زندان خسته از این تبیدی و درد غریبه سامان خسته از این",
//       },
//       {
//         start: "0:05:59.580",
//         end: "0:06:7.560",
//         text: "زندگیم میگه جان رفیقم سینه پر از سرپایه از دنیا از این",
//       },
//       {
//         start: "0:06:7.560",
//         end: "0:06:15.540",
//         text: "بیم دیگه از مینه با بند و زندون خسته از این تبیدی و درد غریبه سامون",
//       },
//       {
//         start: "0:06:15.540",
//         end: "0:06:23.520",
//         text: "خسته از این زندگیم یه جان رفيقم سینه پر از درد و یه از دنیا",
//       },
//       {
//         start: "0:06:23.520",
//         end: "0:06:31.500",
//         text: "یلبازی و چاپکشی فایله ندار ندادو زندونی و طبیعیه فایله",
//       },
//       {
//         start: "0:06:31.500",
//         end: "0:06:39.480",
//         text: "یلبازی و شکوفکشی دورانی داشته دادا ناموس پرست میارن",
//       },
//       {
//         start: "0:06:39.480",
//         end: "0:06:47.460",
//         text: "فایده نداره دادا ناموس فر از بیادم دورانی داشته دادا",
//       },
//       {
//         start: "0:06:47.460",
//         end: "0:06:55.440",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:06:55.440",
//         end: "0:07:3.420",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:07:3.420",
//         end: "0:07:11.400",
//         text: "موسیقی متن",
//       },
//       {
//         start: "0:07:11.400",
//         end: "0:07:19.380",
//         text: "کمه پلو مردی سالار و چه باب جوست اینا صادقی",
//       },
//       {
//         start: "0:07:19.380",
//         end: "0:07:27.360",
//         text: "معرفی کم من علبو مردی سالار بچم با جوست اینا صادقی",
//       },
//       {
//         start: "0:07:27.360",
//         end: "0:07:35.340",
//         text: "بدن ساز بر نبرد رنج نمردی بچه رابند بچه ی سعد",
//       },
//       {
//         start: "0:07:35.340",
//         end: "0:07:43.320",
//         text: "بچه ی رابن بچه ی صابی",
//       },
//       {
//         start: "0:07:43.320",
//         end: "0:07:51.300",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:07:51.300",
//         end: "0:08:0.030",
//         text: "موسیقی متن",
//       },
//     ],
//   },
//   {
//     id: 2640,
//     url: "https://ups.music-fa.com/tagdl/6e41/Shervin%20-%20Cheshmato%20Beband%20(320).mp3",
//     duration: "0:03:14.000",
//     processed: "2024-08-01T18:23:00.183387Z",
//     segments: [
//       {
//         start: "0:00:3.060",
//         end: "0:00:6.390",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:6.510",
//         end: "0:00:11.160",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:13.260",
//         end: "0:00:18.420",
//         text: "برو نمی کنم هیچ وقت تلافی گرفته گریت برا چی",
//       },
//       {
//         start: "0:00:19.320",
//         end: "0:00:27.300",
//         text: "تعارف نداریم اون آقا زاد دست و من سرباز فراری به بی لش نکن دنیا هم اینه بعضی وقتا ردیف بعضی",
//       },
//       {
//         start: "0:00:27.300",
//         end: "0:00:30.990",
//         text: "کثیفه برو برسی برویات یه روز",
//       },
//       {
//         start: "0:00:30.990",
//         end: "0:00:38.970",
//         text: "دری من خودم میرم و پیشه دنیایی شبیه فیلم و کلیشه بهم نگو پس اون قولا چی میشه",
//       },
//       {
//         start: "0:00:38.970",
//         end: "0:00:46.950",
//         text: "برام نفرستی شاید بهشت و ای بهشت و هیچکی ندیده دستشو بگیر و نم پس نده",
//       },
//       {
//         start: "0:00:46.950",
//         end: "0:00:54.810",
//         text: "یهو شکی بهم تکس نده اگه دلت تنگ شد برام چشادو ببند و فرض کن منه",
//       },
//       {
//         start: "0:00:55.140",
//         end: "0:01:3.120",
//         text: "چشماتو ببند کنار تمنوس چشماتو ببند",
//       },
//       {
//         start: "0:01:3.120",
//         end: "0:01:11.100",
//         text: "بس کن من پیش دم چشمام",
//       },
//       {
//         start: "0:01:11.100",
//         end: "0:01:19.080",
//         text: "با شعرمو بخون",
//       },
//       {
//         start: "0:01:19.080",
//         end: "0:01:22.140",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:22.650",
//         end: "0:01:30.990",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:01:31.320",
//         end: "0:01:38.490",
//         text: "برو ات جمع و پاک کنش از تنت پی",
//       },
//       {
//         start: "0:01:38.700",
//         end: "0:01:43.350",
//         text: "تنها را رفتن به من همه زورم و زدم و زورم",
//       },
//       {
//         start: "0:01:43.380",
//         end: "0:01:51.360",
//         text: "دورم من دنیا کمتر بیم با نمود کنه سی نداری به با نمود کن که خوشحالی بشه",
//       },
//       {
//         start: "0:01:51.360",
//         end: "0:01:59.340",
//         text: "اگه کلی خاطره داری با هر آهنگی که تو ماشینش میذاری من می میرم کف تهران نصرت",
//       },
//       {
//         start: "0:01:59.340",
//         end: "0:02:6.630",
//         text: "یه چی بام میمونه چشمان یاد گرفتم بگذرم بعد تو از سرکی هرهتی یه وقتی بهم داد",
//       },
//       {
//         start: "0:02:7.440",
//         end: "0:02:11.730",
//         text: "دارم یادت بره آدم یه بار میشه عاشق بشه",
//       },
//       {
//         start: "0:02:12.480",
//         end: "0:02:17.130",
//         text: "من میگم نمی شناسمش تو هم بهش نگو چرا موی بچه اش بره",
//       },
//       {
//         start: "0:02:20.310",
//         end: "0:02:28.290",
//         text: "چشماتو ببند کنار تمنوس چشماتو ببند",
//       },
//       {
//         start: "0:02:28.290",
//         end: "0:02:36.270",
//         text: "بس کن من پیش دم چشمانم",
//       },
//       {
//         start: "0:02:36.270",
//         end: "0:02:44.250",
//         text: "تو ببند با شیرمو بخور",
//       },
//       {
//         start: "0:02:44.250",
//         end: "0:02:52.230",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:02:52.230",
//         end: "0:03:0.210",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:0.210",
//         end: "0:03:3.840",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:03:3.840",
//         end: "0:03:9.270",
//         text: "صدای موسیقی",
//       },
//     ],
//   },
//   {
//     id: 2611,
//     url: "https://dls.music-fa.com/song/alibz/1403/Unknown%20Artist%20-%20Ey%20Jan%20Az%20Kojaye%20Keyhan%20(320).mp3",
//     duration: "0:03:13.000",
//     processed: "2024-08-01T07:54:44.720550Z",
//     segments: [
//       {
//         start: "0:00:0.060",
//         end: "0:00:5.130",
//         text: "موسیقی متن",
//       },
//       {
//         start: "0:00:6.270",
//         end: "0:00:15.030",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:15.330",
//         end: "0:00:19.830",
//         text: "ای جان ای جان",
//       },
//       {
//         start: "0:00:19.830",
//         end: "0:00:28.740",
//         text: "از کجای کیهان در قالب انسان اومدی بر دل دیوانه زدی آتش پنهان",
//       },
//       {
//         start: "0:00:28.890",
//         end: "0:00:36.870",
//         text: "ای جان ای جان از کجایی که هان اومدی بر دل دیوان زن",
//       },
//       {
//         start: "0:00:36.870",
//         end: "0:00:42.150",
//         text: "اون با این لب بی نظیرش ایگارو که شد شب هم مسیرش",
//       },
//       {
//         start: "0:00:42.180",
//         end: "0:00:46.920",
//         text: "حتی با کمتر از اینش منم اسیر وای از این خام",
//       },
//       {
//         start: "0:00:47.010",
//         end: "0:00:51.450",
//         text: "خزینش خزینجان بده کار بده کار",
//       },
//       {
//         start: "0:00:51.540",
//         end: "0:00:56.040",
//         text: "که من تو بهترین جام این تن چه ناظر",
//       },
//       {
//         start: "0:00:56.040",
//         end: "0:01:0.270",
//         text: "این سر چه بازه این یه سر و نازه",
//       },
//       {
//         start: "0:01:0.390",
//         end: "0:01:2.850",
//         text: "که دلهو کرده تازه",
//       },
//       {
//         start: "0:01:2.850",
//         end: "0:01:10.830",
//         text: "در بندم و من برنم عاشق به این لبخندم اگه شیرینی فرهادم از این کوچه",
//       },
//       {
//         start: "0:01:10.830",
//         end: "0:01:14.100",
//         text: "کم کندم این جون این جون",
//       },
//       {
//         start: "0:01:14.160",
//         end: "0:01:23.100",
//         text: "از کجای کیهان بر غالب انسان اومدی بر دل دیوانه زدی آتش پنهان",
//       },
//       {
//         start: "0:01:23.220",
//         end: "0:01:31.380",
//         text: "ای جان ای جان از کجایی که ایهان اومدی برای دل دیوانت نشه مرگی",
//       },
//       {
//         start: "0:01:31.380",
//         end: "0:01:34.470",
//         text: "دل و اگه که مین نیست نی هست",
//       },
//       {
//         start: "0:01:34.500",
//         end: "0:01:41.340",
//         text: "آزاد مجنون وقتی به لیلیش پیوست پس عدل کسم و نابلا",
//       },
//       {
//         start: "0:01:41.340",
//         end: "0:01:49.320",
//         text: "همه مستن از عاقل ها چیزی یاسون نبود از اول استاد مشکل ها عشق جنگ",
//       },
//       {
//         start: "0:01:49.320",
//         end: "0:01:52.920",
//         text: "من هم ذره یکم دستم اومد دلم",
//       },
//       {
//         start: "0:01:52.920",
//         end: "0:01:57.510",
//         text: "بگو کی بوده معلمت که انقدر خوبی تو بلدی چه مهربا",
//       },
//       {
//         start: "0:01:57.750",
//         end: "0:02:3.180",
//         text: "سر بالا میدی میری همه میشن چند ساعتی یا درگی یهو تجلی دادی",
//       },
//       {
//         start: "0:02:3.420",
//         end: "0:02:10.770",
//         text: "در چی در رو بمندی رو ما و بری چی بده ای جان ای جان از کجای کیهان",
//       },
//       {
//         start: "0:02:10.980",
//         end: "0:02:17.490",
//         text: "در غالب انسان اومدی بر دل دیوانه زدی آتش پنهان",
//       },
//       {
//         start: "0:02:17.550",
//         end: "0:02:19.770",
//         text: "ای جان ای جان",
//       },
//       {
//         start: "0:02:19.800",
//         end: "0:02:27.780",
//         text: "از کجایی کیهان اومدی بر دل دیوانه زدی",
//       },
//       {
//         start: "0:02:27.780",
//         end: "0:02:30.870",
//         text: "این عشق اگر می شه",
//       },
//       {
//         start: "0:02:30.870",
//         end: "0:02:37.590",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:02:37.770",
//         end: "0:02:42.660",
//         text: "این عشق اگر بوقش اگر چه حرفی",
//       },
//       {
//         start: "0:02:42.660",
//         end: "0:02:48.690",
//         text: "ای جان ای جان از کجای کیهان در غالب انس",
//       },
//       {
//         start: "0:02:48.690",
//         end: "0:02:56.670",
//         text: "جان اومدی بر دل دیوانه زدی آتش پنهان ای جان ای جان",
//       },
//       {
//         start: "0:02:56.670",
//         end: "0:03:1.920",
//         text: "به جای کیهان اومدی بر دل دیوانه زنی",
//       },
//       {
//         start: "0:03:1.920",
//         end: "0:03:10.620",
//         text: "صدای موسیقی",
//       },
//     ],
//   },
//   {
//     id: 2636,
//     url: "https://dls.music-fa.com/song/alibz/1403/Farzad%20Farzin%20-%20Soghoot%20(320).mp3",
//     duration: "0:03:12.000",
//     processed: "2024-08-01T07:14:02.999995Z",
//     segments: [
//       {
//         start: "0:00:1.800",
//         end: "0:00:8.040",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:8.220",
//         end: "0:00:15.060",
//         text: "موسیقی متن",
//       },
//       {
//         start: "0:00:15.480",
//         end: "0:00:18.990",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:19.080",
//         end: "0:00:22.650",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:22.710",
//         end: "0:00:26.460",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:26.820",
//         end: "0:00:29.970",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:00:31.770",
//         end: "0:00:35.730",
//         text: "زندگی رو لب تیغه",
//       },
//       {
//         start: "0:00:36.000",
//         end: "0:00:39.120",
//         text: "می شه با تو بیاد",
//       },
//       {
//         start: "0:00:39.330",
//         end: "0:00:43.140",
//         text: "زخم من خیلی عمیق",
//       },
//       {
//         start: "0:00:43.260",
//         end: "0:00:47.970",
//         text: "نمیشه با تو بیای اخرین",
//       },
//       {
//         start: "0:00:48.150",
//         end: "0:00:53.940",
//         text: "قصه چی میشه خودمم نمیدونم",
//       },
//       {
//         start: "0:00:53.970",
//         end: "0:00:57.600",
//         text: "واسه این که با تو باشم",
//       },
//       {
//         start: "0:00:57.840",
//         end: "0:01:2.520",
//         text: "می خوامون می تونم",
//       },
//       {
//         start: "0:01:2.970",
//         end: "0:01:6.660",
//         text: "خیلی حرفا رو نمیشه",
//       },
//       {
//         start: "0:01:6.720",
//         end: "0:01:13.950",
//         text: "با ترانه ها بگی عمری چشم و بستم",
//       },
//       {
//         start: "0:01:13.980",
//         end: "0:01:17.070",
//         text: "تو تموم زندگی",
//       },
//       {
//         start: "0:01:17.520",
//         end: "0:01:19.440",
//         text: "وقتی ترسید",
//       },
//       {
//         start: "0:01:19.440",
//         end: "0:01:27.420",
//         text: "دلم نیست واسه چی سکوت کنم من به خلل نرسی",
//       },
//       {
//         start: "0:01:27.420",
//         end: "0:01:35.160",
//         text: "دیدم که بخوام تو بود کنم رو به رو",
//       },
//       {
//         start: "0:01:35.790",
//         end: "0:01:42.750",
//         text: "گلای شکسته باشتم یه روزی",
//       },
//       {
//         start: "0:01:42.750",
//         end: "0:01:48.480",
//         text: "توی گذشته هم حسستم و کشتم",
//       },
//       {
//         start: "0:01:48.660",
//         end: "0:01:50.610",
//         text: "هم حس سامون",
//       },
//       {
//         start: "0:01:50.610",
//         end: "0:01:58.590",
//         text: "کشتم می خوام فامو بدونی میکشه منو نگون",
//       },
//       {
//         start: "0:01:58.590",
//         end: "0:02:5.970",
//         text: "تو که رفتی همه دنیا دارن از چشم اومدن",
//       },
//       {
//         start: "0:02:6.150",
//         end: "0:02:11.040",
//         text: "ساخت این بازی رو باختن",
//       },
//       {
//         start: "0:02:12.750",
//         end: "0:02:18.840",
//         text: "موسیقی متن",
//       },
//       {
//         start: "0:02:19.110",
//         end: "0:02:26.160",
//         text: "موسیقی متن",
//       },
//       {
//         start: "0:02:26.370",
//         end: "0:02:29.790",
//         text: "صدای موسیقی",
//       },
//       {
//         start: "0:02:29.970",
//         end: "0:02:33.810",
//         text: "رو به رو ایستاد دنیا",
//       },
//       {
//         start: "0:02:33.990",
//         end: "0:02:37.230",
//         text: "حالا یه شکسته باشن",
//       },
//       {
//         start: "0:02:37.620",
//         end: "0:02:44.760",
//         text: "یه روزی توی گذشتم هم احساسمو کشتم",
//       },
//       {
//         start: "0:02:45.030",
//         end: "0:02:53.010",
//         text: "می خوام آروم و بدونی می کشم منو",
//       },
//       {
//         start: "0:02:53.010",
//         end: "0:03:2.460",
//         text: "من نگفتم تو که رفتی همه دنیا دارن از چشم نیفتن",
//       },
//       {
//         start: "0:03:2.520",
//         end: "0:03:7.260",
//         text: "ساخت این بازی رو باختم",
//       },
//     ],
//   },
//   {
//     id: 2639,
//     url: "https://dls.music-fa.com/song/alibz/1403/Hooman%20Panahi%20-%20Lilevesht%20(320).mp3",
//     duration: "0:42:55.000",
//     processed: "2024-07-31T17:44:10.653843Z",
//     segments: [
//       {
//         start: "0:00:0.420",
//         end: "0:00:9.450",
//         text: "و ما قرآنی ، ماما زاریس ، صدف رفیق",
//       },
//       {
//         start: "0:00:9.450",
//         end: "0:00:12.720",
//         text: ".مطمئنم",
//       },
//       {
//         start: "0:00:13.080",
//         end: "0:00:21.060",
//         text: "هی",
//       },
//       {
//         start: "0:00:21.060",
//         end: "0:00:26.070",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:00:26.850",
//         end: "0:00:34.830",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:00:34.830",
//         end: "0:00:43.860",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:00:43.860",
//         end: "0:00:51.840",
//         text: "  مذکر   ",
//       },
//       {
//         start: "0:00:51.840",
//         end: "0:00:57.630",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:00:59.490",
//         end: "0:01:7.470",
//         text: "(خنده) (تشویق)",
//       },
//       {
//         start: "0:01:7.470",
//         end: "0:01:15.450",
//         text: "من میخواهم که شما را دنبال کنم.",
//       },
//       {
//         start: "0:01:15.450",
//         end: "0:01:19.200",
//         text: "خوب ، شو نسم شو بیا!",
//       },
//       {
//         start: "0:01:19.380",
//         end: "0:01:23.130",
//         text: "اونها به ما نشون دادن که به شما نشون دادن",
//       },
//       {
//         start: "0:01:23.250",
//         end: "0:01:30.420",
//         text: "مگه زدم من و مدري يارم بخويا، بيقول چيكاش؟",
//       },
//       {
//         start: "0:01:30.420",
//         end: "0:01:38.400",
//         text: "همه با ویمه به دارگش حریری دیلی خوم سیدینش تواصف غریری",
//       },
//       {
//         start: "0:01:38.400",
//         end: "0:01:47.790",
//         text: "دوستای دورت برن برن و میونا",
//       },
//       {
//         start: "0:01:47.790",
//         end: "0:01:49.770",
//         text: "در انبرنو و میونا",
//       },
//       {
//         start: "0:01:49.770",
//         end: "0:01:57.750",
//         text: "عصره نولیه نتکردون دیوانه",
//       },
//       {
//         start: "0:01:57.750",
//         end: "0:02:5.730",
//         text: "داروش ملموسه",
//       },
//       {
//         start: "0:02:5.730",
//         end: "0:02:13.710",
//         text: '"دوروش منوس" و "آرکس سیراژ" و "توماتاش" و "سوزین"',
//       },
//       {
//         start: "0:02:13.710",
//         end: "0:02:23.820",
//         text: "(تشویق تماشاگران)",
//       },
//       {
//         start: "0:02:23.820",
//         end: "0:02:31.800",
//         text: "",
//       },
//       {
//         start: "0:02:31.800",
//         end: "0:02:35.520",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:02:35.760",
//         end: "0:02:43.740",
//         text: "مزه ای عجیب و سالم.",
//       },
//       {
//         start: "0:02:43.740",
//         end: "0:02:51.720",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:02:51.720",
//         end: "0:02:59.700",
//         text: "من دلم می ترسم",
//       },
//       {
//         start: "0:02:59.700",
//         end: "0:03:7.680",
//         text: " گرماهای بد در بلال بلالا ",
//       },
//       {
//         start: "0:03:7.680",
//         end: "0:03:15.660",
//         text: "من در رو میخوابم و میرمای بدتر بلال بلال",
//       },
//       {
//         start: "0:03:15.660",
//         end: "0:03:23.640",
//         text: "ای خدا بشی رو زیر زلفون سمن بر در",
//       },
//       {
//         start: "0:03:23.640",
//         end: "0:03:31.620",
//         text: "یایایایایایایایای",
//       },
//       {
//         start: "0:03:31.620",
//         end: "0:03:39.600",
//         text: "و سمن ماریو از موهیم، لالا لالا لالا",
//       },
//       {
//         start: "0:03:39.600",
//         end: "0:03:47.580",
//         text: "چرا میدانش را گشت و غلطه و به",
//       },
//       {
//         start: "0:03:47.580",
//         end: "0:03:55.560",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:03:55.560",
//         end: "0:04:3.540",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:04:3.540",
//         end: "0:04:12.450",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:04:12.450",
//         end: "0:04:20.430",
//         text: "#ایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایای",
//       },
//       {
//         start: "0:04:20.430",
//         end: "0:04:28.410",
//         text: "اینا چه شو میدیدن رو باور نمیکنی بلال بلالو؟",
//       },
//       {
//         start: "0:04:28.410",
//         end: "0:04:36.390",
//         text: "یای",
//       },
//       {
//         start: "0:04:36.390",
//         end: "0:04:37.980",
//         text: "و یا امبابه",
//       },
//       {
//         start: "0:04:38.370",
//         end: "0:04:46.350",
//         text: "من به چهارده نفر بدون من امامامامامامامامامامامامامام",
//       },
//       {
//         start: "0:04:46.350",
//         end: "0:04:54.330",
//         text: "حالا هر جا و میره می مزیل بگیریم می گیریم غریبا",
//       },
//       {
//         start: "0:04:54.330",
//         end: "0:05:2.310",
//         text: "هرجا میرم این منزل بگیری، مردمی و غریبا، ولابو کنی یا دزدلی",
//       },
//       {
//         start: "0:05:2.310",
//         end: "0:05:10.290",
//         text: "دیبونه ی من فابم فابم فابم",
//       },
//       {
//         start: "0:05:10.290",
//         end: "0:05:18.270",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:05:18.270",
//         end: "0:05:26.250",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:05:26.250",
//         end: "0:05:31.650",
//         text: "(مذکر) (خنده)",
//       },
//       {
//         start: "0:05:32.160",
//         end: "0:05:40.140",
//         text: "(خنده) (خنده)",
//       },
//       {
//         start: "0:05:40.140",
//         end: "0:05:48.120",
//         text: "خیلی بیخیلی.",
//       },
//       {
//         start: "0:05:48.120",
//         end: "0:05:56.100",
//         text: "ما یه کوچه بودیم، بنالو بنالو",
//       },
//       {
//         start: "0:05:56.100",
//         end: "0:06:4.080",
//         text: "و می کروت خونه بودی و غریبه و غریبه و غریبه",
//       },
//       {
//         start: "0:06:4.080",
//         end: "0:06:12.060",
//         text: "و دومی سوزی بلعل",
//       },
//       {
//         start: "0:06:12.060",
//         end: "0:06:20.040",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:06:20.040",
//         end: "0:06:28.620",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:06:28.920",
//         end: "0:06:36.900",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:06:36.900",
//         end: "0:06:44.880",
//         text: "#ایم",
//       },
//       {
//         start: "0:06:44.880",
//         end: "0:06:52.860",
//         text: "من را از بوکولین می خواهم.",
//       },
//       {
//         start: "0:06:52.860",
//         end: "0:07:0.840",
//         text: "یاره هریمی میخای که تو کنونی یاره مسیری",
//       },
//       {
//         start: "0:07:0.840",
//         end: "0:07:8.820",
//         text: "#مذکر:",
//       },
//       {
//         start: "0:07:8.820",
//         end: "0:07:16.800",
//         text: "ازنی کنیتون و همه بیارین ایله ای",
//       },
//       {
//         start: "0:07:16.800",
//         end: "0:07:24.780",
//         text: " یک زمان خوب برای همه ی ما ، برای همه ی زمان های بزرگ ",
//       },
//       {
//         start: "0:07:24.780",
//         end: "0:07:33.150",
//         text: "هر چی هی مداد اقتصادی کسلی بود",
//       },
//       {
//         start: "0:07:34.320",
//         end: "0:07:42.300",
//         text: "باخیلی با هم میینام و جارو زنتین",
//       },
//       {
//         start: "0:07:42.300",
//         end: "0:07:50.280",
//         text: "ای از این خشاب، ای از این خشاب",
//       },
//       {
//         start: "0:07:50.280",
//         end: "0:07:58.260",
//         text: "",
//       },
//       {
//         start: "0:07:58.260",
//         end: "0:08:6.240",
//         text: "تونوپ جمع و شقی و خربت دور و میزنه.",
//       },
//       {
//         start: "0:08:6.240",
//         end: "0:08:14.220",
//         text: "اونم جمع و شقیع و نزدیک دور و میزن ، للی نیع و سرخاو و کیسه و شلوار و مزار و میزن ، للی نیع و سرخاو",
//       },
//       {
//         start: "0:08:14.220",
//         end: "0:08:19.560",
//         text: "شو من مزارو بزنه",
//       },
//       {
//         start: "0:08:19.680",
//         end: "0:08:22.860",
//         text: "تو نمره ی جاو و ستین هشت دلار رو به خوبی میکنی",
//       },
//       {
//         start: "0:08:22.950",
//         end: "0:08:30.930",
//         text: "کدوم اونم برنجا و سیتیاش تو و لرزه به خوبی کنه تو و لرزه عشق و عشق",
//       },
//       {
//         start: "0:08:30.930",
//         end: "0:08:39.360",
//         text: "تو نذر عشقش بگیرم، تشمن قراره رو میزنه، این شاوچی تو میخیت که مدل بر کنار این یار و خون، میگو این شاوچی",
//       },
//       {
//         start: "0:08:39.360",
//         end: "0:08:47.340",
//         text: "تو بیخیست که ما دل برکنون به یارو خوب، موقع خودای باولای سری بر من به یارو میزنه، جور ما بیاره دل دادومه.",
//       },
//       {
//         start: "0:08:47.340",
//         end: "0:08:52.380",
//         text: "و که کجا می آید دل دالم، دل باخت، صداقت این مشکل است.",
//       },
//       {
//         start: "0:08:52.560",
//         end: "0:09:0.540",
//         text: "ماشیکه ها",
//       },
//       {
//         start: "0:09:0.540",
//         end: "0:09:8.970",
//         text: " ",
//       },
//       {
//         start: "0:09:8.970",
//         end: "0:09:16.950",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:09:16.950",
//         end: "0:09:24.930",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:09:24.930",
//         end: "0:09:33.840",
//         text: "هی",
//       },
//       {
//         start: "0:09:33.840",
//         end: "0:09:41.820",
//         text: "هی",
//       },
//       {
//         start: "0:09:41.820",
//         end: "0:09:49.800",
//         text: "",
//       },
//       {
//         start: "0:09:49.800",
//         end: "0:09:57.780",
//         text: "هی",
//       },
//       {
//         start: "0:09:57.780",
//         end: "0:10:5.760",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:10:5.760",
//         end: "0:10:13.740",
//         text: "هی",
//       },
//       {
//         start: "0:10:13.740",
//         end: "0:10:21.720",
//         text: "آدرس:",
//       },
//       {
//         start: "0:10:21.720",
//         end: "0:10:28.410",
//         text: "موسيقي هاي موسيقي",
//       },
//       {
//         start: "0:10:28.470",
//         end: "0:10:36.450",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:10:36.450",
//         end: "0:10:44.430",
//         text: "سلام و سلام",
//       },
//       {
//         start: "0:10:44.430",
//         end: "0:10:52.410",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:10:52.410",
//         end: "0:11:0.390",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:11:0.390",
//         end: "0:11:8.370",
//         text: "انشاالله، ای",
//       },
//       {
//         start: "0:11:8.370",
//         end: "0:11:16.350",
//         text: "عقل ما با بوگوشون میخام به داغ راته لیت و بتنار",
//       },
//       {
//         start: "0:11:16.350",
//         end: "0:11:24.330",
//         text: "چشم سی دی بی کورابی به داخل اینترنت برگرنه کور",
//       },
//       {
//         start: "0:11:24.330",
//         end: "0:11:32.310",
//         text: "من در حال حاضر به شما می گویم ، می خواهم به شما بگویم ، می خواهم به شما بگویم ، می خواهم به شما بگویم.",
//       },
//       {
//         start: "0:11:32.310",
//         end: "0:11:40.290",
//         text: " برای هر سه دقیقه ",
//       },
//       {
//         start: "0:11:40.290",
//         end: "0:11:48.270",
//         text: "هی",
//       },
//       {
//         start: "0:11:48.270",
//         end: "0:11:56.250",
//         text: "",
//       },
//       {
//         start: "0:11:56.250",
//         end: "0:12:4.230",
//         text: "من در این زمان به شما می گویم ، من در این زمان به شما می گویم ، من در این زمان به شما می گویم.",
//       },
//       {
//         start: "0:12:4.230",
//         end: "0:12:12.210",
//         text: "#مذکر: من می خوام که اون رو ببخشم و اون رو ببخشم و اون رو ببخشم.",
//       },
//       {
//         start: "0:12:12.210",
//         end: "0:12:20.190",
//         text: "بی بی کورابی، به جنگ رفتنیش، بری به کوبه زونومب",
//       },
//       {
//         start: "0:12:20.190",
//         end: "0:12:28.170",
//         text: "شما به من وابسته هستید. (خنده)",
//       },
//       {
//         start: "0:12:28.170",
//         end: "0:12:36.150",
//         text: "(خنده تماشاگران) (خنده تماشاگران)",
//       },
//       {
//         start: "0:12:36.150",
//         end: "0:12:44.130",
//         text: '[مذکر]: "مذکر:" "مذکر"',
//       },
//       {
//         start: "0:12:44.130",
//         end: "0:12:52.110",
//         text: " تانگرا، باونینگرو، سارها، پیسینو، هیچینو ",
//       },
//       {
//         start: "0:12:52.110",
//         end: "0:13:0.090",
//         text: "من خوشم می آید ، و اگر آن را از بین ببرم ، چه چیزی را از بین ببرم ، از بین ببرم",
//       },
//       {
//         start: "0:13:0.090",
//         end: "0:13:8.070",
//         text: " در آن لحظه ،",
//       },
//       {
//         start: "0:13:8.070",
//         end: "0:13:16.050",
//         text: "من به شما کمک می کنم تا به شما کمک کنید.",
//       },
//       {
//         start: "0:13:16.050",
//         end: "0:13:24.030",
//         text: "و من به او می گویم: من به او می گویم: من به او می گویم: من به او می گویم: من به او می گویم: من به او می گویم",
//       },
//       {
//         start: "0:13:24.030",
//         end: "0:13:32.010",
//         text: "برکه شیده به یار ماکراتام برو و بی دو بار",
//       },
//       {
//         start: "0:13:32.010",
//         end: "0:13:39.990",
//         text: "سیر هتل یاوری برگشته به یار مگه تو همش بتاری",
//       },
//       {
//         start: "0:13:39.990",
//         end: "0:13:47.970",
//         text: "و می چرده کورم ، می اوره از دادو ، می دونه از دادو و می مونه",
//       },
//       {
//         start: "0:13:47.970",
//         end: "0:13:55.950",
//         text: "سلام. سلام.",
//       },
//       {
//         start: "0:13:55.950",
//         end: "0:14:3.930",
//         text: "[مذکر] [مذکر] [مذکر]",
//       },
//       {
//         start: "0:14:3.930",
//         end: "0:14:11.910",
//         text: "ای ماریا بی حمیه و خاطره عدنش یلامسی از دبابیر خلاء",
//       },
//       {
//         start: "0:14:11.910",
//         end: "0:14:19.890",
//         text: "اَیاردِ کُزِیر، اَبْتِیَهُوْرِیَهُوْرِیَهُوْرِیَهُوْرَهُوْرَهُوْرَهُوْرَهُوْرَهُوْرَهُوْرَهُوْرَهُوْرَهُ",
//       },
//       {
//         start: "0:14:19.890",
//         end: "0:14:27.870",
//         text: "#تفاوت می میره #تفاوت میره #تفاوت #تفاوت میره #تفاوت میره #تفاوت میره",
//       },
//       {
//         start: "0:14:27.870",
//         end: "0:14:35.850",
//         text: " برای بچه ها ،",
//       },
//       {
//         start: "0:14:35.850",
//         end: "0:14:43.830",
//         text: "#ایز، زگالی، زگالی #ایز، روزگار #ایز #ایز",
//       },
//       {
//         start: "0:14:43.830",
//         end: "0:14:51.810",
//         text: " حالا ، سالها پیش ",
//       },
//       {
//         start: "0:14:51.810",
//         end: "0:14:59.790",
//         text: '"مذکر"',
//       },
//       {
//         start: "0:14:59.790",
//         end: "0:15:7.770",
//         text: "  مذکر   ",
//       },
//       {
//         start: "0:15:7.770",
//         end: "0:15:15.750",
//         text: "ایتا علبیه",
//       },
//       {
//         start: "0:15:15.750",
//         end: "0:15:23.730",
//         text: " می تونه سر و صدا بزنه   می تونه سر و صدا بزنه ",
//       },
//       {
//         start: "0:15:23.730",
//         end: "0:15:31.710",
//         text: "با او نال با او ليزن با او ليزن",
//       },
//       {
//         start: "0:15:31.710",
//         end: "0:15:39.690",
//         text: "من خیلی با تو هم میدم ، تا که رو به تو هم ببرم ، تا از اون رو بمیرم.",
//       },
//       {
//         start: "0:15:39.690",
//         end: "0:15:47.670",
//         text: "پس از همه ی اونها به من رسید که من با اونها حرف بزنم.",
//       },
//       {
//         start: "0:15:47.670",
//         end: "0:15:55.650",
//         text: "(تشویق تماشاگران) (خنده تماشاگران)",
//       },
//       {
//         start: "0:15:55.650",
//         end: "0:16:3.630",
//         text: "من جواب خواهم داد. (خنده حضار)",
//       },
//       {
//         start: "0:16:3.630",
//         end: "0:16:11.610",
//         text: "با دست ایرو موزیکار، صد دلبری دار با دست ایروزیکار",
//       },
//       {
//         start: "0:16:11.610",
//         end: "0:16:19.590",
//         text: "#مذکر:",
//       },
//       {
//         start: "0:16:19.590",
//         end: "0:16:27.570",
//         text: "#مذکر:",
//       },
//       {
//         start: "0:16:27.570",
//         end: "0:16:35.550",
//         text: "او: تشکیر راه به طاینه توامروز ، سرورد لو روز ، عاصمون به بحر رسید.",
//       },
//       {
//         start: "0:16:35.550",
//         end: "0:16:43.530",
//         text: "من می فهمم که هیچ چیز نردال نیست ، ساردال بی ، داودال مداس ، سینگرو موزیکال.",
//       },
//       {
//         start: "0:16:43.530",
//         end: "0:16:51.510",
//         text: "اِی",
//       },
//       {
//         start: "0:16:51.510",
//         end: "0:16:59.490",
//         text: "استاد محمد زاره کیبورد",
//       },
//       {
//         start: "0:16:59.490",
//         end: "0:17:7.470",
//         text: "هی",
//       },
//       {
//         start: "0:17:7.470",
//         end: "0:17:15.450",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:17:15.450",
//         end: "0:17:23.430",
//         text: "خوش آمد خدمت خانواده حسنی از",
//       },
//       {
//         start: "0:17:23.430",
//         end: "0:17:31.410",
//         text: "مادرا بگیر تا، تهلک، تلو، هلو",
//       },
//       {
//         start: "0:17:31.410",
//         end: "0:17:39.390",
//         text: "هانوئی سالی جیلید، هانوئی عرب زاد",
//       },
//       {
//         start: "0:17:39.390",
//         end: "0:17:47.370",
//         text: "من می خواهم به شما کمک کنم تا به شما کمک کنید.",
//       },
//       {
//         start: "0:17:47.370",
//         end: "0:17:55.350",
//         text: "مال خارق کمون هنیف سالی هست؟",
//       },
//       {
//         start: "0:17:55.350",
//         end: "0:18:3.330",
//         text: "(خنده) (خنده)",
//       },
//       {
//         start: "0:18:3.330",
//         end: "0:18:11.310",
//         text: "",
//       },
//       {
//         start: "0:18:11.310",
//         end: "0:18:19.290",
//         text: "اینا گورنر افتتاحیه",
//       },
//       {
//         start: "0:18:19.290",
//         end: "0:18:27.270",
//         text: "موری",
//       },
//       {
//         start: "0:18:27.270",
//         end: "0:18:35.250",
//         text: "#آای تکیه، اون منو بورید، منو تکیه، جوییم منو باولیزه، جوییم رو با هم",
//       },
//       {
//         start: "0:18:35.250",
//         end: "0:18:43.230",
//         text: "من به شما می گویم: به اینجا بروید. به من بگویید: به اینجا بروید.",
//       },
//       {
//         start: "0:18:43.230",
//         end: "0:18:51.210",
//         text: "ايشک عزيز",
//       },
//       {
//         start: "0:18:51.210",
//         end: "0:18:59.190",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:18:59.190",
//         end: "0:19:7.170",
//         text: "همی دونیا رو میسر کن و یارو رو.",
//       },
//       {
//         start: "0:19:7.170",
//         end: "0:19:15.150",
//         text: " من می خواهم که به من کمک کنم که به من کمک کنم ",
//       },
//       {
//         start: "0:19:15.150",
//         end: "0:19:23.130",
//         text: " تو کیه؟   تو کیه؟   تو کیه؟ ",
//       },
//       {
//         start: "0:19:23.130",
//         end: "0:19:31.110",
//         text: "من می خواهم که شما با من باالیز شوید ، که من هرگز روت نمی کنم ، که شما را از این طریق استفاده کنید.",
//       },
//       {
//         start: "0:19:31.110",
//         end: "0:19:39.090",
//         text: "چهار دقیقه صبر",
//       },
//       {
//         start: "0:19:39.090",
//         end: "0:19:47.070",
//         text: "اجرا شده از گروه هنرمند محمد زاره استاد عزیز مرسی",
//       },
//       {
//         start: "0:19:47.070",
//         end: "0:19:55.050",
//         text: "موزیکال: موزیکال",
//       },
//       {
//         start: "0:19:55.050",
//         end: "0:20:3.030",
//         text: "و زرت عورتی هیدب و ریدب",
//       },
//       {
//         start: "0:20:3.030",
//         end: "0:20:11.010",
//         text: "من یه عروس دوتایی که عوریکی که شلیکی که یپوتایی",
//       },
//       {
//         start: "0:20:11.010",
//         end: "0:20:18.990",
//         text: "  دوی اندورین که میشن و که میخواد بیاد",
//       },
//       {
//         start: "0:20:18.990",
//         end: "0:20:26.970",
//         text: "#مذکر",
//       },
//       {
//         start: "0:20:26.970",
//         end: "0:20:34.950",
//         text: "بیخیال",
//       },
//       {
//         start: "0:20:34.950",
//         end: "0:20:42.930",
//         text: "  ای مرد خوب ، و در چنین حالتی به من خواهد رسید.   ای مرد خوب ، و در بهترین حالتی به من خواهد رسید.",
//       },
//       {
//         start: "0:20:42.930",
//         end: "0:20:50.910",
//         text: "هر چه به ما گفت: ای مهربون، عمده به من گفت: هر چه به ما گفت: ای مهربون",
//       },
//       {
//         start: "0:20:50.910",
//         end: "0:20:58.890",
//         text: "هی",
//       },
//       {
//         start: "0:20:58.890",
//         end: "0:21:6.870",
//         text: "  ",
//       },
//       {
//         start: "0:21:6.870",
//         end: "0:21:14.850",
//         text: "نشت از یک ماسی آسیس، یک بمبکار، یک تالبی، نشت از یک ماسی آسیس.",
//       },
//       {
//         start: "0:21:14.850",
//         end: "0:21:22.830",
//         text: "من با کارون تا خوب ، بین گودال تو گونی هم رنگی کارون تا خوب",
//       },
//       {
//         start: "0:21:22.830",
//         end: "0:21:30.810",
//         text: "بین گل ها چطوری؟ هم رنگ خارم تابیه.",
//       },
//       {
//         start: "0:21:30.810",
//         end: "0:21:38.790",
//         text: "آها ، این همه عزیز است",
//       },
//       {
//         start: "0:21:38.790",
//         end: "0:21:46.770",
//         text: "بسه بسه",
//       },
//       {
//         start: "0:21:46.770",
//         end: "0:21:54.750",
//         text: "حنیف کالج روس، حنیف سالی عزیز.",
//       },
//       {
//         start: "0:21:54.750",
//         end: "0:22:2.730",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:22:2.730",
//         end: "0:22:10.710",
//         text: "آدرس: آدرس: آدرس:",
//       },
//       {
//         start: "0:22:10.710",
//         end: "0:22:18.690",
//         text: "  مذکر  ",
//       },
//       {
//         start: "0:22:18.690",
//         end: "0:22:26.670",
//         text: '"مذکر"',
//       },
//       {
//         start: "0:22:26.670",
//         end: "0:22:34.650",
//         text: "",
//       },
//       {
//         start: "0:22:34.650",
//         end: "0:22:42.630",
//         text: "",
//       },
//       {
//         start: "0:22:42.630",
//         end: "0:22:50.610",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:22:50.610",
//         end: "0:22:58.590",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:22:58.590",
//         end: "0:23:6.570",
//         text: "(خنده) (خنده)",
//       },
//       {
//         start: "0:23:6.570",
//         end: "0:23:14.550",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:23:14.550",
//         end: "0:23:22.530",
//         text: "",
//       },
//       {
//         start: "0:23:22.530",
//         end: "0:23:30.510",
//         text: "هی",
//       },
//       {
//         start: "0:23:30.510",
//         end: "0:23:36.990",
//         text: "هی",
//       },
//       {
//         start: "0:23:37.560",
//         end: "0:23:43.470",
//         text: "اَه",
//       },
//       {
//         start: "0:23:44.730",
//         end: "0:23:52.710",
//         text: "",
//       },
//       {
//         start: "0:23:52.710",
//         end: "0:23:56.490",
//         text: "هی",
//       },
//       {
//         start: "0:23:56.790",
//         end: "0:24:3.150",
//         text: " ",
//       },
//       {
//         start: "0:24:4.170",
//         end: "0:24:12.150",
//         text: "(خنده) (خنده)",
//       },
//       {
//         start: "0:24:12.150",
//         end: "0:24:17.160",
//         text: "اَلْحَسَرْ",
//       },
//       {
//         start: "0:24:17.160",
//         end: "0:24:22.590",
//         text: "(مذکر) (خنده)",
//       },
//       {
//         start: "0:24:23.640",
//         end: "0:24:31.620",
//         text: "  مذکر  ",
//       },
//       {
//         start: "0:24:31.620",
//         end: "0:24:36.630",
//         text: "موسيقي هاي موسيقي",
//       },
//       {
//         start: "0:24:36.630",
//         end: "0:24:44.610",
//         text: "موزیک ویدیویی موزیک ویدیویی",
//       },
//       {
//         start: "0:24:44.610",
//         end: "0:24:48.510",
//         text: "آدرس:",
//       },
//       {
//         start: "0:24:49.620",
//         end: "0:24:55.050",
//         text: "موسيقي و موسيقي",
//       },
//       {
//         start: "0:24:56.490",
//         end: "0:25:1.500",
//         text: "موسيقي هاي موسيقي",
//       },
//       {
//         start: "0:25:2.580",
//         end: "0:25:8.160",
//         text: "موسيقي هاي موسيقي",
//       },
//       {
//         start: "0:25:9.060",
//         end: "0:25:17.040",
//         text: "",
//       },
//       {
//         start: "0:25:17.040",
//         end: "0:25:25.020",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:25:25.020",
//         end: "0:25:33.000",
//         text: "مینهای تعظیم اقا هانیف ، افتقار شیرا اسکیل",
//       },
//       {
//         start: "0:25:33.000",
//         end: "0:25:40.980",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:25:40.980",
//         end: "0:25:48.960",
//         text: "موسيقي و موسيقي",
//       },
//       {
//         start: "0:25:48.960",
//         end: "0:25:56.940",
//         text: "و قراره وقتشون زیادی باشه",
//       },
//       {
//         start: "0:25:56.940",
//         end: "0:26:4.920",
//         text: "#ایایایایایایایایایایایایایایایایایایایایایایایایایایایایایایای",
//       },
//       {
//         start: "0:26:4.920",
//         end: "0:26:12.900",
//         text: "ای دیگرام بخیر که موسلمون نشته",
//       },
//       {
//         start: "0:26:12.900",
//         end: "0:26:20.880",
//         text: "  ایایایایایایایایایایایایایایایایایایایایایای",
//       },
//       {
//         start: "0:26:20.880",
//         end: "0:26:28.860",
//         text: "قافیه نابی نایی",
//       },
//       {
//         start: "0:26:28.860",
//         end: "0:26:36.840",
//         text: "ای بابا",
//       },
//       {
//         start: "0:26:36.840",
//         end: "0:26:44.820",
//         text: "بابا",
//       },
//       {
//         start: "0:26:44.820",
//         end: "0:26:52.800",
//         text: " تا برای سرینهای نروگ ",
//       },
//       {
//         start: "0:26:52.800",
//         end: "0:27:0.780",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:27:0.780",
//         end: "0:27:8.760",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:27:8.760",
//         end: "0:27:16.740",
//         text: "موزیکال: موزیکال",
//       },
//       {
//         start: "0:27:16.740",
//         end: "0:27:24.720",
//         text: " و به من بر می آید و به من می رسد ",
//       },
//       {
//         start: "0:27:24.720",
//         end: "0:27:32.700",
//         text: "و من او را می بینم و به من می پردازم.",
//       },
//       {
//         start: "0:27:32.700",
//         end: "0:27:40.680",
//         text: "و به تو نیامد و به تو میپیرم و به تو میپیرم",
//       },
//       {
//         start: "0:27:40.680",
//         end: "0:27:48.660",
//         text: " که چیکار می کنم ، آباؤدی ",
//       },
//       {
//         start: "0:27:48.660",
//         end: "0:27:56.640",
//         text: "آای",
//       },
//       {
//         start: "0:27:56.640",
//         end: "0:28:4.620",
//         text: "هی",
//       },
//       {
//         start: "0:28:4.620",
//         end: "0:28:12.600",
//         text: "و سمون نمرد لاق و لانه رز برنو",
//       },
//       {
//         start: "0:28:12.600",
//         end: "0:28:20.580",
//         text: "بیخیلتت جمع کردتنتن و لاعزازتنتم",
//       },
//       {
//         start: "0:28:20.580",
//         end: "0:28:28.560",
//         text: "ای با",
//       },
//       {
//         start: "0:28:28.560",
//         end: "0:28:36.540",
//         text: " بی",
//       },
//       {
//         start: "0:28:36.540",
//         end: "0:28:44.520",
//         text: "سلام",
//       },
//       {
//         start: "0:28:44.520",
//         end: "0:28:49.020",
//         text: "سلام و سلام و سلام",
//       },
//       {
//         start: "0:28:49.260",
//         end: "0:28:56.160",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:28:56.160",
//         end: "0:29:2.700",
//         text: "موسيقي و آهنگ ها",
//       },
//       {
//         start: "0:29:2.700",
//         end: "0:29:10.680",
//         text: "این آهنگ بعدی هم میرم به افتخار",
//       },
//       {
//         start: "0:29:10.680",
//         end: "0:29:18.660",
//         text: "یه عینی قدیمیه خودش رو ببینه",
//       },
//       {
//         start: "0:29:18.660",
//         end: "0:29:26.640",
//         text: "یه چیزه که از لوندار که اومده که بخوره، که آردی و تنها هست.",
//       },
//       {
//         start: "0:29:26.640",
//         end: "0:29:34.620",
//         text: "به جز حوصله مونوزو که دلم درک ما مشکله بین هر چی انسان",
//       },
//       {
//         start: "0:29:34.620",
//         end: "0:29:42.600",
//         text: "به جز حوصله یه مقطعی که تن ناراحتم نواس",
//       },
//       {
//         start: "0:29:42.600",
//         end: "0:29:50.580",
//         text: "سر رنجی که کم صحبت تو یه وقتانی که تنها ناراحتی تو",
//       },
//       {
//         start: "0:29:50.580",
//         end: "0:29:58.560",
//         text: "من همه چیز را به آرژیک می زنم که خیلی خوب است.",
//       },
//       {
//         start: "0:29:58.560",
//         end: "0:30:6.540",
//         text: "و در این باره می گوییم:",
//       },
//       {
//         start: "0:30:6.540",
//         end: "0:30:14.520",
//         text: "حمیشه در موسوعه",
//       },
//       {
//         start: "0:30:14.520",
//         end: "0:30:22.500",
//         text: "باخت میزار و سیگار می مونه سینه قلبو نکشید و در می مونه",
//       },
//       {
//         start: "0:30:22.500",
//         end: "0:30:30.480",
//         text: "و زخمیز روزگار به سینه قلبو می کشید و به دار",
//       },
//       {
//         start: "0:30:30.480",
//         end: "0:30:38.460",
//         text: " من عاشق تو هستم   برایم تو هستم ",
//       },
//       {
//         start: "0:30:38.460",
//         end: "0:30:46.440",
//         text: "و برای این، او را نجات می دهد و به ما می دهد، و به ما می دهد و به ما می دهد.",
//       },
//       {
//         start: "0:30:46.440",
//         end: "0:30:54.420",
//         text: "من یه توقف دارم که از نوردار چیکار می کنیم که ببریم و آرتین رو تنها بزنیم.",
//       },
//       {
//         start: "0:30:54.420",
//         end: "0:31:2.400",
//         text: "فقط حوصله ی یه وقتایی که خیلی ناراحت توم نه با صدای راجی",
//       },
//       {
//         start: "0:31:2.400",
//         end: "0:31:10.380",
//         text: " که به نام سو فاتو می زنم ، من پا به پا را می زنم ، من پا به پا می زنم. ",
//       },
//       {
//         start: "0:31:10.380",
//         end: "0:31:18.360",
//         text: "پم را بیای و بیداری، طعم را با من، پیرش و نمیای.",
//       },
//       {
//         start: "0:31:18.360",
//         end: "0:31:26.340",
//         text: "اگر که بمونی قسم می خورم که زن اعتمادت بشیمون به",
//       },
//       {
//         start: "0:31:26.340",
//         end: "0:31:34.320",
//         text: "اگه که بمونی این قسم میخوره که ز اعتمادت پشیمان باشه",
//       },
//       {
//         start: "0:31:34.320",
//         end: "0:31:42.300",
//         text: "من می خواهم به شما بگویم که من می خواهم به شما بگویم که چه مردمی را می بینید.",
//       },
//       {
//         start: "0:31:42.300",
//         end: "0:31:50.280",
//         text: "اون هوسل رو یه وقت تو می تونی تو رو رو رو رو تو رو رو تو رو رو تو رو رو",
//       },
//       {
//         start: "0:31:50.280",
//         end: "0:31:57.480",
//         text: "و روزه خمیزه رز قعد",
//       },
//       {
//         start: "0:31:58.560",
//         end: "0:32:6.540",
//         text: "همیشه من سین قلبه ای که شیدو بنام مامان",
//       },
//       {
//         start: "0:32:6.540",
//         end: "0:32:14.520",
//         text: "من این غلبه را می بینم که چه چیزی در آن وجود دارد.",
//       },
//       {
//         start: "0:32:14.520",
//         end: "0:32:22.500",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:32:22.500",
//         end: "0:32:30.480",
//         text: "موزیکال: موزیکال",
//       },
//       {
//         start: "0:32:30.480",
//         end: "0:32:38.460",
//         text: "سر.",
//       },
//       {
//         start: "0:32:38.460",
//         end: "0:32:46.440",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:32:46.440",
//         end: "0:32:54.420",
//         text: "",
//       },
//       {
//         start: "0:32:54.420",
//         end: "0:33:2.400",
//         text: "این آهنگ بعدی هم از طرف...",
//       },
//       {
//         start: "0:33:2.400",
//         end: "0:33:10.380",
//         text: "آقای فرزاد تقدیم به خانم و گلش افتخار اشکل بزنید از طرف آقای گچی تقدیم همسرش",
//       },
//       {
//         start: "0:33:10.380",
//         end: "0:33:18.360",
//         text: "(خنده تماشاگران) (خنده تماشاگران)",
//       },
//       {
//         start: "0:33:18.360",
//         end: "0:33:26.340",
//         text: "(مذکر) (مذکر)",
//       },
//       {
//         start: "0:33:26.340",
//         end: "0:33:34.320",
//         text: "آی سن قربان ، آی سن قربان",
//       },
//       {
//         start: "0:33:34.320",
//         end: "0:33:42.300",
//         text: "سَنَهُرْبَا سَنَهُرْبَا",
//       },
//       {
//         start: "0:33:42.300",
//         end: "0:33:50.280",
//         text: "سلام و سلام",
//       },
//       {
//         start: "0:33:50.280",
//         end: "0:33:58.260",
//         text: "خرس و",
//       },
//       {
//         start: "0:33:58.260",
//         end: "0:34:6.240",
//         text: '"فرزا جان"',
//       },
//       {
//         start: "0:34:6.240",
//         end: "0:34:14.220",
//         text: "می رقص گردم ، آدن آدم ، آدن لیلا",
//       },
//       {
//         start: "0:34:14.220",
//         end: "0:34:22.200",
//         text: "جانوم لیلا، آی گزم لیلا، آی سن قربان سن قربان زن",
//       },
//       {
//         start: "0:34:22.200",
//         end: "0:34:30.180",
//         text: "آیسن بر",
//       },
//       {
//         start: "0:34:30.180",
//         end: "0:34:38.160",
//         text: "اَه",
//       },
//       {
//         start: "0:34:38.160",
//         end: "0:34:46.140",
//         text: "من این را می خواهم که به شما کمک کنم تا این کار را انجام دهید.",
//       },
//       {
//         start: "0:34:46.140",
//         end: "0:34:54.120",
//         text: "[مذکر] [مذکر] [مذکر]",
//       },
//       {
//         start: "0:34:54.120",
//         end: "0:35:2.100",
//         text: "اَدُنَادِلْ اَدُنَادِلْ اَدُنَادِلْ",
//       },
//       {
//         start: "0:35:2.100",
//         end: "0:35:10.080",
//         text: "سَنَبُرْبَار",
//       },
//       {
//         start: "0:35:10.080",
//         end: "0:35:18.060",
//         text: "من می خوام که این کار رو انجام بدم.",
//       },
//       {
//         start: "0:35:18.060",
//         end: "0:35:26.040",
//         text: "آقای خدا دادم تو راه به افتخارش کل بزنیم کل کل کل",
//       },
//       {
//         start: "0:35:26.040",
//         end: "0:35:34.020",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:35:34.020",
//         end: "0:35:42.000",
//         text: "و موزیک موسوسی اپیجی.",
//       },
//       {
//         start: "0:35:42.000",
//         end: "0:35:49.980",
//         text: "هر موزی که قبلا دوباره بزنی درخواست دادم",
//       },
//       {
//         start: "0:35:49.980",
//         end: "0:35:57.960",
//         text: "به افتخار خداداد عزیز، فرزند سوم اقا فرزاد، یه کت بزنه که با اومدنش کلی امتیاز",
//       },
//       {
//         start: "0:35:57.960",
//         end: "0:36:5.940",
//         text: "از بخش در تاپیک، نه سری مگچیه، سلام، هی خوش آمدید، کوکام خداحافظ",
//       },
//       {
//         start: "0:36:5.940",
//         end: "0:36:13.920",
//         text: "من شما را می شناسم",
//       },
//       {
//         start: "0:36:13.920",
//         end: "0:36:21.900",
//         text: "(مذکر)",
//       },
//       {
//         start: "0:36:21.900",
//         end: "0:36:29.880",
//         text: "من همیشه فارس هستم.",
//       },
//       {
//         start: "0:36:29.880",
//         end: "0:36:37.860",
//         text: "سلام،",
//       },
//       {
//         start: "0:36:37.860",
//         end: "0:36:45.840",
//         text: "می گردم لِیلا، می گردم",
//       },
//       {
//         start: "0:36:45.840",
//         end: "0:36:53.820",
//         text: "غرمه غرمه غرمه",
//       },
//       {
//         start: "0:36:53.820",
//         end: "0:37:1.800",
//         text: "(خنده تماشاگران) (خنده تماشاگران) (خنده تماشاگران)",
//       },
//       {
//         start: "0:37:1.800",
//         end: "0:37:9.780",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:37:9.780",
//         end: "0:37:17.760",
//         text: "#مرد: پادشاه نیس و شوک و نیس",
//       },
//       {
//         start: "0:37:17.760",
//         end: "0:37:25.740",
//         text: "[مذکر]",
//       },
//       {
//         start: "0:37:25.740",
//         end: "0:37:33.720",
//         text: "اولین جلسه با موزیک با فرزاد بنایی",
//       },
//       {
//         start: "0:37:33.720",
//         end: "0:37:41.700",
//         text: "از شما عذرخواهی می کنم ، عزیز.",
//       },
//       {
//         start: "0:37:41.700",
//         end: "0:37:49.680",
//         text: "استاد زاره مریم، یه اشرفه هم بیام افتخاره کوکام حنیف سالی عزیز",
//       },
//       {
//         start: "0:37:49.680",
//         end: "0:37:57.660",
//         text: "(خنده) (خنده)",
//       },
//       {
//         start: "0:37:57.660",
//         end: "0:38:5.640",
//         text: "(تشویق حضار) (تشویق حضار)",
//       },
//       {
//         start: "0:38:5.640",
//         end: "0:38:13.620",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:38:13.620",
//         end: "0:38:21.600",
//         text: "موزیکال: موزیکال",
//       },
//       {
//         start: "0:38:21.600",
//         end: "0:38:29.580",
//         text: "(خنده)",
//       },
//       {
//         start: "0:38:29.580",
//         end: "0:38:37.560",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:38:37.560",
//         end: "0:38:45.540",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:38:45.540",
//         end: "0:38:53.520",
//         text: "آشاودآزیز",
//       },
//       {
//         start: "0:38:53.520",
//         end: "0:39:1.500",
//         text: "اشتهای تکیه ای عزیزم .",
//       },
//       {
//         start: "0:39:1.500",
//         end: "0:39:9.480",
//         text: "آیسول",
//       },
//       {
//         start: "0:39:9.480",
//         end: "0:39:17.460",
//         text: "ریش و ریش",
//       },
//       {
//         start: "0:39:17.460",
//         end: "0:39:25.440",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:39:25.440",
//         end: "0:39:30.840",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:39:36.210",
//         end: "0:39:44.190",
//         text: "",
//       },
//       {
//         start: "0:39:44.190",
//         end: "0:39:52.170",
//         text: "",
//       },
//       {
//         start: "0:39:52.170",
//         end: "0:40:0.150",
//         text: "",
//       },
//       {
//         start: "0:40:0.150",
//         end: "0:40:8.130",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:40:8.130",
//         end: "0:40:16.110",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:40:16.110",
//         end: "0:40:24.090",
//         text: "  کیکی؟       ،    ،    ،    ،   ",
//       },
//       {
//         start: "0:40:24.090",
//         end: "0:40:32.070",
//         text: "و چاشمی که اسمش رو اسدت که دار گیری کنه",
//       },
//       {
//         start: "0:40:32.070",
//         end: "0:40:40.050",
//         text: " نورمی که می میره ، نورمی که می میره ، نورمی که می میره ، نورمی که می میره ، نورمی که می میره ، نورمی که می میره",
//       },
//       {
//         start: "0:40:40.050",
//         end: "0:40:48.030",
//         text: "اَه",
//       },
//       {
//         start: "0:40:48.030",
//         end: "0:40:56.010",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:40:56.010",
//         end: "0:41:3.990",
//         text: "(خنده حضار)",
//       },
//       {
//         start: "0:41:3.990",
//         end: "0:41:11.970",
//         text: "خیره جون هردوموند سیک لاوری هردوموند",
//       },
//       {
//         start: "0:41:11.970",
//         end: "0:41:19.950",
//         text: "",
//       },
//       {
//         start: "0:41:19.950",
//         end: "0:41:27.930",
//         text: "  شاشم از لباس ملوس زد که در گینه بودیم.",
//       },
//       {
//         start: "0:41:27.930",
//         end: "0:41:35.910",
//         text: "هی",
//       },
//       {
//         start: "0:41:35.910",
//         end: "0:41:43.890",
//         text: "آدرس:",
//       },
//       {
//         start: "0:41:43.890",
//         end: "0:41:51.870",
//         text: "موزیک ویدیویی",
//       },
//       {
//         start: "0:41:51.870",
//         end: "0:41:59.850",
//         text: '"مذکر"',
//       },
//       {
//         start: "0:41:59.850",
//         end: "0:42:7.830",
//         text: "",
//       },
//       {
//         start: "0:42:7.830",
//         end: "0:42:15.810",
//         text: "",
//       },
//       {
//         start: "0:42:15.810",
//         end: "0:42:23.790",
//         text: "آرمای عزیزم",
//       },
//       {
//         start: "0:42:23.790",
//         end: "0:42:31.770",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:42:31.770",
//         end: "0:42:39.750",
//         text: "",
//       },
//       {
//         start: "0:42:39.750",
//         end: "0:42:47.730",
//         text: "وای",
//       },
//       {
//         start: "0:42:47.730",
//         end: "0:42:53.400",
//         text: "(خنده تماشاگران)",
//       },
//       {
//         start: "0:42:55.020",
//         end: "0:42:55.680",
//         text: "سپاسگزارم",
//       },
//     ],
//   },
//   {
//     id: 2638,
//     url: "https://dls.music-fa.com/song/alibz/1403/Unknown%20Artist%20-%20Dokhtare%20Balenciaga%20(320).mp3",
//     duration: "0:03:40.000",
//     processed: "2024-07-31T17:42:11.614522Z",
//     segments: [
//       {
//         start: "0:00:0.510",
//         end: "0:00:4.560",
//         text: "سیکی، سیکی",
//       },
//       {
//         start: "0:00:4.770",
//         end: "0:00:11.430",
//         text: "جیکی",
//       },
//       {
//         start: "0:00:11.490",
//         end: "0:00:19.890",
//         text: "دختر بالنسیا کای",
//       },
//       {
//         start: "0:00:19.890",
//         end: "0:00:27.870",
//         text: "پیش مامان بیای گاهی انگار با فیلتر شد دستکاری همه چیز عالیه ولی طبیعیه این بیبی که فیزیفی بشه",
//       },
//       {
//         start: "0:00:27.870",
//         end: "0:00:35.160",
//         text: "هرکی که میگه عینشه مغزم داره دیگه نمیکشه",
//       },
//       {
//         start: "0:00:35.160",
//         end: "0:00:43.140",
//         text: "برای شب تکس دادی، آی میس تو بودی، برام قلب فرس دادی، بعد آدرس دادی",
//       },
//       {
//         start: "0:00:43.140",
//         end: "0:00:50.430",
//         text: "الو",
//       },
//       {
//         start: "0:00:50.430",
//         end: "0:00:52.650",
//         text: "تو چی میگی؟ چی میگی؟ چی میگی؟",
//       },
//       {
//         start: "0:00:52.770",
//         end: "0:01:0.750",
//         text: "چیکی ، چیکی",
//       },
//       {
//         start: "0:01:0.750",
//         end: "0:01:9.480",
//         text: "چیکی",
//       },
//       {
//         start: "0:01:9.480",
//         end: "0:01:13.890",
//         text: "میبینمش پیش فزیه",
//       },
//       {
//         start: "0:01:13.890",
//         end: "0:01:22.440",
//         text: "نه کنه که خانم بیزیه مهم نیست چه نجم چیزیه یه نجلله بدون میک اپ چقدر دیتاف شده چیکی بدبری",
//       },
//       {
//         start: "0:01:22.440",
//         end: "0:01:30.420",
//         text: "اِک سِش کُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُدُد",
//       },
//       {
//         start: "0:01:30.420",
//         end: "0:01:33.030",
//         text: "اینجوری کنه شیکش با چپ راست",
//       },
//       {
//         start: "0:01:33.030",
//         end: "0:01:41.010",
//         text: "صد و هشت ساعت داره تمرین میره توی پیجش یه کلی ولره، بخواد ببینی یه کم پیپر ولره",
//       },
//       {
//         start: "0:01:41.010",
//         end: "0:01:44.580",
//         text: "ششتش انقدر خوبه میگن فکرم مش عیب نداره",
//       },
//       {
//         start: "0:01:45.120",
//         end: "0:01:49.320",
//         text: "و او در امانت را چیکی می داند ، می داند که من پولاساندال چیکی هستم.",
//       },
//       {
//         start: "0:01:49.320",
//         end: "0:01:53.760",
//         text: "الان هم مثل قبلاً چکی، الان غم بهت قلب چکی او",
//       },
//       {
//         start: "0:01:53.760",
//         end: "0:01:58.020",
//         text: "می زنی برق زیادی، الماس کردن تغییراتی",
//       },
//       {
//         start: "0:01:58.080",
//         end: "0:02:6.900",
//         text: "به هم زدی تو تفریحاتی، به هم زدی چه تشکیلاتی، تو",
//       },
//       {
//         start: "0:02:6.900",
//         end: "0:02:12.270",
//         text: "وای بیای بام بالی، ام پای الکلوبول بالی، وای وای",
//       },
//       {
//         start: "0:02:12.270",
//         end: "0:02:19.980",
//         text: "بابا وایسا، توک بایلا، میش دانسا، اوفیچیکی، خموش موبایلا، توی پیجی، رافتی جمایلا",
//       },
//       {
//         start: "0:02:20.040",
//         end: "0:02:28.020",
//         text: "هی",
//       },
//       {
//         start: "0:02:28.020",
//         end: "0:02:36.000",
//         text: "چیکی",
//       },
//       {
//         start: "0:02:36.000",
//         end: "0:02:43.980",
//         text: "دل من برده این چیکی، قیافه اشناست کجامو دیدیم شما، تهران یا هرمز و تیری، میگه سه بار استو",
//       },
//       {
//         start: "0:02:43.980",
//         end: "0:02:51.960",
//         text: "از کیکی اوه حالا پس خانم از اون پیگیرست همش دنباله ای نمیده کیکی فاست ریتی فاست خوشم میاد خیلی نیس",
//       },
//       {
//         start: "0:02:51.960",
//         end: "0:02:56.910",
//         text: "من شبو به مون چون که منی میگه",
//       },
//       {
//         start: "0:02:56.970",
//         end: "0:03:4.950",
//         text: "دوچه قفانی، یک، دو، سه، چهار بشماری، بردمت رو یه کار، وحشی دوست داره، سادی سوسک",
//       },
//       {
//         start: "0:03:4.950",
//         end: "0:03:12.930",
//         text: "مارمن خوب بلده به طرف بقیه دوست داشت چیکی خوب هیت میزنه با تیس توپ تاس من هم چیرو می کنم بشه دافی سوپرای سوپرای",
//       },
//       {
//         start: "0:03:12.930",
//         end: "0:03:20.910",
//         text: "هی",
//       },
//       {
//         start: "0:03:20.910",
//         end: "0:03:29.100",
//         text: "چیکی ، چیکی",
//       },
//       {
//         start: "0:03:29.100",
//         end: "0:03:38.610",
//         text: "من به شما می گویم: من به شما می گویم: من به شما می گویم: من به شما می گویم: من به شما می گویم: من به شما می گویم: من به شما می گویم:",
//       },
//     ],
//   },
// ];
