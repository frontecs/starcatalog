import styles from "@/styles/Profesor/Nota.module.css";
export default function Nota({ nota, data }) {
  return (
    <div className={styles.buttonContainer}>
      <p style={{ margin: "0px" }}>
        {nota}
        {" - "}
        <span style={{ color: "gray" }}>{data}</span>
      </p>
      <div
        className={styles.button}
        style={{ clear: "both", whiteSpace: "nowrap" }}
      >
        Sterge
      </div>
    </div>
  );
}
