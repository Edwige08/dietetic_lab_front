import CardSection from "@/components/CardSection";
import Title from "@/components/Title";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row  pt-4 items-center justify-center">
        <Image
          src="/logo_and_text.png"
          width={500}
          height={500}
          alt="Logo de Dietetic Lab"
          className="w-80 pt-3 pb-10"
        />
        {/* <Image
          src="/logo_image_fond.png"
          width={500}
          height={500}
          alt="Logo de Dietetic Lab"
          className="w-30"
        />
        <Title text="Dietetic Lab"/> */}
        {/* <h1 className="text-center text-2xl md:text-3xl font-bold mb-5">Bienvenue sur Dietetic Lab&nbsp;!</h1> */}
        {/* <p className="md:text-lg mx-10 mb-3 text-center">
          Cette application est un outil de travail pour les professionnels de la nutrition.
          Il vous permet d&apos;évaluer de façon efficace l&apos;état de santé de vos patients
          (calcul d&apos;IMC, dépense énergétique journalière, évaluation de la dénutrition, du SRI, calcul des ingesta grâce aux données de la table du Ciqual). <br />
          Vous trouverez ci-dessous les outils proposés&nbsp;: </p>
        <p className="text-3xl mb-5">
          ⬇️
        </p> */}
        {/* <p className="text-lg mb-5">Que voulez-vous faire aujourd&apos;hui&nbsp;?</p> */}
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
      <div className="flex flex-row justify-center gap-3 p-5">
        <Link href="/about" className="hover:underline">A propos</Link>
        <p>-</p>
        <Link href="/faq" className="hover:underline">FAQ</Link>
        <p>-</p>
        <Link href="/work-in-progress" className="hover:underline">Vos retours</Link>
      </div>
    </div>
  );
}
