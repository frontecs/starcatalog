import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Components/Navbar.module.css";

import { useRouter } from "next/router";

function Spacer() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.spacer} />
    </div>
  );
}

export default function Navbar({ url }) {
  const [name, setName] = useState("Se incarca...");
  const [clasa, setClasa] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (url != "none") {
      let buton = document.getElementById(url);
      buton.style.backgroundColor = "#333";
      buton.style.color = "#fff";
      buton.style.borderRadius = "0.33rem";

      let icon = document.getElementById(url + "_icon");
      icon.style.filter = "invert(1)";
    }

    fetch("/api/user/checkvalid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          localStorage.removeItem("access_token");
          router.push("/login");
        } else {
          console.log("Iau date");
          fetch("/api/user/getUserNameFromToken", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("access_token"),
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setName(data.nume);
              setClasa(data.clasa);
            });
        }
      });
  }, [url, router]);

  return (
    <div className={styles.container}>
      <span
        className={styles.navbarNume}
        style={{ fontSize: "0.75rem", color: "gray" }}
      >
        {clasa}
      </span>
      <p className={styles.navbarNume}>{name}</p>
      <Spacer />
      <Link className={styles.link} id="clase" href="/profesor/dashboard">
        <Image
          id="clase_icon"
          className={styles.icon}
          src={require("@/public/icons/dashboard.png")}
          width={15}
          alt="Clase icon"
        />{" "}
        <span className={styles.text}>Clase</span>
      </Link>
      <Link className={styles.link} id="settings" href="/profesor/settings">
        <Image
          id="settings_icon"
          className={styles.icon}
          src={require("@/public/icons/settings.png")}
          width={15}
          alt="Settings icon"
        />{" "}
        <span className={styles.text}>Setari</span>
      </Link>
    </div>
  );
}
