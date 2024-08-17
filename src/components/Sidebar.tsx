import styles from "./sidebar.module.css";
import avaIcon from "../assets/avaIcon.png";
import speechIcon from "../assets/speechIcon.png";
import archiveIcon from "../assets/archive Icon.png";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      <nav className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img className={styles.sidebarHeadItem} src={avaIcon} alt="avaIcon" />

          <p className={styles.sidebarHeadItem}>آوا</p>
        </div>
        <div className={styles.sidebarPages}>
          {/* <a className="aStyle" href="#"> */}

          {/* <div className={styles.pagesItem}> */}

          <div
            className={
              location.pathname.startsWith("/convert-speech")
                ? styles.pagesItemSelected
                : styles.pagesItem
            }
          >
            <button className="buttonStyle">
              <Link to="/convert-speech" className="linkStyle">
                <img
                  className={styles.pagesItemRight}
                  src={speechIcon}
                  alt="speechIcon"
                />
                <p className={styles.pagesItemLeft}>تبدیل گفتار</p>
              </Link>
            </button>
          </div>

          {/* </a> */}

          {/* <a href="#" className="aStyle"> */}

          <div
            className={
              location.pathname.startsWith("/archive")
                ? styles.pagesItemSelected
                : styles.pagesItem
            }
          >
            <button className="buttonStyle">
              <Link to="/archive" className="linkStyle">
                <img
                  className={styles.pagesItemRight}
                  src={archiveIcon}
                  alt="archiveIcon"
                />
                <p className={styles.pagesItemLeft}>آرشیو</p>
              </Link>
            </button>
          </div>

          {/* </a> */}
        </div>
      </nav>
    </>
  );
}
