import { useEffect, useState } from "react";
import LongMedie from "./LastUpdates/LongMedie";
import styles from "@/styles/elev/Dashboard.module.css";
export default function LastUpdates() {
  const [note, setNote] = useState([]);
  const [absente, setAbsente] = useState([]);
  useEffect(() => {
    fetch("/api/elev/lastUpdates", {
      method: "GET",
      headers: {
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNote(data.note);
        setAbsente(data.absente);
      });
  }, []);

  if (note.length === 0 && absente.length === 0) return <div></div>;

  return (
    <div className={styles.lastUpdates}>
      <p style={{ margin: "0px" }}>Ultimele activități</p>
      <div className={styles.lastUpdatesContainer}>
        {note.map((entry) => (
          <LongMedie
            key={`${entry.materie}-${entry.data}-${entry.nota}`}
            title={entry.materie}
            subtitle={entry.data}
            buttonText={`Nota ${entry.nota}`}
          />
        ))}
      </div>
      <div className={styles.lastUpdatesContainer}>
        {absente.map((entry) => (
          <LongMedie
            key={`${entry.materie}-${entry.data}-${entry.motivata}`}
            title={entry.materie}
            subtitle={entry.data}
            buttonText={entry.motivata ? "Absență 🟩" : "Absență 🟥"}
          />
        ))}
      </div>
    </div>
  );
}
