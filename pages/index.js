import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

// import { useEffect } from "react";

// aici doar vedem daca e logat;
// daca nu, il trimitem la login care o sa fie pe /login
// daca da, il trimitem pe /dashboard

function loggedIn() {
  // TODO: verifica daca userul e logat
  // fetch checkvalid cu token-ul, daca e 200, return true else return false

  return false;
}

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (loggedIn()) {
      // router.push("/elev/dashboard");
    } else {
      // router.push("/login");
    }
  });

  return (
    <div
      style={{
        backgroundColor: "#fff",
      }}
    >
      <div className={styles.topbar}>
        <Head>
          <title>starcatalog</title>
        </Head>
        <div className={styles.topbarComponents}>
          <Image
            alt="github"
            src={require("@/public/icons/github.png")}
          ></Image>
          <Link className={styles.logInButton} href={"#"}>
            Logheaza-te
          </Link>
          <p>starcatalog</p>
        </div>
      </div>
      <div className={styles.Content}>
        <div className={styles.mainView}>
          <div className={styles.insideMainView}>
            <h1>Un catalog online modern</h1>
            <p>O nouă versiune a catalogului online, îmbunătățită, gratuită.</p>
            <div className={styles.scrollMainView}>
              <Image
                alt="scrollGif"
                src={require("@/public/gifs/scrolling_mousewheel 1.gif")}
              ></Image>
              <p>Scroll pentru a afla mai multe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
