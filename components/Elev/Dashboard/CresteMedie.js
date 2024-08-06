import { useEffect, useState } from "react";
import styles from "@/styles/elev/Dashboard.module.css";
import LongMedie from "./LastUpdates/LongMedie";
export default function CresteMedia() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("/api/elev/cresteMedie", {
      method: "GET",
      headers: {
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  if (notes.error) return <div></div>;

  return (
    <div className={styles.cresteMedie}>
      <p style={{ margin: "0px" }}>Materii la care să-ți cresti media:</p>
      {notes.length > 0 &&
        notes.map((note) => (
          <LongMedie
            key={note.materie}
            title={note.materie}
            buttonText={`${note.requiredTens} de 10 pentru ${Math.ceil(
              note.average
            )}`}
          />
        ))}
    </div>
  );
}
