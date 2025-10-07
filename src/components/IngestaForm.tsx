'use client'

import React, { useEffect, useState } from "react";
import Input from "./Input";
import InputText from "./InputText";
import Title from "./Title";
import TitleTwo from "./TitleTwo";
import ButtonGreen from "./ButtonGreen";
import { ListPlus } from "lucide-react";
import IngestaResults from "./IngestaResults";
import IngestaColapse from "./IngestaColapse";
import { CiqualData, FoodDataWithQuantity, FoodWithQuantity } from "@/types/Ciqual";
import { CalculateCalories } from "@/utils/CalculateCaloriesFromNutrients";
import { adjustedValue } from "@/utils/AdjustedValue";
import { useUser } from "@/contexts/UserContext";

export default function IngestaForm() {
    const [foodWithQuantity, setFoodWithQuantity] = useState<FoodWithQuantity>({ food: "", quantity: 0 })
    const [ciqualAndDbData, setCiqualAndDbData] = useState<CiqualData[]>([]);
    const [searchResults, setSearchResults] = useState<CiqualData[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [foodList, setFoodList] = useState<FoodDataWithQuantity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { isAuthenticated } = useUser();

    // Fetch of the ciqual data and put it in "ciqualData" :
    async function fetchCiqualAndDB() {
        setIsLoading(true);
        setMessage("");

        try {
            const ciqualResponse = await fetch('/table_ciqual_2020.json');
            const dataCiqual = await ciqualResponse.json();

            let dataDb: CiqualData[] = [];

            if (isAuthenticated) {
                try {
                    const token = localStorage.getItem('access_token');

                    const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/foods`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    })

                    
                    if (dbResponse.ok) {
                        const dbData  = await dbResponse.json();
                        dataDb = dbData.results || [];
                    } else {
                        console.warn('Réponse BDD non OK:', dbResponse.status);
                    }

                } catch (dbError) {
                    console.warn('Erreur lors du chargement de la BDD : ', dbError);
                }

            }

            const mergedData = [...dataDb, ...dataCiqual];
            
            setCiqualAndDbData(mergedData);

        } catch (error) {
            console.error('Erreur au moment du chargement des données :', error);
            setMessage(`Erreur : ${error}`);

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCiqualAndDB();
    }, [isAuthenticated]);

    // Get the value entered in the inputs (food and quantity) :
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFoodWithQuantity(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value

        }))

        if (name === 'food') {
            searchFood(value);
        }
    };

    // List the ciqual food matching with what is writen in the input :
    function searchFood(query: string) {
        if (query.length < 3) {
            setSearchResults([])
            setShowSearchResults(false);
            return
        }

        const results = ciqualAndDbData.filter(food =>
            food.alim_nom_fr.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
        setShowSearchResults(true);
    }

    // Put the selected food in "foodWithQuantity" :
    const selectFood = (selectedFood: CiqualData) => {
        setFoodWithQuantity(prev => ({
            ...prev,
            food: selectedFood.alim_nom_fr
        }));

        setShowSearchResults(false);
        setSearchResults([]);
    }

    // Add a food and its quantity to the food list :
    const addFood = (event: React.FormEvent) => {
        event.preventDefault();

        if (!foodWithQuantity.food || foodWithQuantity.quantity <= 0) {
            alert("Veuillez sélectionner un aliment et lui associer une quantité");
            return;
        }

        const ciqualFood = ciqualAndDbData.find(food =>
            food.alim_nom_fr === foodWithQuantity.food
        );

        if (!ciqualFood) {
            alert('non');
            return;
        }

        const foodAdded: FoodDataWithQuantity = {
            quantity: foodWithQuantity.quantity,
            // "ag_butyrique": ciqualFood.ag_butyrique,
            // "ag_caproique": ciqualFood.ag_caproique,
            // "ag_caprylique": ciqualFood.ag_caprylique,
            // "ag_caprique": ciqualFood.ag_caprique,
            // "ag_laurique": ciqualFood.ag_laurique,
            // "ag_myristique": ciqualFood.ag_myristique,
            // "ag_palmitique": ciqualFood.ag_palmitique,
            // "ag_stearique": ciqualFood.ag_stearique,
            // "ag_oleique": ciqualFood.ag_oleique,
            // "ag_linoleique": ciqualFood.ag_linoleique,
            // "ag_alpha_linolenique": ciqualFood.ag_alpha_linolenique,
            // "ag_arachidonique": ciqualFood.ag_arachidonique,
            // "EPA": ciqualFood.EPA,
            // "DHA": ciqualFood.DHA,
            "agmi": ciqualFood.agmi,
            "agpi": ciqualFood.agpi,
            "ags": ciqualFood.ags,
            // "acides_organiques": ciqualFood.acides_organiques,
            "alcool": ciqualFood.alcool,
            // "amidon": ciqualFood.amidon,
            // "beta_carotene": ciqualFood.beta_carotene,
            "calcium": ciqualFood.calcium,
            // "cendres": ciqualFood.cendres,
            // "chlorure": ciqualFood.chlorure,
            "cholesterol": ciqualFood.cholesterol,
            // "cuivre": ciqualFood.cuivre,
            // "eau": ciqualFood.eau,
            // "energie_jones_avec_fibres_kj": `${ciqualFood.energie_jones_avec_fibres_kj === "" ? ciqualFood.energie_jones_avec_fibres_kj : CalculateJoules(parseFloat(ciqualFood.proteines), parseFloat(ciqualFood.lipides), parseFloat(ciqualFood.glucides), parseFloat(ciqualFood.alcool))}`,
            // "energie_jones_avec_fibres_kcal": `${ciqualFood.energie_jones_avec_fibres_kcal === "" ? ciqualFood.energie_jones_avec_fibres_kcal : CalculateCalories(parseFloat(ciqualFood.proteines), parseFloat(ciqualFood.lipides), parseFloat(ciqualFood.glucides), parseFloat(ciqualFood.alcool))}`,
            // "energie_reg_ue_kj": `${ciqualFood.energie_reg_ue_kj === "" ? ciqualFood.energie_reg_ue_kj : CalculateJoules(parseFloat(ciqualFood.proteines), parseFloat(ciqualFood.lipides), parseFloat(ciqualFood.glucides), parseFloat(ciqualFood.alcool))}`,
            "energie_reg_ue_kcal": `${(ciqualFood.energie_reg_ue_kcal === "" || ciqualFood.energie_reg_ue_kcal === "-") ? CalculateCalories(parseFloat(ciqualFood.proteines), parseFloat(ciqualFood.lipides), parseFloat(ciqualFood.glucides), parseFloat(ciqualFood.alcool)) : ciqualFood.energie_reg_ue_kcal}`,
            "fer": ciqualFood.fer,
            "fibres": ciqualFood.fibres,
            // "fructose": ciqualFood.fructose,
            // "galactose": ciqualFood.galactose,
            "glucides": ciqualFood.glucides,
            // "glucose": ciqualFood.glucose,
            // "iode": ciqualFood.iode,
            // "lactose": ciqualFood.lactose,
            "lipides": ciqualFood.lipides,
            // "magnesium": ciqualFood.magnesium,
            // "maltose": ciqualFood.maltose,
            // "manganese": ciqualFood.manganese,
            "phosphore": ciqualFood.phosphore,
            // "polyols": ciqualFood.polyols,
            "potassium": ciqualFood.potassium,
            "proteines": ciqualFood.proteines,
            // "proteines_jones": ciqualFood.proteines_jones,
            // "retinol": ciqualFood.retinol,
            // "saccharose": ciqualFood.saccharose,
            // "chlorure_de_sodium": ciqualFood.chlorure_de_sodium,
            "sodium": ciqualFood.sodium,
            "sucres": ciqualFood.sucres,
            // "selenium": ciqualFood.selenium,
            // "vitamine_b1": ciqualFood.vitamine_b1,
            // "vitamine_b2": ciqualFood.vitamine_b2,
            // "vitamine_b3": ciqualFood.vitamine_b3,
            // "vitamine_b5": ciqualFood.vitamine_b5,
            // "vitamine_b6": ciqualFood.vitamine_b6,
            // "vitamine_b9": ciqualFood.vitamine_b9,
            // "vitamine_b12": ciqualFood.vitamine_b12,
            // "vitamine_c": ciqualFood.vitamine_c,
            "vitamine_d": ciqualFood.vitamine_d,
            // "vitamine_e": ciqualFood.vitamine_e,
            // "vitamine_k1": ciqualFood.vitamine_k1,
            // "vitamine_k2": ciqualFood.vitamine_k2,
            // "zinc": ciqualFood.zinc,
            // "alim_code": ciqualFood.alim_code,
            // "alim_grp_code": ciqualFood.alim_grp_code,
            // "alim_grp_nom_fr": ciqualFood.alim_grp_nom_fr,
            "alim_nom_fr": ciqualFood.alim_nom_fr,
            // "alim_nom_sci": ciqualFood.alim_nom_sci,
            // "alim_ssgrp_code": ciqualFood.alim_ssgrp_code,
            // "alim_ssgrp_nom_fr": ciqualFood.alim_ssgrp_nom_fr,
            // "alim_ssssgrp_code": ciqualFood.alim_ssssgrp_code,
            // "alim_ssssgrp_nom_fr": ciqualFood.alim_ssssgrp_nom_fr,
        }

        setFoodList(prev => [...prev, foodAdded]);
        setFoodWithQuantity({ food: "", quantity: 0 })
    }

    // Remove a food from the food list :
    const removeFood = (index: number) => {
        setFoodList(prev => prev.filter((_, i) => i !== index))
    }

    const totals = foodList.reduce((accumulator, food) => ({
        // "ag_butyrique": accumulator.ag_butyrique + adjustedValue(food.ag_butyrique, food.quantity),
        // "ag_caproique": accumulator.ag_caproique + adjustedValue(food.ag_caproique, food.quantity),
        // "ag_caprylique": accumulator.ag_caprylique + adjustedValue(food.ag_caprylique, food.quantity),
        // "ag_caprique": accumulator.ag_caprique + adjustedValue(food.ag_caprique, food.quantity),
        // "ag_laurique": accumulator.ag_laurique + adjustedValue(food.ag_laurique, food.quantity),
        // "ag_myristique": accumulator.ag_myristique + adjustedValue(food.ag_myristique, food.quantity),
        // "ag_palmitique": accumulator.ag_palmitique + adjustedValue(food.ag_palmitique, food.quantity),
        // "ag_stearique": accumulator.ag_stearique + adjustedValue(food.ag_stearique, food.quantity),
        // "ag_oleique": accumulator.ag_oleique + adjustedValue(food.ag_oleique, food.quantity),
        // "ag_linoleique": accumulator.ag_linoleique + adjustedValue(food.ag_linoleique, food.quantity),
        // "ag_alpha_linolenique": accumulator.ag_alpha_linolenique + adjustedValue(food.ag_alpha_linolenique, food.quantity),
        // "ag_arachidonique": accumulator.ag_arachidonique + adjustedValue(food.ag_arachidonique, food.quantity),
        // "EPA": accumulator.EPA + adjustedValue(food.EPA, food.quantity),
        // "DHA": accumulator.DHA + adjustedValue(food.DHA, food.quantity),
        "agmi": accumulator.agmi + adjustedValue(food.agmi, food.quantity),
        "agpi": accumulator.agpi + adjustedValue(food.agpi, food.quantity),
        "ags": accumulator.ags + adjustedValue(food.ags, food.quantity),
        // "acides_organiques": accumulator.acides_organiques + adjustedValue(food.acides_organiques, food.quantity),
        "alcool": accumulator.alcool + adjustedValue(food.alcool, food.quantity),
        // "amidon": accumulator.amidon + adjustedValue(food.amidon, food.quantity),
        // "beta_carotene": accumulator.beta_carotene + adjustedValue(food.beta_carotene, food.quantity),
        "calcium": accumulator.calcium + adjustedValue(food.calcium, food.quantity),
        // "cendres": accumulator.cendres + adjustedValue(food.cendres, food.quantity),
        // "chlorure": accumulator.chlorure + adjustedValue(food.chlorure, food.quantity),
        "cholesterol": accumulator.cholesterol + adjustedValue(food.cholesterol, food.quantity),
        // "cuivre": accumulator.cuivre + adjustedValue(food.cuivre, food.quantity),
        // "eau": accumulator.eau + adjustedValue(food.eau, food.quantity),
        // "energie_jones_avec_fibres_kj": accumulator.energie_jones_avec_fibres_kj + adjustedValue(food.energie_jones_avec_fibres_kj, food.quantity),
        // "energie_jones_avec_fibres_kcal": accumulator.energie_jones_avec_fibres_kcal + adjustedValue(food.energie_jones_avec_fibres_kcal, food.quantity),
        // "energie_reg_ue_kj": accumulator.energie_reg_ue_kj + adjustedValue(food.energie_reg_ue_kj, food.quantity),
        "energie_reg_ue_kcal": accumulator.energie_reg_ue_kcal + adjustedValue(food.energie_reg_ue_kcal, food.quantity),
        "fer": accumulator.fer + adjustedValue(food.fer, food.quantity),
        "fibres": accumulator.fibres + adjustedValue(food.fibres, food.quantity),
        // "fructose": accumulator.fructose + adjustedValue(food.fructose, food.quantity),
        // "galactose": accumulator.galactose + adjustedValue(food.galactose, food.quantity),
        "glucides": accumulator.glucides + adjustedValue(food.glucides, food.quantity),
        // "glucose": accumulator.glucose + adjustedValue(food.glucose, food.quantity),
        // "iode": accumulator.iode + adjustedValue(food.iode, food.quantity),
        // "lactose": accumulator.lactose + adjustedValue(food.lactose, food.quantity),
        "lipides": accumulator.lipides + adjustedValue(food.lipides, food.quantity),
        // "magnesium": accumulator.magnesium + adjustedValue(food.magnesium, food.quantity),
        // "maltose": accumulator.maltose + adjustedValue(food.maltose, food.quantity),
        // "manganese": accumulator.manganese + adjustedValue(food.manganese, food.quantity),
        "phosphore": accumulator.phosphore + adjustedValue(food.phosphore, food.quantity),
        // "polyols": accumulator.polyols + adjustedValue(food.polyols, food.quantity),
        "potassium": accumulator.potassium + adjustedValue(food.potassium, food.quantity),
        "proteines": accumulator.proteines + adjustedValue(food.proteines, food.quantity),
        // "proteines_jones": accumulator.proteines_jones + adjustedValue(food.proteines_jones, food.quantity),
        // "retinol": accumulator.retinol + adjustedValue(food.retinol, food.quantity),
        // "saccharose": accumulator.saccharose + adjustedValue(food.saccharose, food.quantity),
        // "chlorure_de_sodium": accumulator.chlorure_de_sodium + adjustedValue(food.chlorure_de_sodium, food.quantity),
        "sodium": accumulator.sodium + adjustedValue(food.sodium, food.quantity),
        "sucres": accumulator.sucres + adjustedValue(food.sucres, food.quantity),
        // "selenium": accumulator.selenium + adjustedValue(food.selenium, food.quantity),
        // "vitamine_b1": accumulator.vitamine_b1 + adjustedValue(food.vitamine_b1, food.quantity),
        // "vitamine_b2": accumulator.vitamine_b2 + adjustedValue(food.vitamine_b2, food.quantity),
        // "vitamine_b3": accumulator.vitamine_b3 + adjustedValue(food.vitamine_b3, food.quantity),
        // "vitamine_b5": accumulator.vitamine_b5 + adjustedValue(food.vitamine_b5, food.quantity),
        // "vitamine_b6": accumulator.vitamine_b6 + adjustedValue(food.vitamine_b6, food.quantity),
        // "vitamine_b9": accumulator.vitamine_b9 + adjustedValue(food.vitamine_b9, food.quantity),
        // "vitamine_b12": accumulator.vitamine_b12 + adjustedValue(food.vitamine_b12, food.quantity),
        // "vitamine_c": accumulator.vitamine_c + adjustedValue(food.vitamine_c, food.quantity),
        "vitamine_d": accumulator.vitamine_d + adjustedValue(food.vitamine_d, food.quantity),
        // "vitamine_e": accumulator.vitamine_e + adjustedValue(food.vitamine_e, food.quantity),
        // "vitamine_k1": accumulator.vitamine_k1 + adjustedValue(food.vitamine_k1, food.quantity),
        // "vitamine_k2": accumulator.vitamine_k2 + adjustedValue(food.vitamine_k2, food.quantity),
        // "zinc": accumulator.zinc + adjustedValue(food.zinc, food.quantity),
    }), {
        // Valeurs initiales de l'accumulateur (toutes à 0)
        // "ag_butyrique": 0,
        // "ag_caproique": 0,
        // "ag_caprylique": 0,
        // "ag_caprique": 0,
        // "ag_laurique": 0,
        // "ag_myristique": 0,
        // "ag_palmitique": 0,
        // "ag_stearique": 0,
        // "ag_oleique": 0,
        // "ag_linoleique": 0,
        // "ag_alpha_linolenique": 0,
        // "ag_arachidonique": 0,
        // "EPA": 0,
        // "DHA": 0,
        "agmi": 0,
        "agpi": 0,
        "ags": 0,
        // "acides_organiques": 0,
        "alcool": 0,
        // "amidon": 0,
        // "beta_carotene": 0,
        "calcium": 0,
        // "cendres": 0,
        // "chlorure": 0,
        "cholesterol": 0,
        // "cuivre": 0,
        // "eau": 0,
        // "energie_jones_avec_fibres_kj": 0,
        // "energie_jones_avec_fibres_kcal": 0,
        // "energie_reg_ue_kj": 0,
        "energie_reg_ue_kcal": 0,
        "fer": 0,
        "fibres": 0,
        // "fructose": 0,
        // "galactose": 0,
        "glucides": 0,
        // "glucose": 0,
        // "iode": 0,
        // "lactose": 0,
        "lipides": 0,
        // "magnesium": 0,
        // "maltose": 0,
        // "manganese": 0,
        "phosphore": 0,
        // "polyols": 0,
        "potassium": 0,
        "proteines": 0,
        // "proteines_jones": 0,
        // "retinol": 0,
        // "saccharose": 0,
        // "chlorure_de_sodium": 0,
        "sodium": 0,
        "sucres": 0,
        // "selenium": 0,
        // "vitamine_b1": 0,
        // "vitamine_b2": 0,
        // "vitamine_b3": 0,
        // "vitamine_b5": 0,
        // "vitamine_b6": 0,
        // "vitamine_b9": 0,
        // "vitamine_b12": 0,
        // "vitamine_c": 0,
        "vitamine_d": 0,
        // "vitamine_e": 0,
        // "vitamine_k1": 0,
        // "vitamine_k2": 0,
        // "zinc": 0,
    });

    return (
        <>
            <Title
                text="Calcul des ingesta"
            />
            <form
                onSubmit={addFood}
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Ajouter des aliments au calcul"
                />

                <div className="relative">
                    <InputText
                        type="text"
                        title="Aliment : "
                        name="food"
                        value={foodWithQuantity.food}
                        onChange={handleChange}
                    />

                    {showSearchResults && searchResults.length > 0 &&
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-10 shadow-lg">
                            {searchResults.map((food, index) => (
                                <div
                                    key={index}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                                    onClick={() => selectFood(food)}
                                >
                                    <div className="font-medium text-gray-900">
                                        {food.alim_nom_fr}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>

                <Input
                    title="Quantité (g) : "
                    name="quantity"
                    value={foodWithQuantity.quantity}
                    onChange={handleChange}
                />
                <ButtonGreen
                    text="Ajouter"
                    type="submit"
                    lucide={ListPlus}
                />

            </form>

            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Liste des aliments pour le calcul"
                />

                {foodList.length === 0 ?
                    <p className="text-(--grayColor) text-center py-4">
                        Aucun élément ajouté pour le moment
                    </p>
                    :
                    <div className="flex flex-col gap-1">
                        {foodList.map((food, index) => {
                            return (
                                <IngestaColapse
                                    key={index}
                                    food={food.alim_nom_fr}
                                    quantity={food.quantity}
                                    calories={adjustedValue(food.energie_reg_ue_kcal, food.quantity)}
                                    protein={adjustedValue(food.proteines, food.quantity)}
                                    fats={adjustedValue(food.lipides, food.quantity)}
                                    carbohydrates={adjustedValue(food.glucides, food.quantity)}
                                    onClick={() => removeFood(index)}
                                />
                            )
                        })}
                    </div>
                }
            </div>

            {foodList.length > 0 &&
                <IngestaResults
                    energy={totals.energie_reg_ue_kcal}
                    proteins={totals.proteines}
                    fats={totals.lipides}
                    ags={totals.ags}
                    agmi={totals.agmi}
                    agpi={totals.agpi}
                    cholesterol={totals.cholesterol}
                    carbohydrates={totals.glucides}
                    sugar={totals.sucres}
                    fibers={totals.fibres}
                    alcool={totals.alcool}
                    sodium={totals.sodium}
                    potassium={totals.potassium}
                    phosphore={totals.phosphore}
                    fer={totals.fer}
                    calcium={totals.calcium}
                    vitD={totals.vitamine_d}
                />
            }
        </>
    )
}