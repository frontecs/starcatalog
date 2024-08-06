import LongButton from "@/components/LongButton";
export default function Clasa({ clasa, diriginte, id }) {
  return (
    <div>
      <LongButton
        title={`Clasa ${clasa}`}
        subtitle={`Diriginte: ${diriginte}`}
        buttonText={"Acceseaza"}
        func={`/profesor/clasa?clasa=${id}`}
        islink={true}
      />
    </div>
  );
}
