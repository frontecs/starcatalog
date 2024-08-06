import { useEffect, useState } from "react";
import LongButton from "@/components/LongButton";
import Navbar from "@/components/Elev/Navbar";
import styles from "@/styles/elev/Absente.module.css";

export default function Absente() {
  const [incarcat, setIncarcat] = useState(false);
  const [absente, setAbsente] = useState([]);
  useEffect(() => {
    fetch("/api/elev/getAbsente", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        setAbsente(data.absente);
        setIncarcat(true);
      });
  }, []);
  return (
    <div>
      <Navbar url={"absente"} />
      <div className={styles.container}>
        {!incarcat && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h1 style={{ color: "black", textAlign: "center" }}>
              Se incarca... 🔃
            </h1>
          </div>
        )}

        {incarcat && absente.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h1 style={{ color: "black" }}>Nu ai absente!</h1>
          </div>
        )}

        {absente.map((absenta) => (
          <LongButton
            key={absente[0]}
            title={absenta[0]}
            subtitle={absenta[1]}
            buttonText={absenta[2] ? "🟩 Motivata" : "🟥 Nemotivata"}
          />
        ))}
      </div>
    </div>
  );
}
