import styles from "./speech.module.css";
import dropIcon from "../assets/drop Icon.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
// import { useData } from './DataContext';



import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setResultLanguage } from './store/slices/languageSlice';

export default function SpeechCardFoot() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [language, setLanguage] = React.useState("fa"); // State for selected language
  const open = Boolean(anchorEl);


  const resultLanguage = useSelector((state: RootState) => state.data.resultLanguage);
  const dispatch: AppDispatch = useDispatch();


  // const {  setResultLanguage } = useData();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageChange = (selectedLanguage: string) => {
    // setLanguage(selectedLanguage);
    handleClose();

    dispatch(setResultLanguage(selectedLanguage))
    // {console.log('resultLanguage:', resultLanguage);}
  };

  return (
    <div className={styles.cardFoot}>
      <p className={styles.footTitle}>زبان گفتار:</p>

      <div className={styles.langType}>
        <p className={styles.footItem}>{resultLanguage === 'en' ? "انگلیسی" : "فارسی"}</p>

        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ width : "auto", minWidth: "auto"}}
          >
           <img src={dropIcon} alt="dropIcon" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleLanguageChange("fa")}>فارسی</MenuItem>
            <MenuItem onClick={() => handleLanguageChange("en")}>انگلیسی</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}


// import styles from "./speech.module.css";
// import dropIcon from "../assets/drop Icon.png";

// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import React from "react";

// export default function SpeechCardFoot() {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <div className={styles.cardFoot}>
//         <p className={styles.footTitle}>زبان گفتار:</p>

//         <div className={styles.langType}>
//           <p className={styles.footItem}>فارسی</p>

//           <div>
//             <Button
//               id="basic-button"
//               aria-controls={open ? "basic-menu" : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? "true" : undefined}
//               onClick={handleClick}
//             >
//                <img src={dropIcon} alt="dropIcon" />
//             </Button>
//             <Menu
//               id="basic-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
              
//               MenuListProps={{
//                 "aria-labelledby": "basic-button",
                
//               }}
//             >
//               <MenuItem onClick={handleClose}>فارسی</MenuItem>
//               <MenuItem onClick={handleClose}>انگلیسی </MenuItem>
              
//             </Menu>
//           </div>

//           {/*                 
//               <button className="buttonStyle">
//                 <img src={dropIcon} alt="dropIcon" />
//               </button> */}
//         </div>
//       </div>
//     </>
//   );
// }
