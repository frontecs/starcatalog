import styles from "@/styles/Profesor/ElevView.module.css";
import NotaModal from "./Add/NotaModal";
import AbsentaModal from "./Add/AbsentaModal";

export default function Add({
  id,
  materie,
  materiiCuPermisiuni,
  setMateriiCuPermisiuni,
  cautaMaterie,
}) {
  materie = materie.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function add(type) {
    if (materiiCuPermisiuni.includes(materie)) {
      document.getElementById(`elevview-modal${type}-${id}`).style.display =
        "flex";
      return;
    }

    fetch(`/api/profesor/addNotaPerm`, {
      method: "GET",
      headers: {
        token: localStorage.getItem("access_token"),
        materie,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          document.getElementById(`elevview-modal${type}-${id}`).style.display =
            "flex";
          setMateriiCuPermisiuni(materiiCuPermisiuni.concat(materie));
        }
      });
  }

  return (
    <div className={styles.addContainer}>
      <NotaModal
        id={id}
        materie={materie}
        materiiCuPermisiuni={materiiCuPermisiuni}
        cautaMaterie={cautaMaterie}
      />
      <AbsentaModal
        id={id}
        materie={materie}
        materiiCuPermisiuni={materiiCuPermisiuni}
        cautaMaterie={cautaMaterie}
      />
      <div
        className={styles.button}
        onClick={() => {
          add("Nota");
        }}
      >
        Adauga Nota
      </div>
      <div
        className={styles.button}
        onClick={() => {
          add("Absenta");
        }}
      >
        Adauga Absenta
      </div>
    </div>
  );
}
