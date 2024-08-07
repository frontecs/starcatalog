import styles from "@/styles/Profesor/ElevView.module.css";
export default function ElevView({ id, nume, medie, state, materii }) {
  function hideView() {
    const elev = document.getElementById(`elevview-${id}`);
    elev.style.opacity = 0;
    setTimeout(() => {
      elev.style.display = "none";
    }, 300);
    state(false);
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
          <select name="materie" id={`${id}-materie`}>
            {materii.map((materie) => (
              <option key={materie} value={materie}>
                {materie}
              </option>
            ))}
          </select>
        </p>
      </div>
    </>
  );
}
