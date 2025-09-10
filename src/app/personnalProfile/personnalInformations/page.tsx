'use client';

import Title from "@/components/Title";
import { useUser } from "@/contexts/UserContext";
import { UserInformations } from "@/types/users";
import { getDate } from "@/utils/GetDate";
import { useEffect, useState } from "react";

export default function Home() {
    const { isAuthenticated, user } = useUser();

    const [formData, setFormData] = useState<UserInformations>({ id: 0, firstname: "", lastname: "", gender: "", mail: "", is_dietetician: false, created_at: "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getUserInformations() {
        setIsLoading(true);
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
            setIsLoading(false);
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
                    <div>Chargement...</div>
                    :
                    <div>
                        <p><span className="underline">Nom</span> : {formData.lastname}</p>
                        <p><span className="underline">Prénom</span> : {formData.firstname}</p>
                        <p><span className="underline">Email</span> : {formData.mail}</p>
                        <p><span className="underline">Diététicien.ne</span> : {formData.is_dietetician ? "oui" : "non"}</p>
                        <p><span className="underline">Compte créé le</span> : {getDate(formData.created_at)}</p>
                    </div>
                }
            </div>
        </div>
    )
}