import { useState } from "react";
import styles from "@/styles/Profesor/ElevView.module.css";

export default function NotaModal({
  id,
  materie,
  materiiCuPermisiuni,
  cautaMaterie,
}) {
  const [nota, setNota] = useState(1);
  const [dataNota, setDataNota] = useState(new Date());

  const [apasat, setApasat] = useState(false);

  function hideModal() {
    document.getElementById(`elevview-modalNota-${id}`).style.display = "none";
  }

  function notaValidator(e) {
    const value = e.target.value;
    if (value < 1) e.target.value = 1;
    if (value > 10)
      if (value % 10 === 0) e.target.value = 10;
      else e.target.value = value % 10;
    setNota(e.target.value);
  }

  function submit() {
    if (materiiCuPermisiuni.includes(materie) && !apasat) {
      setApasat(true);
      fetch(`/api/profesor/add`, {
        method: "POST",
        headers: {
          token: localStorage.getItem("access_token"),
          idelev: id,
          materie,
          nota,
          dataNota,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setApasat(false);
          if (data.ok) {
            hideModal();
            cautaMaterie(materie);
          }
        });
    }
  }

  return (
    <div className={styles.modalContainer} id={`elevview-modalNota-${id}`}>
      <input
        type="number"
        max={10}
        min={1}
        onChange={(e) => notaValidator(e)}
        value={nota}
      />
      <input
        type="date"
        onChange={(e) => {
          setDataNota(e.target.value);
        }}
        value={dataNota}
      />
      <div className={styles.button} onClick={submit}>
        Adauga Nota
      </div>
      <div className={styles.close} onClick={hideModal}>
        ❌
      </div>
    </div>
  );
}
