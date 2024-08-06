import styles from "@/styles/elev/Note.module.css";
export default function Materie({ nume, note }) {
  function togglenote() {
    var x = document.getElementById("note_" + nume);
    var y = document.getElementById("sageata_" + nume);
    if (x.style.display === "none") {
      x.style.display = "block";

      x.style.borderTop = "2px solid";
      x.style.borderColor = "rgb(229, 229, 229)";
      x.style.paddingTop = "0.6rem";

      y.style.transform = "rotate(90deg)";
    } else {
      x.style.display = "none";

      x.style.borderTop = "none";
      x.style.borderColor = "none";
      x.style.paddingTop = "0rem";

      y.style.transform = "rotate(0deg)";
    }
  }

  return (
    <div className={styles.materie} onClick={togglenote}>
      <p className={styles.title} id={`title_${nume}`}>
        {nume +
          ` | ${(note.reduce((a, b) => a + b.nota, 0) / note.length).toFixed(
            1
          )}`}
        <div id={`sageata_${nume}`} className={styles.sageata}>
          <svg
            width="6"
            height="8"
            viewBox="0 0 6 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 1.40988C0.500064 1.24682 0.53731 1.08676 0.607844 0.946456C0.678379 0.806147 0.779613 0.690733 0.900964 0.612279C1.02231 0.533825 1.15933 0.495212 1.29768 0.500474C1.43603 0.505737 1.57064 0.554682 1.68745 0.642195L5.14212 3.2317C5.25179 3.31392 5.34209 3.4274 5.40465 3.56165C5.4672 3.69589 5.5 3.84656 5.5 3.9997C5.5 4.15284 5.4672 4.3035 5.40465 4.43775C5.34209 4.57199 5.25179 4.68547 5.14212 4.76769L1.68745 7.35781C1.57061 7.44535 1.43595 7.49429 1.29755 7.49953C1.15915 7.50477 1.0221 7.4661 0.900738 7.38757C0.779371 7.30905 0.678145 7.19355 0.607648 7.05315C0.53715 6.91276 0.499972 6.75263 0.5 6.58951V1.40988Z"
              fill="#A1A1AA"
            />
          </svg>
        </div>
      </p>
      <div
        id={`note_${nume}`}
        style={{ display: "none", paddingRight: "1rem" }}
      >
        {Object.keys(note).map((key) => (
          <div
            style={{ paddingLeft: "1rem", paddingBottom: "0.33rem" }}
            key={key}
          >
            {note[key].nota} la data de {note[key].created_at}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
