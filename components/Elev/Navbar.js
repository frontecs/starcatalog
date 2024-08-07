import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Components/Navbar.module.css";
import Head from "next/head";

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
    let buton = document.getElementById(url);
    buton.style.backgroundColor = "#333";
    buton.style.color = "#fff";
    buton.style.borderRadius = "0.33rem";

    let icon = document.getElementById(url + "_icon");
    icon.style.filter = "invert(1)";

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
          fetch("/api/user/getUserNameFromToken", {
            method: "POST",
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
  }, [router]);

  return (
    <>
      <Head>
        <title>
          StarCatalog - {url.charAt(0).toUpperCase() + url.slice(1)}
        </title>
      </Head>
      <div className={styles.container}>
        <span
          className={styles.navbarNume}
          style={{ fontSize: "0.75rem", color: "gray" }}
        >
          {clasa}
        </span>
        <p className={styles.navbarNume}>{name}</p>
        <Spacer />
        <Link className={styles.link} id="dashboard" href="/elev/dashboard">
          <Image
            id="dashboard_icon"
            className={styles.icon}
            src={require("@/public/icons/dashboard.png")}
            width={15}
            alt="Dashboard icon"
          />{" "}
          <span className={styles.text}>Panou de bord</span>
        </Link>
        <Link className={styles.link} id="note" href="/elev/note">
          <Image
            id="note_icon"
            className={styles.icon}
            src={require("@/public/icons/note.png")}
            width={15}
            alt="Note icon"
          />{" "}
          <span className={styles.text}>Note</span>
        </Link>
        <Link className={styles.link} id="absente" href="absente">
          <Image
            id="absente_icon"
            className={styles.icon}
            src={require("@/public/icons/absente.png")}
            width={15}
            alt="Absente icon"
          />{" "}
          <span className={styles.text}>Absente</span>
        </Link>
        <Link className={styles.link} id="leaderboard" href="/elev/leaderboard">
          <Image
            id="leaderboard_icon"
            className={styles.icon}
            src={require("@/public/icons/podium.png")}
            width={15}
            alt="Leaderboard icon"
          />{" "}
          <span className={styles.text}>Clasament</span>
        </Link>
        <Link className={styles.link} id="settings" href="/elev/settings">
          <Image
            id="settings_icon"
            className={styles.icon}
            src={require("@/public/icons/settings.png")}
            width={15}
            alt="Settings icon"
          />{" "}
          <span className={styles.text}>Setari</span>
        </Link>
        {/* <Link className={styles.link} id="settings" href="/elev/orar">
        <Image
          id="orar_icon"
          className={styles.icon}
          src={require("@/public/icons/orar.png")}
          width={15}
          alt="Orar icon"
        />{" "}
        <span className={styles.text}>Orar</span>
      </Link> */}
      </div>
    </>
  );
}
