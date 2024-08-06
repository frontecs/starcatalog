import Materie from "@/components/Elev/Materie";
import Navbar from "@/components/Elev/Navbar";
import styles from "@/styles/elev/Note.module.css";

import { useEffect, useState } from "react";

export default function Note() {
  const [incarcat, setIncarcat] = useState(false);
  const [materii, setMaterii] = useState({});

  useEffect(() => {
    fetch("/api/elev/note", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("access_token"),
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data && data.materii) setMaterii(data.materii);
        else console.log("Error fetching data");
      });
      setIncarcat(true);
    });
  }, []);

  return (
    <div>
      <Navbar url={"note"} />
      {!incarcat && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            paddingLeft: "15vw",
          }}
        >
          <h1 style={{ color: "black", textAlign: "center" }}>
            Se incarca... 🔃
          </h1>
        </div>
      )}

      {incarcat && materii.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "black" }}>Nu ai note!</h1>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.catalog}>
          {Object.keys(materii).map((key) => (
            <Materie
              key={key}
              nume={materii[key].nume}
              note={materii[key].note}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
