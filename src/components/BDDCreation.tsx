'use client'

import { useState } from "react";
import TitleTwo from "./TitleTwo";
import { useUser } from "@/contexts/UserContext";
import { FoodDetails, FoodBase } from "@/types/FoodDB";
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
    const [databaseDetails, setDatabaseDetails] = useState<FoodBase>({ id: 0, title: "", foods: [] })
    const [message, setMessage] = useState<string>();
    const [foodDetails, setFoodDetails] = useState<FoodDetails>({
        id: 0,
        alim_nom_fr: "",
        energie_reg_ue_kcal: 0,
        proteines: 0,
        lipides: 0,
        glucides: 0,
        sucres: 0,
        fibres: 0,
        ags: 0,
        agmi: 0,
        agpi: 0,
        cholesterol: 0,
        alcool: 0,
        sodium: 0,
        potassium: 0,
        phosphore: 0,
        fer: 0,
        calcium: 0,
        vitamine_d: 0,
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

        if (foodDetails.alim_nom_fr === "") {
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

            if (!response.ok) {
                throw new Error(data.message || 'Erreur pour créer un aliment')
            }

            setMessage(`✅ ${foodDetails.alim_nom_fr} a bien été ajouté à votre base`);
            setDatabaseDetails(prev => ({
                ...prev,
                foods: [...prev.foods, foodDetails]
            }))
            setFoodDetails({
                id: 0,
                alim_nom_fr: "",
                energie_reg_ue_kcal: 0,
                proteines: 0,
                lipides: 0,
                glucides: 0,
                sucres: 0,
                fibres: 0,
                ags: 0,
                agmi: 0,
                agpi: 0,
                cholesterol: 0,
                alcool: 0,
                sodium: 0,
                potassium: 0,
                phosphore: 0,
                fer: 0,
                calcium: 0,
                vitamine_d: 0,
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
                        titleValue={foodDetails.alim_nom_fr}
                        caloriesValue={foodDetails.energie_reg_ue_kcal}
                        proteinsValue={foodDetails.proteines}
                        fatsValue={foodDetails.lipides}
                        agsValue={foodDetails.ags}
                        agmiValue={foodDetails.agmi}
                        agpiValue={foodDetails.agpi}
                        cholesterolValue={foodDetails.cholesterol}
                        carbohydratesValue={foodDetails.glucides}
                        sugarsValue={foodDetails.sucres}
                        fibersValue={foodDetails.fibres}
                        alcoholValue={foodDetails.alcool}
                        sodiumValue={foodDetails.sodium}
                        potassiumValue={foodDetails.potassium}
                        phosphorusValue={foodDetails.phosphore}
                        ironValue={foodDetails.fer}
                        calciumValue={foodDetails.calcium}
                        vitamin_dValue={foodDetails.vitamine_d}
                    />

                    {databaseDetails.foods.length > 0 &&
                        <div>
                            <TitleTwo text={`Aliments ajoutés dans "${databaseName}" :`} />
                            {databaseDetails.foods.map((food, index) => {
                                return (
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
                                        onClick={() => removeFood()}
                                    />
                                )
                            })}
                            <Link href="/personnalProfile/foodBase" className="flex flex-row justify-center pt-5">
                                <ButtonGreen text="Terminer" lucide={Check} />
                            </Link>
                        </div>
                    }
                </>
            }
        </div>
    )
}