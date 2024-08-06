import LongButton from "@/components/LongButton";
import Navbar from "@/components/Profesor/Navbar";
import styles from "@/styles/Settings.module.css";

export default function Settings() {
  function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
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
      </div>
    </div>
  );
}
