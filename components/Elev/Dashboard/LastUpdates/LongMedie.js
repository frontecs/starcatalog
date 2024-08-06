import styles from "@/styles/Settings.module.css";
export default function LongMedie({ title, subtitle, buttonText }) {
  return (
    <div className={styles.buttonContainer}>
      <p>
        {title}
        {subtitle ? " - " : ""}
        <span style={{ color: "gray", textAlign: "center" }}>{subtitle}</span>
      </p>
      {buttonText === "" ? (
        <div></div>
      ) : (
        <div className={styles.button} style={{ cursor: "default" }}>
          {buttonText}
        </div>
      )}
    </div>
  );
}
