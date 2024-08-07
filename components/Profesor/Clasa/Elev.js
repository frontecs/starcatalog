import LongButton from "@/components/LongButton";
export default function Elev({ nume, prenume, medie }) {
  return (
    <div>
      <LongButton
        title={`${nume} ${prenume}`}
        subtitle={`Medie: ${medie}`}
        buttonText={"Acceseaza"}
        func={() => {}}
      />
    </div>
  );
}
