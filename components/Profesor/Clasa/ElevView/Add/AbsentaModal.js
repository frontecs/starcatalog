import { useState } from "react";
import styles from "@/styles/Profesor/ElevView.module.css";

export default function AbsentaModal({
  id,
  materie,
  materiiCuPermisiuni,
  cautaMaterie,
}) {
  const [dataAbsenta, setDataAbsenta] = useState(1);
  const [apasat, setApasat] = useState(false);

  function hideModal() {
    document.getElementById(`elevview-modalAbsenta-${id}`).style.display =
      "none";
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
          dataAbsenta,
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
    <div className={styles.modalContainer} id={`elevview-modalAbsenta-${id}`}>
      <input
        type="date"
        value={dataAbsenta}
        onChange={(e) => {
          setDataAbsenta(e.target.value);
        }}
      />
      <div className={styles.button} onClick={submit}>
        Adauga Absenta
      </div>
      <div className={styles.close} onClick={hideModal}>
        ❌
      </div>
    </div>
  );
}
