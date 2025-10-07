'use client'

import { useEffect, useState } from "react";
import FoodColapse from "./FoodColapse";
import TitleTwo from "./TitleTwo";
import { FoodDetails, FoodBase } from "@/types/FoodDB";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function BDDView(props: { databaseName: string, databaseFood: FoodDetails[], dbId: number }) {
    const [userDatabases, setUserDatabases] = useState<FoodBase[]>([]);
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentFood, setCurrentFood] = useState<FoodDetails[]>(props.databaseFood);

    const router = useRouter();
    const { isAuthenticated } = useUser();



    async function deleteUserDB(databaseId: number) {
        setMessage("");
        setIsLoading(true);

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour supprimer une base de données");
            setIsLoading(false);
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


            setUserDatabases(prev =>
                prev.filter(db => db.id !== databaseId || [])
            );

            setMessage("Base de données supprimée avec succès !");
            router.push('/personnalProfile');
            setIsLoading(false);
            return true;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(`Erreur lors de la suppression : ${errorMessage}`);
            setIsLoading(false);
            return false;
        }
    }

    async function deleteFood(foodId: number) {
        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour supprimer une base de données");
            return;
        }

        console.log("je rentre dans deleteFood");

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/foods/${foodId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            setCurrentFood(prev => prev.filter(food => food.id !== foodId));
            setMessage("Aliment supprimé avec succès !");
            // AJOUTER LA MISE A JOUR DU USESTATE

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(errorMessage);
            console.log(errorMessage);

            return false;
        }
    }

    const handleDeleteDB = (databaseId: number, databaseTitle: string) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la base "${databaseTitle}" ?`)) {
            deleteUserDB(databaseId);
        }
    };

    const removeFood = (foodId: number) => {
        console.log("je rentre dans removeFood");

        if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet aliment ?`)) {
            console.log("je valide la suppression");
            deleteFood(foodId);
        }
    }

    const handleUpdateDB = (databaseId: number) => {
        router.push(`/personnalProfile/foodBase/${databaseId}`)
    }

    useEffect(() => {
        setCurrentFood(props.databaseFood);
    }, [deleteFood]);

    return (
        <div>
            <div className="p-2">
                {message &&
                    <div className="flex flex-col items-center m-auto px-5 py-2 w-fit rounded-sm bg-(--grayLightColor)">{message}</div>
                }
                <div className="flex flex-col items-center">
                    <TitleTwo text={props.databaseName} />
                </div>
                <div className="flex flex-row justify-center gap-4 p-2">
                    <button type="button" onClick={() => handleUpdateDB(props.dbId)} className="border rounded-lg w-30 py-1 bg-(--greenLightColor) hover:underline" >Modifier</button>
                    <button type="button" onClick={() => handleDeleteDB(props.dbId, props.databaseName)} className="border rounded-lg w-30 bg-(--redLightColor) hover:underline">Supprimer</button>
                </div>
                {currentFood.map((food, index) => (

                    <FoodColapse
                        key={index}
                        alim_nom_fr={food.alim_nom_fr}
                        energie_reg_ue_kcal={food.energie_reg_ue_kcal}
                        proteines={food.proteines}
                        lipides={food.lipides}
                        glucides={food.glucides}
                        fibres={food.fibres}
                        sucres={food.sucres}
                        ags={food.ags}
                        agmi={food.agmi}
                        agpi={food.agpi}
                        cholesterol={food.cholesterol}
                        alcool={food.alcool}
                        sodium={food.sodium}
                        potassium={food.potassium}
                        phosphore={food.phosphore}
                        fer={food.fer}
                        calcium={food.calcium}
                        vitamine_d={food.vitamine_d}
                        onClick={() => removeFood(food.id)}
                    />
                ))}
            </div>
        </div>
    )
}