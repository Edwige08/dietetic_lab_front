'use client'

import { useState } from "react";
import TitleTwo from "./TitleTwo";
import { useUser } from "@/contexts/UserContext";
import { FoodDetails, PersonnalDB } from "@/types/FoodDB";
import FoodColapse from "./FoodColapse";
import BDDCreationStepOne from "./BDDCreationStepOne";
import BDDCreationStepTwo from "./BDDCreationStepTwo";
import { scrollToTop } from "@/utils/ScrollToTop";
import ButtonGreen from "./ButtonGreen";
import { Check } from "lucide-react";
import Link from "next/link";

export default function BDDCreation() {
    const [stepTwo, setStepTwo] = useState<boolean>(false);
    const [databaseName, setDatabaseName] = useState<string>("");
    const [databaseDetails, setDatabaseDetails] = useState<PersonnalDB>({ id: 0, title: "", foods: [] })
    const [message, setMessage] = useState<string>();
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
        personal_db: 0,
    })

    const { isAuthenticated } = useUser();

    const handleChangeDBName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setDatabaseName(value);
    }

    async function handleSubmitStepOne(event: React.FormEvent) {
        event.preventDefault();
        setMessage("");

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour créer une base de données");
            return;
        }

        if (databaseName === "") {
            setMessage("Vous devez entrer un nom");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/personal-databases/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title: databaseName })
            })
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || data.message || `Erreur ${response.status}`)
            }

            setMessage("✅ Base de données créée avec succès !");
            setFoodDetails(prev => ({
                ...prev,
                personal_db: data.id
            }))
            setDatabaseDetails(prev => ({
                ...prev,
                id: data.id,
                title: databaseName,
            }))
            setStepTwo(true);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "❌ Une erreur est survenue lors de la création de la base de donneés"
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

    async function handleSubmitStepTwo(event: React.FormEvent) {
        event.preventDefault();
        setMessage("");

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour créer une base de données");
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
            setDatabaseDetails(prev => ({
                ...prev,
                foods: [...prev.foods, foodDetails]
            }))
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
                personal_db: databaseDetails.id,
            })
            scrollToTop();

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "❌ Une erreur est survenue lors de la création de l'aliment"
            setMessage(errorMessage);
        }
    }

    const removeFood = () => {
        alert("La suppression d'un aliment de votre base de données n'est pas paramétrée pour le moment")
    }

    return (
        <div className="border p-2">
            {message &&
                <div className="flex flex-col items-center m-auto px-5 py-2 w-fit rounded-sm bg-(--grayLightColor)">{message}</div>
            }
            {!stepTwo ?
                <BDDCreationStepOne
                    onSubmit={handleSubmitStepOne}
                    value={databaseName}
                    onChange={handleChangeDBName}
                />
                :
                <>
                    <BDDCreationStepTwo
                        onSubmit={handleSubmitStepTwo}
                        onchange={handleChangeFoodDetails}
                        databaseName={databaseName}
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
                    />

                    {databaseDetails.foods.length > 0 &&
                        <div>
                            <TitleTwo text={`Aliments ajoutés dans "${databaseName}" :`} />
                            {databaseDetails.foods.map((food, index) => {
                                return (
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
                                )
                            })}
                            <Link href="/personnalProfile/personnalDB" className="flex flex-row justify-center pt-5">
                                <ButtonGreen text="Terminer" lucide={Check} />
                            </Link>
                        </div>
                    }
                </>
            }
        </div>
    )
}