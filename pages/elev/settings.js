import { useEffect } from "react";
import LongButton from "@/components/LongButton";
import LongToggle from "@/components/LongToggle";
import Navbar from "@/components/Elev/Navbar";
import styles from "@/styles/Settings.module.css";

export default function Settings() {
  function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  function daShareMedie(setIsToggled, setIsDisabled) {
    setIsDisabled(true);
    fetch("/api/elev/getShareMedie", {
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
        setIsToggled(data.enabled);
        setIsDisabled(false);
      });
  }

  return (
    <div>
      <Navbar url={"settings"} />
      <div className={styles.container}>
        <LongButton
          title={"Log Out"}
          subtitle={"Această acțiune te va deloga de pe cont!"}
          buttonText={"Confirmă"}
          func={logout}
        />
        <LongToggle
          title={"Distribuie media ta cu restul clasei"}
          subtitle={"Aceasta va fi folosită pentru clasament."}
          isEnabled={(setIsToggled, setIsDisabled) => {
            useEffect(() => {
              daShareMedie(setIsToggled, setIsDisabled);
            }, []);
          }}
          func={(on, setIsToggled, setIsDisabled) => {
            setIsDisabled(true);
            fetch("/api/elev/setShareMedie", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                set: on ? "true" : "false",
                token: localStorage.getItem("access_token"),
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  console.log(data.error);
                } else {
                  setIsDisabled(false);
                  setIsToggled(on);
                  console.log(data);
                }
              });
          }}
        />
      </div>
    </div>
  );
}
