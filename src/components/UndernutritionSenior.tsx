'use client'

import { useEffect, useState } from "react";
import Input from "./Input";
import ButtonGreen from "./ButtonGreen";
import InputCheckbox from "./InputCheckbox";
import { Calculator } from "lucide-react";
import TitleTwo from "./TitleTwo";
import { CalculateIMC } from "@/utils/CalculateIMC";
import { UndernutParameters, UndernutResults } from "@/types/Undernutrition";
import { useData } from "@/contexts/DataContext";
import { UndernutritionAdultResult } from "@/utils/UndernutritionResult";
import { UndernutritionCategoryColor } from "@/utils/ResultsColors";
import { useUser } from "@/contexts/UserContext";
import { useAnalytics } from '@/utils/usePosthog';

export default function UndernutritionSenior() {
    const initialParameters: UndernutParameters = {
        weight: 0,
        height: 0,
        previousWeight: 0,
        previousWeightDate: "none",
        albuminemia: 0,
        sarcopenia: false,
        etiologicalFoodIntake: false,
        etiologicalAbsorption: false,
        etiologicalAgression: false,
    }

    const initialResults: UndernutResults = {
        weight: 0,
        height: 0,
        imc: 0,
        previousWeight: 0,
        previousWeightDate: "none",
        weightLoss: 0,
        albuminemia: 0,
        sarcopenia: false,
        etiologicalFoodIntake: false,
        etiologicalAbsorption: false,
        etiologicalAgression: false,
    }

    const { data, resetData, updateData } = useData();
    const { isAuthenticated } = useUser();
    const { trackEvent } = useAnalytics();

    const [parameters, setParameters] = useState<UndernutParameters>(initialParameters);
    const [calculDone, setCalculDone] = useState<boolean>(false);
    const [evaluationResults, setEvaluationResults] = useState<UndernutResults>(initialResults);
    const [message, setMessage] = useState<string>("");
    const [conclusion, setConclusion] = useState<"no" | "moderate" | "severe">("no");

    const saveUndernutritionHistory = async (
        weight: number,
        height: number,
        previousWeight: number,
        previousWeightDate: string,
        albuminemia: number,
        sarcopenia: boolean,
        etiologicalFoodIntakes: boolean,
        etiologicalAbsorption: boolean,
        etiologicalAgression: boolean
    ): Promise<void> => {
        // if (!isAuthenticated) {
        //     return;
        // }
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Pas de token trouvé');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/undernutrition-senior-histories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    weight: Number(weight),
                    height: Number(height),
                    previous_weight: Number(previousWeight),
                    previous_weight_date: previousWeightDate,
                    albuminemia: Number(albuminemia),
                    sarcopenia: sarcopenia,
                    etiological_food_intakes: etiologicalFoodIntakes,
                    etiological_absorption: etiologicalAbsorption,
                    etiological_agression: etiologicalAgression
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur lors de la sauvegarde des données :', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données :', {
                error: error instanceof Error ? error.message : error
            });
        }
    };

    useEffect(() => {
        setParameters({
            weight: data.weight,
            height: data.height,
            previousWeight: data.previousWeight,
            previousWeightDate: data.previousWeightDate,
            albuminemia: data.albuminemia,
            sarcopenia: data.sarcopenia,
            etiologicalFoodIntake: data.etiologicalFoodIntake,
            etiologicalAbsorption: data.etiologicalAbsorption,
            etiologicalAgression: data.etiologicalAgression,

        })
    }, [data.weight, data.height])

    const textPreviousWeight = (data: string) => {
        if (data == "none") return "";
        if (data == "one-month") return "il y a 1 mois ou plus";
        if (data == "six-month") return "il y a 6 mois ou plus";
        if (data == "before-disease") return "avant le début de la maladie";
    }

    const resetForm = () => {
        setParameters(initialParameters);
        setCalculDone(false);
        resetData();
        setMessage("");
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'sarcopenia') {
            setParameters(prev => ({
                ...prev,
                sarcopenia: !parameters.sarcopenia
            }))

        } else if (name === 'etiologicalFoodIntake') {
            setParameters(prev => ({
                ...prev,
                etiologicalFoodIntake: !parameters.etiologicalFoodIntake
            }))

        } else if (name === 'etiologicalAbsorption') {
            setParameters(prev => ({
                ...prev,
                etiologicalAbsorption: !parameters.etiologicalAbsorption
            }))

        } else if (name === 'etiologicalAgression') {
            setParameters(prev => ({
                ...prev,
                etiologicalAgression: !parameters.etiologicalAgression
            }))

        } else {
            setParameters(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleChangePreviousWeightDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;

        setParameters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("")

        if (parameters.weight > 0 && parameters.height > 0) {
            const imc = CalculateIMC(parameters.weight, parameters.height)
            setEvaluationResults(prev => ({
                ...prev,
                imc: imc
            }))
        }

        if (parameters.weight > 0 && parameters.previousWeight > 0) {
            const weightLoss = ((parameters.previousWeight - parameters.weight) / parameters.previousWeight * 100).toFixed(1);
            setEvaluationResults(prev => ({
                ...prev,
                weightLoss: parseInt(weightLoss)
            }))
        }

        if ((parameters.weight > 0 && (parameters.height > 0 || (parameters.previousWeight > 0))) || (parameters.sarcopenia)) {
            setCalculDone(true);
            setConclusion(UndernutritionAdultResult(parameters.weight, parameters.height, parameters.previousWeight, parameters.previousWeightDate, parameters.albuminemia, parameters.sarcopenia, parameters.etiologicalFoodIntake, parameters.etiologicalAbsorption, parameters.etiologicalAgression))
            setEvaluationResults(prev => ({
                ...prev,
                weight: parameters.weight,
                height: parameters.height,
                previousWeight: parameters.previousWeight,
                previousWeightDate: parameters.previousWeightDate,
                albuminemia: parameters.albuminemia,
                sarcopenia: parameters.sarcopenia,
                etiologicalFoodIntake: parameters.etiologicalFoodIntake,
                etiologicalAbsorption: parameters.etiologicalAbsorption,
                etiologicalAgression: parameters.etiologicalAgression
            }))
            updateData({
                weight: parameters.weight,
                height: parameters.height,
                previousWeight: parameters.previousWeight,
                previousWeightDate: parameters.previousWeightDate,
                albuminemia: parameters.albuminemia,
                sarcopenia: parameters.sarcopenia,
                etiologicalFoodIntake: parameters.etiologicalFoodIntake,
                etiologicalAbsorption: parameters.etiologicalAbsorption,
                etiologicalAgression: parameters.etiologicalAgression,
            })

            trackEvent('undernutrition_senior_calculated', {
                has_weight: parameters.weight > 0,
                has_height: parameters.height > 0,
                has_previous_weight: parameters.previousWeight > 0,
                has_albuminemia: parameters.albuminemia > 0,
                has_sarcopenia: parameters.sarcopenia,
                has_etiological_factors: parameters.etiologicalFoodIntake || parameters.etiologicalAbsorption || parameters.etiologicalAgression
            });

            // Sauvegarde asynchrone des données si l'utilisateur est connecté
            if (isAuthenticated) {
                saveUndernutritionHistory(
                    parameters.weight,
                    parameters.height,
                    parameters.previousWeight,
                    parameters.previousWeightDate,
                    parameters.albuminemia,
                    parameters.sarcopenia,
                    parameters.etiologicalFoodIntake,
                    parameters.etiologicalAbsorption,
                    parameters.etiologicalAgression
                )
                    .then(() => {
                        trackEvent('undernutrition_senior_saved', {
                            success: true
                        });
                    })
                    .catch(() => {
                        trackEvent('undernutrition_senior_saved', {
                            success: false
                        });
                    });
            }



        } else {
            setMessage("Merci de bien remplir les champs nécessaires")
        }
    }

    return (
        <>
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col justify-center items-center">
                    <TitleTwo text="Personne âgée (≥&nbsp;70&nbsp;ans)" />
                </div>

                <h2 className="text-lg font-bold text-(--orangeColor)">
                    - <span className="underline">Critères phénotypiques</span> :
                </h2>
                <ul className="flex flex-col gap-3">
                    <li>

                        <Input
                            title="Poids actuel (kg) :"
                            name="weight"
                            step={0.1}
                            value={parameters.weight}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <Input
                            title="Taille (cm) :"
                            name="height"
                            value={parameters.height}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <Input
                            title="Poids antérieur (kg) : "
                            name="previousWeight"
                            step={0.1}
                            value={parameters.previousWeight}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <div className="flex flex-col gap-1 justify-center">
                            <label
                                htmlFor="previousWeightDate"
                            >
                                Ancienneté du poids antérieur :
                            </label>
                            <select className="p-2 border border-gray-300 rounded-lg"
                                onChange={handleChangePreviousWeightDate}
                                name="previousWeightDate"
                                value={parameters.previousWeightDate}
                            >
                                <option value="none">Choisir une option</option>
                                <option value="one-month">il y a 1 mois ou plus</option>
                                <option value="six-month">il y a 6 mois ou plus</option>
                                <option value="before-disease">habituel avant le début de la maladie</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <Input
                            title="Albuminémie (g/L) : "
                            name="albuminemia"
                            step={0.1}
                            value={parameters.albuminemia}
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <InputCheckbox
                            name="sarcopenia"
                            checked={parameters.sarcopenia}
                            title="Sarcopénie confirmée par une réduction quantifiée de la force et de la masse musculaire"
                            onChange={handleChange}
                        />
                    </li>
                </ul>
                <h2 className="text-lg font-bold text-(--orangeColor)">
                    - <span className="underline">Critères étiologiques</span> :
                </h2>
                <ul className="flex flex-col gap-3">
                    <li>
                        <InputCheckbox
                            name="etiologicalFoodIntake"
                            checked={parameters.etiologicalFoodIntake}
                            title="Réduction de la prise alimentaire ≥ 50 % pendant plus d’1 semaine, ou toute réduction des apports pendant plus de 2 semaines par rapport à la consommation alimentaire habituelle ou aux besoins protéino-énergétiques"
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <InputCheckbox
                            name="etiologicalAbsorption"
                            checked={parameters.etiologicalAbsorption}
                            title="Absorption réduite (malabsorption/maldigestion)"
                            onChange={handleChange}
                        />
                    </li>
                    <li>
                        <InputCheckbox
                            name="etiologicalAgression"
                            checked={parameters.etiologicalAgression}
                            title="Situation d’agression (avec ou sans syndrome inflammatoire) : pathologie aiguë ou pathologie chronique évolutive ou pathologie maligne évolutive"
                            onChange={handleChange}
                        />
                    </li>
                </ul>

                {message &&
                    <div role="alert" className="alert border border-(--redColor) text-(--redColor) p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{message}</span>
                    </div>
                }

                <ButtonGreen
                    text="Calculer"
                    type="submit"
                    lucide={Calculator}
                />
                <button
                    type="reset"
                    onClick={resetForm}
                    className="underline"
                >
                    Réinitialiser
                </button>
            </form>
            {calculDone &&
                <div
                    className={`flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] ${UndernutritionCategoryColor(conclusion)} border border-black rounded-xl shadow-xl`}
                >
                    <TitleTwo
                        text="🎯 Résultats&nbsp;:"
                    />
                    {(evaluationResults.weight > 0 && evaluationResults.height > 0) ?
                        <p>
                            Pour un poids de <span className="font-bold">{evaluationResults.weight} kg</span> et une taille de <span className="font-bold">{evaluationResults.height} cm</span>, on obtient un IMC de <span className="font-bold">{evaluationResults.imc.toFixed(2)} kg/m²</span>.
                        </p>
                        :
                        <p>
                            En l&apos;absence d&apos;un poids et d&apos;une taille, il n&apos;est pas possible de calculer l&apos;IMC.
                        </p>
                    }
                    {evaluationResults.previousWeight > 0 && evaluationResults.weight > 0 ?
                        <div>
                            {evaluationResults.weightLoss > 0 ?
                                <p>
                                    Avec un poids antérieur {evaluationResults.previousWeightDate != 'none' ? `(${textPreviousWeight(evaluationResults.previousWeightDate)})` : ""} de <span className="font-bold">{evaluationResults.previousWeight} kg</span>, la perte de poids est estimée à <span className="font-bold">{evaluationResults.weightLoss} %</span>.
                                </p>
                                :
                                <p>
                                    Le poids antérieur (<span className="font-bold">{evaluationResults.previousWeight} kg</span>) étant plus faible ou égal au poids actuel, il n&apos;y a <span className="font-bold">pas de perte de poids à signaler</span>.
                                </p>
                            }
                        </div>
                        :
                        <p>
                            En l&apos;absence d&apos;indications sur le poids actuel et le poids antérieur, il n&apos;est pas possible de calculer la perte de poids.
                        </p>
                    }
                    <div>
                        <p className="underline">
                            Critère(s) phénotypique(s) :
                        </p>
                        {(((evaluationResults.weightLoss >= 5) && (evaluationResults.previousWeightDate === "one-month")) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "six-month")) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "before-disease" || evaluationResults.previousWeightDate === "none")) || (evaluationResults.imc > 0 && evaluationResults.imc < 22) || (evaluationResults.sarcopenia)) ?
                            <ul className="pl-5 list-disc">
                                {((evaluationResults.weightLoss >= 5) && (evaluationResults.previousWeightDate === "one-month")) ? <li>Perte de poids de {evaluationResults.weightLoss} % en 1 mois ou plus</li> : ""}
                                {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "six-month")) ? <li>Perte de poids de {evaluationResults.weightLoss} % en 6 mois ou plus</li> : ""}
                                {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "before-disease")) ? <li>Perte de poids de {evaluationResults.weightLoss} % depuis le début de la maladie</li> : ""}
                                {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "none")) ? <li>Perte de poids de {evaluationResults.weightLoss} %</li> : ""}
                                {(evaluationResults.imc > 0 && evaluationResults.imc < 22) ? <li>IMC = {evaluationResults.imc.toFixed(2)} kg/m²</li> : ""}
                                {evaluationResults.sarcopenia ? <li>Sarcopénie confirmée</li> : ""}
                            </ul>
                            : "Aucun"}
                    </div>
                    <div>
                        <p className="underline">
                            Critère(s) étiologique(s) :
                        </p>
                        {(evaluationResults.etiologicalFoodIntake || evaluationResults.etiologicalAbsorption || evaluationResults.etiologicalAgression) ?
                            <ul className="pl-5 list-disc">
                                {(evaluationResults.etiologicalFoodIntake) ? <li>Réduction de la prise alimentaire</li> : ""}
                                {(evaluationResults.etiologicalAbsorption) ? <li>Absorption réduite</li> : ""}
                                {(evaluationResults.etiologicalAgression) ? <li>Situation d&apos;agression</li> : ""}
                            </ul>
                            : "Aucun"}
                    </div>
                    {conclusion !== "no" ?
                        <div className="flex flex-col gap-4">
                            <p>En présence d&apos;au moins un critère phénotypique et un critère étiologique, <span className="font-bold">le diagnostic de dénutrition est confirmé</span>.</p>

                            {conclusion === "severe" ?
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <p className="underline">Critère(s) de dénutrition sévère : </p>
                                        <ul className="pl-5 list-disc">
                                            {(evaluationResults.imc > 0 && evaluationResults.imc < 20) && <li>IMC &lt; 20 kg/m²</li>}
                                            {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "one-month")) && <li>Perte de poids ≥ 10 % en 1 mois</li>}
                                            {((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "six-month")) && <li>Perte de poids ≥ 15 % en 6 mois</li>}
                                            {((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "before-disease")) && <li>Perte de poids ≥ 15 % par rapport au poids habituel avant le début de la maladie</li>}
                                            {((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "none")) && <li>Perte de poids ≥ 15 %</li>}
                                            {(evaluationResults.albuminemia <= 30 && evaluationResults.albuminemia > 0) && <li>Albuminémie ≤ 30 g/L</li>}
                                        </ul>
                                    </div>
                                    <p>Il s&apos;agit donc d&apos;une <span className="text-lg font-bold underline">dénutrition sévère</span>.</p>
                                </div>
                                :
                                <p>Il s&apos;agit ici d&apos;une <span className="text-lg font-bold underline">dénutrition modérée</span>.</p>
                            }
                        </div>
                        :
                        <p>En l&apos;absence d&apos;au moins un critère phénotypique et un critère étiologique, on ne peut pas poser le diagnostic de dénutrition. Cependant, en cas d&apos;événement clinique intercurrent (infection, chirurgie...) ou de diminution de l&apos;appétit ou des consommations alimentaires, il faudra rapprocher la surveillance du poids, de l&apos;appétit et des consommations alimentaires à une fois par semaine</p>}
                </div>
            }
        </>
    )
}