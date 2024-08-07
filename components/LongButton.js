import styles from "@/styles/Settings.module.css";
import Link from "next/link";
export default function LongButton({
  title,
  subtitle,
  buttonText = "",
  func,
  islink = false,
}) {
  return (
    <div className={styles.buttonContainer}>
      <p>
        {title}
        {" - "}
        <span style={{ color: "gray" }}>{subtitle}</span>
      </p>
      {buttonText === "" ? (
        <div></div>
      ) : islink ? (
        <Link
          className={styles.button}
          style={{
            clear: "both",
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
          href={func}
        >
          {buttonText}
        </Link>
      ) : (
        <div
          className={styles.button}
          style={{ clear: "both", whiteSpace: "nowrap" }}
          onClick={func}
        >
          {buttonText}
        </div>
      )}
    </div>
  );
}
