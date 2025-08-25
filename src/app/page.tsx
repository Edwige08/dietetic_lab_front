import CardSection from "@/components/CardSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center ">
        <Image
          src="/logo_image_fond.png"
          width={500}
          height={500}
          alt="Logo de Dietetic Lab"
          className="w-20"
        />
        <h1 className="text-2xl font-bold mb-5">Bienvenue sur Dietetic Lab !</h1>
        <p className="text-lg mb-5">Que voulez-vous faire aujourd&apos;hui ?</p>
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
            description="Calculer la dépense énergétique journalière pour un adulte"
          />
        </Link>

        <Link href={"/undernutrition"}>
          <CardSection
            emoji="🥥"
            bgColor="bg-(--redColor)"
            title="Dénutrition"
            description="Dépiser la dénutrition chez la personne de plus de 18 ans et déterminer sa sévérité"
          />
        </Link>

        <Link href={"/sri"}>
          <CardSection
            emoji="🍓"
            bgColor="bg-(--yellowColor)"
            title="SRI"
            description="Evaluer le risque de syndrome de renutrition inappropriée d'un patient"
          />
        </Link>

        <Link href={"/ingesta"}>
          <CardSection
            emoji="🍍"
            bgColor="bg-(--blueColor)"
            title="Ingesta"
            description="Calculer les ingesta d'un patient grâce à la table de composition nutritionnelle du Ciqual"
          />
        </Link>
      </div>
    </div>
  );
}
