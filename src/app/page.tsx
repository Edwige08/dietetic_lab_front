'use client'
import ButtonDisconnect from "@/components/ButtonDisconnect";
import ButtonGreen from "@/components/ButtonGreen";
import CardSection from "@/components/CardSection";
import { useUser } from "@/contexts/UserContext";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useUser();

  return (
    <div>
      <div className="flex flex-row pt-4 items-center justify-center md:hidden">
        <Image
          src="/logo_2.png"
          width={500}
          height={500}
          alt="Logo de Dietetic Lab"
          className="w-80 pt-3 pb-10"
        />
      </div>

      {!isAuthenticated &&
        <Link href="/signin" className="flex flex-col justify-center items-center pb-5">
          <ButtonGreen text="Se connecter" lucide={UserRound} />
        </Link>
      }

      <div className="flex flex-col px-5 lg:grid lg:grid-cols-3 xl:grid-cols-2 lg:gap-4">
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

      {isAuthenticated &&
        <div className="flex flex-col">
          <ButtonDisconnect />
        </div>
      }
    </div>
  );
}
