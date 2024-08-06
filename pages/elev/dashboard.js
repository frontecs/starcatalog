import Navbar from "@/components/Elev/Navbar";
import styles from "@/styles/elev/Dashboard.module.css";
import Medie from "@/components/Elev/Dashboard/Medie";
import LastUpdates from "@/components/Elev/Dashboard/LastUpdates";
import CresteMedia from "@/components/Elev/Dashboard/CresteMedie";

export default function Dashboard() {
  return (
    <div style={{ paddingBottom: "1rem" }}>
      <Navbar url={"dashboard"} />
      <div className={styles.container}>
        <Medie />
        <LastUpdates />
      </div>
      <div className={styles.container}>
        <CresteMedia />
      </div>
    </div>
  );
}
