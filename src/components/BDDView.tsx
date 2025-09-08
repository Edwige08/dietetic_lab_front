'use client'

import { useState } from "react";
import FoodColapse from "./FoodColapse";
import TitleTwo from "./TitleTwo";
import { FoodDetails, PersonnalDB } from "@/types/FoodDB";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function BDDView(props: { databaseName: string, databaseFood: FoodDetails[], dbId: number }) {
    const [userDatabases, setUserDatabases] = useState<PersonnalDB[]>([]);
    const [message, setMessage] = useState<string>();

    const router = useRouter();
    const { isAuthenticated } = useUser();

    async function deleteUserDB(databaseId: number) {
        setMessage("");

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour supprimer une base de données");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/personal-databases/${databaseId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            console.log("✅ Base de données supprimée avec succès");

            setUserDatabases(prev =>
                prev.filter(db => db.id !== databaseId || [])
            );

            setMessage("Base de données supprimée avec succès !");
            router.push('/personnalProfile');
            return true;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            console.log(errorMessage);
            setMessage(`Erreur lors de la suppression : ${errorMessage}`);
            return false;
        }
    }

    const handleDeleteDB = (databaseId: number, databaseTitle: string) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la base "${databaseTitle}" ?`)) {
            deleteUserDB(databaseId);
        }
    };

    const removeFood = () => {
        alert("La suppression d'un aliment de votre base de données n'est pas paramétrée pour le moment")
    }

    const handleUpdateDB = (databaseId: number) => {
        router.push(`/personnalProfile/personnalDB/${databaseId}`)
    }

    return (
        <div>
            <div className="border p-2">
                {message &&
                    <div className="flex flex-col items-center m-auto px-5 py-2 w-fit rounded-sm bg-(--grayLightColor)">{message}</div>
                }
                <div className="flex flex-col items-center">
                    <TitleTwo text={props.databaseName} />
                </div>
                <div className="flex flex-row justify-center gap-4 p-2">

                    <button type="button" onClick={() => handleUpdateDB(props.dbId)} className="border rounded-lg w-30 py-1 bg-(--blueLightColor) hover:underline" >Modifier</button>
                    <button type="button" onClick={() => handleDeleteDB(props.dbId, props.databaseName)} className="border rounded-lg w-30 bg-(--redLightColor) hover:underline">Supprimer</button>
                </div>
                {props.databaseFood.map((food, index) => (

                    <FoodColapse
                        key={index}
                        food={food.title}
                        calories={food.calories_kcal}
                        protein={food.proteins}
                        fats={food.fats}
                        carbohydrates={food.carbohydrates}
                        fibers={food.fibers}
                        sugar={food.sugars}
                        ags={food.ags}
                        agmi={food.agmi}
                        agpi={food.agpi}
                        cholesterol={food.cholesterol}
                        alcohol={food.alcohol}
                        sodium={food.sodium}
                        potassium={food.potassium}
                        phosphorus={food.phosphorus}
                        iron={food.iron}
                        calcium={food.calcium}
                        vitamin_d={food.vitamin_d}
                        onClick={() => removeFood()}
                    />
                ))}
            </div>
        </div>
    )
}