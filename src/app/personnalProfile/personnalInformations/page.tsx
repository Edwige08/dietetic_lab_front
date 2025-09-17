'use client';

import Title from "@/components/Title";
import { useUser } from "@/contexts/UserContext";
import { UserInformations } from "@/types/users";
import { getDate } from "@/utils/GetDate";
import { useEffect, useState } from "react";

export default function Home() {
    const { isAuthenticated, user, logoutToSignInPage } = useUser();

    const [formData, setFormData] = useState<UserInformations>({ id: 0, firstname: "", lastname: "", gender: "", mail: "", is_dietetician: false, created_at: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    async function getUserInformations() {
        setIsLoading(true);
        setMessage("");
        if (!isAuthenticated) return;

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/users/${user?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            const data = await response.json();
            setFormData(data);
            setIsLoading(false);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            console.log(errorMessage);
            setIsLoading(false);
            setMessage(errorMessage);
        }
    }

    useEffect(() => {
        if (isAuthenticated) getUserInformations();
    }, [isAuthenticated === true]);

    return (
        <div className="flex flex-col items-center">
            <Title text="Vos informations personnelles" />
            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                {isLoading ?
                    <div className="py-40 text-center text-xl">Chargement...</div>
                    :
                    <div>
                        {message ?
                            <div className="flex flex-col gap-6 items-center min-h-55 text-lg">
                                <p>
                                    {message}
                                </p>
                                <p className="text-center">
                                    Impossibilité de charger les données. <br />
                                    Merci de vous reconnecter en cliquant sur le bouton ci-dessous&nbsp;:
                                </p>
                                <button onClick={logoutToSignInPage} className="border rounded-lg px-4 py-1 bg-(--orangeColor)">
                                    Page de connexion
                                </button>
                            </div>
                            :
                            <div>
                                <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Nom : </span><span>{formData.lastname}</span></p>
                                <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Prénom : </span><span>{formData.firstname}</span></p>
                                <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Email : </span><span>{formData.mail}</span></p>
                                <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Diététicien.ne : </span><span>{formData.is_dietetician ? "oui" : "non"}</span></p>
                                <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Compte créé le : </span><span>{getDate(formData.created_at)}</span></p>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}