import LongButton from "@/components/LongButton";
import ElevView from "@/components/Profesor/Clasa/ElevView";

import Navbar from "@/components/Profesor/Navbar";
import styles from "@/styles/Profesor/Clase.module.css";

import { useEffect, useState } from "react";

export default function Clasa() {
  const [clasa, setClasa] = useState([]);
  const [elevi, setElevi] = useState([]);

  const [elevViewLoaded, setElevViewLoaded] = useState(false);
  const [incarcat, setIncarcat] = useState(false);

  const [materii, setMaterii] = useState([]);
  const [materie, setMaterie] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const clasa = queryParams.get("clasa");

    fetch("/api/profesor/clasaDinId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("access_token"),
        id: clasa,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasa(data.clase);
        setElevi(data.elevi);

        setIncarcat(true);
      });

    fetch("/api/profesor/materiiDisponibile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMaterii(Object.values(data.materii));
        setMaterie(Object.values(data.materii)[0]);
      });
  }, []);

  function arataElev(id) {
    if (elevViewLoaded) return;
    setElevViewLoaded(true);

    const event = new CustomEvent(`elevViewLoaded-${id}`, { detail: id });
    dispatchEvent(event);
  }

  if (!incarcat) {
    return <Navbar url={"none"} />;
  }

  return (
    <>
      <Navbar url={"none"} />
      <div className={styles.container}>
        <h1>
          Clasa {clasa.nume} - {clasa.diriginte}
        </h1>
        {elevi.map((elev) => (
          <>
            <ElevView
              key={`${elev.id}-view`}
              id={elev.id}
              nume={`${elev.nume} ${elev.prenume}`}
              medie={`${elev.medie}`}
              setElevViewLoaded={setElevViewLoaded}
              materie={materie}
              setMaterie={setMaterie}
              materii={materii}
            />
            <LongButton
              key={`${elev.id}-button`}
              title={`${elev.nume} ${elev.prenume}`}
              subtitle={`Medie: ${elev.medie}`}
              buttonText={"Acceseaza"}
              func={() => {
                arataElev(elev.id);
              }}
            />
          </>
        ))}
      </div>
    </>
  );
}
