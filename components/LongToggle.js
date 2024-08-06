import { useState } from "react";
import styles from "@/styles/Settings.module.css";
export default function LongToggle({ title, subtitle, func, isEnabled }) {
  const [isToggled, setIsToggled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  isEnabled(setIsToggled, setIsDisabled);
  return (
    <div className={styles.buttonContainer}>
      <p>
        {title}
        {" - "}
        <span style={{ color: "gray" }}>{subtitle}</span>
      </p>
      <div
        className={styles.button}
        onClick={() => {
          if (!isDisabled) func(!isToggled, setIsToggled, setIsDisabled);
        }}
      >
        {isToggled ? (
          <div
            style={{
              clear: "both",
              whiteSpace: "nowrap",
            }}
          >
            🟩 <span className={styles.toggleText}>Activat</span>
          </div>
        ) : (
          <div
            style={{
              clear: "both",
              whiteSpace: "nowrap",
            }}
          >
            🟥 <span className={styles.toggleText}>Dezactivat</span>
          </div>
        )}
      </div>
    </div>
  );
}
