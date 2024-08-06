import Navbar from "@/components/Profesor/Navbar";
import styles from "@/styles/Profesor/Clase.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Clasa from "@/components/Profesor/Dashboard/Clasa";

export default function Dashboard() {
  const [clase, setClase] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/profesor/clase", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClase(data.clase);
      })
      .catch((error) => {
        router.push("/login");
      });
  }, []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Navbar url={"clase"} />
      <div className={styles.container}>
        {clase.map((clasa, index) => {
          try {
            return (
              <Clasa
                key={index}
                clasa={clasa.nume}
                diriginte={clasa.diriginte}
                id={clasa.id}
              />
            );
          } catch {
            router.push("/login");
          }
        })}
      </div>
    </div>
  );
}
