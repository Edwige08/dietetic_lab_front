'use client'

import { useEffect, useState } from "react";
import FoodColapse from "./FoodColapse";
import TitleTwo from "./TitleTwo";
import { FoodDetails, FoodBase } from "@/types/FoodDB";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import ButtonGreen from "./ButtonGreen";
import ButtonRed from "./ButtonRed";
import FoodCreation from "./FoodCreation";
import { Pencil, Trash2 } from "lucide-react";

export default function BDDView(props: { databaseName: string, databaseFood: FoodDetails[], dbId: number }) {
    const initialFormData = {
        alim_nom_fr: "",
        energie_reg_ue_kcal: "0",
        proteines: "0",
        lipides: "0",
        ags: "0",
        agmi: "0",
        agpi: "0",
        cholesterol: "0",
        glucides: "0",
        sucres: "0",
        fibres: "0",
        alcool: "0",
        sodium: "0",
        potassium: "0",
        phosphore: "0",
        fer: "0",
        calcium: "0",
        vitamine_d: "0",
        personal_db: props.dbId
    }

    const [userDatabases, setUserDatabases] = useState<FoodBase[]>([]);
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentFood, setCurrentFood] = useState<FoodDetails[]>(props.databaseFood);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialFormData);

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
            setMessage("🗑️ Aliment supprimé avec succès !");

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(errorMessage);
            return false;
        }
    }

    const handleDeleteDB = (databaseId: number, databaseTitle: string) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la base "${databaseTitle}" et ses ${currentFood.length} aliments ?`)) {
            deleteUserDB(databaseId);
        }
    };

    const removeFood = (foodId: number) => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer cet aliment ?`)) {
            deleteFood(foodId);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/foods/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`);
            }

            // Récupérer la liste mise à jour des aliments
            const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/personal-databases/${props.dbId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!updatedResponse.ok) {
                throw new Error(`❌ Erreur lors de la récupération de la liste mise à jour`);
            }

            const updatedData = await updatedResponse.json();
            setCurrentFood(updatedData.foods);
            setIsModalOpen(false);
            setMessage(`✅ "${formData.alim_nom_fr}" ajouté avec succès !`);
            setFormData(initialFormData);
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(`❌ ${errorMessage}`);
        }
    };

    const handleUpdateDB = () => {
        setMessage("");
        setIsModalOpen(true);
    }

    useEffect(() => {
        setCurrentFood(props.databaseFood);
    }, [props.databaseFood]);

    return (
        <div>
            <div className="p-2">
                {isLoading ?
                    <div className="py-10 text-center text-xl">Chargement...</div>
                    :
                    <div>
                        {message &&
                            <div className="flex flex-col items-center m-auto px-5 py-2 w-fit rounded-sm bg-(--grayLightColor)">{message}</div>
                        }
                        <div className="flex flex-col items-center">
                            <TitleTwo text={props.databaseName} />
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
                        <div className="flex flex-col justify-center gap-4 pt-10 p-2 md:flex-row">
                            <ButtonGreen lucide={Pencil} text="Ajouter un aliment" onClick={handleUpdateDB} />
                            <ButtonRed lucide={Trash2} text="Supprimer la base" onClick={() => handleDeleteDB(props.dbId, props.databaseName)} />
                        </div>
                    </div>
                }
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative bg-white rounded-lg shadow-xl w-[95%] md:w-[80%] max-w-4xl my-8">
                        <div className="sticky top-0 bg-white p-4 border-b border-gray-300 z-10 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold">Ajouter un aliment</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 p-2"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="pb-6 px-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
                            <FoodCreation
                                onSubmit={handleSubmit}
                                databaseName={props.databaseName}
                                alim_nom_fr={formData.alim_nom_fr}
                                energie_reg_ue_kcal={formData.energie_reg_ue_kcal}
                                proteines={formData.proteines}
                                lipides={formData.lipides}
                                ags={formData.ags}
                                agmi={formData.agmi}
                                agpi={formData.agpi}
                                cholesterol={formData.cholesterol}
                                glucides={formData.glucides}
                                sucres={formData.sucres}
                                fibres={formData.fibres}
                                alcool={formData.alcool}
                                sodium={formData.sodium}
                                potassium={formData.potassium}
                                phosphore={formData.phosphore}
                                fer={formData.fer}
                                calcium={formData.calcium}
                                vitamine_d={formData.vitamine_d}
                                onchange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            )
            }


        </div >
    )
}