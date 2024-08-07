import { useEffect, useState } from "react";
import styles from "@/styles/Profesor/ElevView.module.css";
import Nota from "./ElevView/Nota";
export default function ElevView({
  id,
  nume,
  medie,
  setElevViewLoaded,
  materie,
  setMaterie,
  materii,
}) {
  const [note, setNote] = useState([]);
  function cautaMaterie(materie) {
    fetch(`/api/profesor/note`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("access_token"),
        elev: id,
        materie: materie.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const elev = document.getElementById(`elevview-${id}`);
        elev.style.display = "flex";
        setTimeout(() => {
          elev.style.opacity = 1;
        }, 1);
        if (Object.values(data.materii).length === 0) return setNote([]);
        setNote(data.materii[1].note);
      });
  }
  useEffect(() => {
    addEventListener(`elevViewLoaded-${id}`, () => {
      cautaMaterie(materie);
    });
  }, []);

  function hideView() {
    const elev = document.getElementById(`elevview-${id}`);
    elev.style.opacity = 0;
    setTimeout(() => {
      elev.style.display = "none";
    }, 300);
    setElevViewLoaded(false);
  }

  function onMaterieChange(e) {
    const materie = e.target.value;
    setMaterie(materie);
    cautaMaterie(materie);
  }

  return (
    <>
      <div id={`elevview-${id}`} className={styles.container}>
        <div
          id={`elevview-close-${id}`}
          className={styles.close}
          onClick={hideView}
        >
          ❌
        </div>
        <h1 style={{ marginBottom: 0 }}>{nume}</h1>
        <p>Medie Generala: {medie}</p>
        <p>
          Alege o materie:{" "}
          <select
            name="materie"
            id={`${id}-materie`}
            onChange={(e) => onMaterieChange(e)}
            value={materie}
          >
            {materii.map((materie) => (
              <option key={materie} value={materie}>
                {materie}
              </option>
            ))}
          </select>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {note.map((nota) => (
            <Nota nota={nota.nota} data={nota.created_at} />
          ))}
        </div>
      </div>
    </>
  );
}
