import { useState } from "react";
import styles from "@/styles/Profesor/Nota.module.css";
export default function Absenta({ absenta, materie, cautaMaterie }) {
  const [apasat, setApasat] = useState(false);
  function submit() {
    if (apasat) return;
    setApasat(true);
    fetch(`/api/profesor/sterge`, {
      method: "POST",
      headers: {
        token: localStorage.getItem("access_token"),
        idabsenta: absenta.id,
        motiveaza: !absenta.motivata,
        materie: materie.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          cautaMaterie(materie);
          setApasat(false);
        }
      });
  }
  return (
    <div className={styles.buttonContainer}>
      <p style={{ margin: "0px" }}>
        {`Absenta ${absenta.motivata ? "Motivata" : "Nemotivata"}`}
        {" - "}
        <span style={{ color: "gray" }}>{absenta.created_at}</span>
      </p>
      <div
        className={styles.button}
        style={{ clear: "both", whiteSpace: "nowrap" }}
        onClick={submit}
      >
        {absenta.motivata ? "Sterge" : "Motiveaza"}
      </div>
    </div>
  );
}
