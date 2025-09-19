'use client'
import CardSection from "@/components/CardSection";
import { useUser } from "@/contexts/UserContext";
import { LogOut } from "lucide-react";
import Link from "next/link";
import ButtonDisconnect from "@/components/ButtonDisconnect";
import Title from "@/components/Title";

export default function Home() {
  const { isAuthenticated } = useUser();

  return (
    <div>

      <div className="px-10 pb-5 md:pt-5 md:pb-10">
        <Title text="Le laboratoire diététique" />
        <p className="text-center">Une plateforme complète d&apos;outils de <span className="font-bold">calcul</span> et d&apos;<span className="font-bold">évaluation nutritionnelle</span> destinée au <span className="font-bold">professionnels de la nutrition</span></p>
      </div>

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
          <ButtonDisconnect text="Déconnexion" lucide={LogOut} />
        </div>
      }
    </div>
  );
}
