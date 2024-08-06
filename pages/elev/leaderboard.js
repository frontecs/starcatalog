import Image from "next/image";
import Navbar from "@/components/Elev/Navbar";
import styles from "@/styles/elev/Leaderboard.module.css";
import LongButton from "@/components/LongButton";
import Link from "next/link";

export default function Leaderboard() {
  return (
    <div>
      <Navbar url={"leaderboard"} />
      {/*<LongButton
        title={"Steven Montana"}
        subtitle={"Locul 1"}
        buttonText={""}
        func={() => {}}
      />*/}

      <div className={styles.container}>
        <Image
          className={styles.img}
          src={require("@/public/icons/podium.png")}
          width={200}
          alt="Leaderboard big icon"
        />
        <p className={styles.nowaybrah}>
          Trebuie ca cel putin 3 elevi sa-si distribuie media cu restul clasei
          in{" "}
          <Link
            style={{ textDecoration: "none", color: "orange" }}
            href="/elev/settings"
          >
            setari.
          </Link>
        </p>
      </div>
    </div>
  );
}
