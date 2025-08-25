import CardSection from "@/components/CardSection";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center ">
        <img src="/logo_image_fond.png" alt="logo de Dietetic Lab" className="w-20" />
        <h1 className="text-2xl font-bold mb-5">Bienvenue sur Dietetic Lab !</h1>
        <p className="text-lg mb-5">Que voulez-vous faire aujourd'hui ?</p>
      </div>

      <div className="flex flex-col gap-1">
        <Link href={"/imc"}>
          <CardSection
            bgColor="bg-(--orangeColor)"
            emoji="🥝"
            title="Indice de Masse Corporelle"
            description="Calculer et interpréter l'IMC pour un adulte"
          />
        </Link>

        <Link href={"/dej"}>
          <CardSection
            emoji="🍌"
            bgColor="bg-(--greenColor)"
            title="Besoins nutritionnels"
            description="Calculer les besoins quotidiens en énergie et nutriments"
          />
        </Link>

        <Link href={"/undernutrition"}>
          <CardSection
            emoji="🥥"
            bgColor="bg-(--redColor)"
            title="Dénutrition"
            description="Dépiser la dénutrition et déterminer sa sévérité"
          />
        </Link>

        <Link href={"/sri"}>
          <CardSection
            emoji="🍓"
            bgColor="bg-(--yellowColor)"
            title="Syndrome de Renutrition Inapropriée"
            description="Evaluer le risque de SRI d'un patient"
          />
        </Link>
      </div>
    </div>
  );
}
