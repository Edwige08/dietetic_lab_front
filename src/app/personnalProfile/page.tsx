'use client'

import CardSection from "@/components/CardSection";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";
import Title from "@/components/Title";
import ButtonDisconnect from "@/components/ButtonDisconnect";
import { LogOut } from "lucide-react";

export default function Home() {
    const { isAuthenticated, loading } = useUser();
    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!isAuthenticated) {
        return <div>Vous n&apos;êtes pas connecté</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <div className="flex flex-col mt-10 justify-center items-center">
                    <Title text="Mon profil" />
                </div>
                <div className="flex flex-col px-5 lg:grid lg:grid-cols-3 xl:grid-cols-2 lg:gap-4">
                    <Link href={"/personnalProfile/personnalInformations"}>
                        <CardSection
                            emoji="👩‍💻"
                            bgColor="bg-(--grayLightColor)"
                            title="Mes informations personnelles"
                            description="Modifier mes informations personnelles ou supprimer mon compte"
                        />
                    </Link>
                    <Link href={"/personnalProfile/personnalDB"}>
                        <CardSection
                            emoji="📝"
                            bgColor="bg-(--grayLightColor)"
                            title="Ma base de données nutritionnelles"
                            description="Créer ou modifier ma base de donneés nutritionnelles, utilisée pour le calcul des ingesta"
                        />
                    </Link>
                    <Link href={"/personnalProfile/writeMessage"}>
                        <CardSection
                            emoji="📨"
                            bgColor="bg-(--grayLightColor)"
                            title="Ecrire un message à Dietetic Lab"
                            description="Faire un retour à la développeuse concernant l'application"
                        />
                    </Link>
                </div>

                <ButtonDisconnect text="Déconnexion" lucide={LogOut} />

            </div>
        </div>
    )
}