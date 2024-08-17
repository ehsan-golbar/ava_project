import styles from "./resultConverting.module.css";

interface MyComponentProps {
  text: string;
  timeOne: string;
  timeTwo: string;
  backGround: boolean;
  textBlue: boolean;
}
const TimedTextItem: React.FC<MyComponentProps> = (props) => {

    const toPersianNumber = (num: number | string) => {
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
      };
      
  return (
    <>
      <div
        className={
          props.textBlue
            ? props.backGround
              ? styles.timedTextItemSelectedBackground
              : styles.timedTextItemSelected 
            : props.backGround
            ? styles.timedTextItemBackground
            : styles.timedTextItem
        }
      >
        <div className={styles.timedTextItemOne}>
          <p className="pStyle">{toPersianNumber(props.timeTwo)}</p>
        </div>

        <div className={styles.timedTextItemTwo}>
          <p className="pStyle">{toPersianNumber(props.timeOne)}</p>
        </div>
        <div className={styles.timedTextItemThree}>
          <p className="pStyle">{props.text}</p>
        </div>
      </div>
    </>
  );
};

export default TimedTextItem;
