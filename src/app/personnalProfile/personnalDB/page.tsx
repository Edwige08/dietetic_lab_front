'use client'

import BDDCreation from "@/components/BDDCreation";
import BDDView from "@/components/BDDView";
import Title from "@/components/Title";
import { useUser } from "@/contexts/UserContext";
import { PersonnalDB } from "@/types/FoodDB";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

    const [userDatabases, setUserDatabases] = useState<PersonnalDB[]>();
    const [message, setMessage] = useState<string>();

    const router = useRouter();
    const { isAuthenticated } = useUser();

    async function getUserDB() {
        setMessage("");

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour créer une base de données");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/personal-databases/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log("🎁🎁 data : ", data.results);
            setUserDatabases(data.results);

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            console.log(errorMessage);
        }
    }
    
    useEffect(() => {
        if (isAuthenticated) getUserDB();
    }, [isAuthenticated]);

    const goBackProfile = () => {
        if (window.confirm(`Avez-vous bien terminé d'ajouter des aliments à votre base ?`)) {
            router.push('/personnalProfile')
        }
    }

    return (
        <div className="flex flex-col items-center">
            <button type="button" className="border py-2 px-5 rounded-lg bg-(--redLightColor)" onClick={() => goBackProfile()}>

                Retour profil
            </button>
            <div className="px-4 mx-3 w-[90%] md:w-[75%]">
                <Title text="Ma base de données alimentaires" />
            </div>

            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                {message && <div>{message}</div>}
                {userDatabases && userDatabases.length === 0 ?
                    <BDDCreation />
                    :
                    <div>
                        {userDatabases && userDatabases.map((db) => (

                            <BDDView
                                databaseName={db.title}
                                databaseFood={db.foods}
                                dbId={db.id}
                                key={db.id}
                            />
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}