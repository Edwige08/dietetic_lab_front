'use client'

import CardSection from "@/components/CardSection";
import CardSectionSimple from "@/components/CardSectionSimple";
import TitleTwo from "@/components/TitleTwo";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const { isAuthenticated, loading, logout } = useUser();
    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <div>Vous n&apos;êtes pas connecté</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row pt-4 items-center justify-center">
                <Image
                    src="/logo_and_text.png"
                    width={500}
                    height={500}
                    alt="Logo de Dietetic Lab"
                    className="w-80 pt-3 pb-10"
                />
            </div>
            <div className="flex flex-col px-5">
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
            <div className="flex flex-col px-5">
                <div className="flex flex-col mt-10 justify-center items-center">
                    <TitleTwo text="⚙️ Configuration ⚙️" />
                </div>
                <Link href={"/personnalProfile/personnalDB"}>
                    <CardSectionSimple
                        emoji="📝"
                        title="Ma base de données nutritionnelles"
                        description="Créer ou modifier ma base de donneés nutritionnelles, utilisée pour le calcul des ingesta"
                    />
                </Link>
                <Link href={"/personnalProfile/personnalInformations"}>
                    <CardSectionSimple
                        emoji="👩‍💻"
                        title="Mes informations personnelles"
                        description="Modifier mes informations personnelles ou supprimer mon compte"
                    />
                </Link>
                <Link href={"/personnalProfile/writeMessage"}>
                    <CardSectionSimple
                        emoji="📨"
                        title="Ecrire un message à Dietetic Lab"
                        description="Faire un retour à la développeuse concernant l'application"
                    />
                </Link>
                <div className="flex flex-col justify-center py-5 m-auto">
                    <button
                        type="button"
                        onClick={logout}
                        className="btn text-lg rounded-xl h-13 bg-(--redColor) shadow-lg text-white hover:bg-(--greenSecondColor) cursor-pointer "
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    )
}