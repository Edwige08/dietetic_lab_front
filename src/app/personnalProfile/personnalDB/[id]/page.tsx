'use client';

import FoodColapse from "@/components/FoodColapse";
import FoodCreation from "@/components/FoodCreation";
import Title from "@/components/Title";
import TitleTwo from "@/components/TitleTwo";
import { useUser } from "@/contexts/UserContext";
import { FoodDetails, PersonnalDB } from "@/types/FoodDB";
import { scrollToTop } from "@/utils/ScrollToTop";
import { ChevronDown, ChevronUp } from "lucide-react";
import { use, useEffect, useState } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

export default function Home({ params }: Props) {
    const { isAuthenticated } = useUser();
    const resolvedParams = use(params);

    const [message, setMessage] = useState<string>();
    const [userDatabase, setUserDatabase] = useState<PersonnalDB>();
    const [seeAddFood, setSeeAddFood] = useState<boolean>(false);
    const [foodDetails, setFoodDetails] = useState<FoodDetails>({
        title: "",
        calories_kcal: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        sugars: 0,
        fibers: 0,
        ags: 0,
        agmi: 0,
        agpi: 0,
        cholesterol: 0,
        alcohol: 0,
        sodium: 0,
        potassium: 0,
        phosphorus: 0,
        iron: 0,
        calcium: 0,
        vitamin_d: 0,
        personal_db: parseInt(resolvedParams.id),
    });

    async function getPersonnalDB() {
        setMessage("");

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour modifier une base de données");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/personal-databases/${resolvedParams.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            const data = await response.json();
            console.log("🍌", data);
            setUserDatabase(data);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            console.log(errorMessage);
        }
    }

    useEffect(() => {
        if (isAuthenticated) getPersonnalDB();
    }, [isAuthenticated])

    const handleSeeAddFood = () => {
        setSeeAddFood(!seeAddFood);
    }

    async function handleSubmitStepTwo(event: React.FormEvent) {
        event.preventDefault();
        setMessage("");

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour ajouter un aliment");
            return;
        }

        if (foodDetails.title === "") {
            setMessage("Vous devez entrer un nom pour l'aliment");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/foods/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(foodDetails)
            })
            const data = await response.json();
            console.log("🔮 data step 2 : ", data);

            if (!response.ok) {
                throw new Error(data.message || 'Erreur pour créer un aliment')
            }

            setMessage(`✅ ${foodDetails.title} a bien été ajouté à votre base`);
            setUserDatabase(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    foods: [...prev.foods, foodDetails]
                }
            })
            setFoodDetails({
                title: "",
                calories_kcal: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                sugars: 0,
                fibers: 0,
                ags: 0,
                agmi: 0,
                agpi: 0,
                cholesterol: 0,
                alcohol: 0,
                sodium: 0,
                potassium: 0,
                phosphorus: 0,
                iron: 0,
                calcium: 0,
                vitamin_d: 0,
                personal_db: parseInt(resolvedParams.id),
            })
            scrollToTop();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "❌ Une erreur est survenue lors de la création de l'aliment"
            setMessage(errorMessage);
        }
    }

    const handleChangeFoodDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFoodDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const removeFood = () => { }
    return (
        <div className="flex flex-col items-center">
            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                {userDatabase ?
                    <div className=" p-2">
                        <Title text={`Modifier "${userDatabase?.title}"`} />
                        {message}
                        <button className="border p-2 rounded-lg min-w-60 bg-(--greenLightColor) " onClick={() => handleSeeAddFood()}>
                            {!seeAddFood ?
                                <p className="flex flex-row gap-2 items-center hover:underline"><ChevronDown /> Ajouter des aliments</p>
                                :
                                <p className="flex flex-row gap-2 items-center hover:underline"><ChevronUp /> Fermer l&apos;ajout d&apos;aliments</p>
                            }
                        </button>
                        {userDatabase && seeAddFood && <FoodCreation
                            onSubmit={handleSubmitStepTwo}
                            databaseName={userDatabase.title}
                            titleValue={foodDetails.title}
                            caloriesValue={foodDetails.calories_kcal}
                            proteinsValue={foodDetails.proteins}
                            fatsValue={foodDetails.fats}
                            agsValue={foodDetails.ags}
                            agmiValue={foodDetails.agmi}
                            agpiValue={foodDetails.agpi}
                            cholesterolValue={foodDetails.cholesterol}
                            carbohydratesValue={foodDetails.carbohydrates}
                            sugarsValue={foodDetails.sugars}
                            fibersValue={foodDetails.fibers}
                            alcoholValue={foodDetails.alcohol}
                            sodiumValue={foodDetails.sodium}
                            potassiumValue={foodDetails.potassium}
                            phosphorusValue={foodDetails.phosphorus}
                            ironValue={foodDetails.iron}
                            calciumValue={foodDetails.calcium}
                            vitamin_dValue={foodDetails.vitamin_d}
                            onchange={handleChangeFoodDetails}

                        />}

                        <TitleTwo text={`Aliments ajoutés dans "${userDatabase?.title}" :`} />
                        {userDatabase && userDatabase.foods.map((food, index) => (
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
                    :
                    <p className="text-center">Chargement...</p>
                }
            </div>
        </div >
    )
}