'use client'

import BDDCreation from "@/components/BDDCreation";
import BDDView from "@/components/BDDView";
import Title from "@/components/Title";
import { useUser } from "@/contexts/UserContext";
import { FoodBase } from "@/types/FoodDB";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

    const [userDatabases, setUserDatabases] = useState<FoodBase[]>();
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const { isAuthenticated } = useUser();

    async function getUserDB() {
        setMessage("");
        setIsLoading(true);

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour créer une base de données");
            setIsLoading(false);
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

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            const data = await response.json();
            setUserDatabases(data.results);
            setIsLoading(false);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setIsLoading(false);
        }
    }

    useEffect(() => {
       getUserDB();
    }, [isAuthenticated]);

    return (
        <div className="flex flex-col items-center">
            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                {isLoading ?
                    <div className="py-40 text-center text-xl">Chargement...</div>
                    :
                    <div className="flex flex-col items-center">
                        <div className="px-4 mx-3 w-[90%] md:w-[75%]">
                            <Title text="Ma base alimentair" />
                        </div>

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
                }
            </div>
        </div>

    )
}