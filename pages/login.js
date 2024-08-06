import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/Login.module.css";

export default function Login() {
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const response = await fetch(`/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const resolvedPromise = await response.json();
      if (resolvedPromise.data.user == null)
        return setSubtitle("Email sau parola gresita!");
      if (resolvedPromise.data.session == null) return;
      localStorage.setItem(
        "access_token",
        resolvedPromise.data.session.access_token
      );
      if (
        resolvedPromise.userData != null &&
        resolvedPromise.userData.materie.length > 0
      ) {
        console.log("Utilizatorul e profesor");
        router.push("/profesor/dashboard");
      } else {
        console.log("Utilizatorul e elev");
        router.push("/elev/dashboard");
      }
    }
  }

  const [subtitle, setSubtitle] = useState(
    "Logheaza-te pentru a accesa catalogul!"
  );

  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>
          Bine ai venit pe <span style={{ color: "orange" }}>starcatalog</span>!
        </p>
        <p className={styles.subtitle}>{subtitle}</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <p style={{ margin: 0 }}>Email</p>
          <input
            name="email"
            placeholder="Introdu adresa de e-mail"
            style={{ color: "black" }}
          />
          <br />
          <p style={{ margin: 0 }}>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Introdu parola contului"
            style={{ color: "black" }}
          />
          <button type="submit">Continuă</button>
        </form>

        <p className={styles.subtitle} style={{ marginBottom: 0 }}>
          Nu ai cont? Contacteaza administratorul pentru a-ti crea unul!
        </p>
      </div>
    </>
  );
}
