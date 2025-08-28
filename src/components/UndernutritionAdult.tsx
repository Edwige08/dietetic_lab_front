'use client'

import { useState } from "react";
import Input from "./Input";
import ButtonGreen from "./ButtonGreen";
import InputCheckbox from "./InputCheckbox";
import { Calculator } from "lucide-react";
import Title from "./Title";
import TitleTwo from "./TitleTwo";

export default function UndernutritionAdult() {
    const [parameters, setParameters] = useState<WeightHeight>({
        weight: 0,
        height: 0,
        previousWeight: 0,
        previousWeightDate: "none",
        albuminemia: 0,
        sarcopenia: false,
        firstEtiological: false,
        secondEtiological: false,
        thirdEtiological: false,
    });
    const [evaluationResults, setEvaluationResults] = useState<EvaluationResults>({
        weight: 0,
        height: 0,
        imc: 0,
        previousWeight: 0,
        previousWeightDate: "none",
        weightLoss: 0,
        albuminemia: 0,
        sarcopenia: false,
        firstEtiological: false,
        secondEtiological: false,
        thirdEtiological: false,
    });
    const [calculDone, setCalculDone] = useState<boolean>(false);

    interface WeightHeight {
        weight: number,
        height: number,
        previousWeight: number,
        previousWeightDate: "none" | "one-month" | "six-month" | "before-disease",
        albuminemia: number,
        sarcopenia: boolean,
        firstEtiological: boolean,
        secondEtiological: boolean,
        thirdEtiological: boolean,
    }

    interface EvaluationResults {
        weight: number,
        height: number,
        imc: number,
        previousWeight: number,
        previousWeightDate: "none" | "one-month" | "six-month" | "before-disease",
        weightLoss: number,
        albuminemia: number,
        sarcopenia: boolean,
        firstEtiological: boolean,
        secondEtiological: boolean,
        thirdEtiological: boolean,
    }

    const getIMCCategory = (imc: number) => {
        if (imc < 18.5) return "maigreur"
        if (imc < 25) return "équilibre staturo-pondéral"
        if (imc < 30) return "surpoids"
        if (imc < 35) return "obésité de grade I"
        if (imc < 40) return "obésité de grade II"
        if (imc < 45) return "obésité de grade III"
        if (imc >= 45) return "obésité de grade IV"
    }

    const textPreviousWeight = (data: string) => {
        if (data == "none") return "";
        if (data == "one-month") return "il y a 1 mois ou plus";
        if (data == "six-month") return "il y a 6 mois ou plus";
        if (data == "before-disease") return "avant le début de la maladie";
    }

    const resetForm = () => {
        setParameters({ weight: 0, height: 0, previousWeight: 0, previousWeightDate: "none", albuminemia: 0, sarcopenia: false, firstEtiological: false, secondEtiological: false, thirdEtiological: false });
        setCalculDone(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setParameters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeSarcopenia = () => {
        setParameters(prev => ({
            ...prev,
            sarcopenia: !parameters.sarcopenia
        }))
    }

    const handleChangeFirstEtiological = () => {

        setParameters(prev => ({
            ...prev,
            firstEtiological: !parameters.firstEtiological
        }))
    }

    const handleChangeSecondEtiological = () => {
        setParameters(prev => ({
            ...prev,
            secondEtiological: !parameters.secondEtiological
        }))
    }

    const handleChangeThirdEtiological = () => {
        setParameters(prev => ({
            ...prev,
            thirdEtiological: !parameters.thirdEtiological
        }))
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

        if (parameters.weight > 0 && parameters.height > 0) {
            const imc = parameters.weight / ((parameters.height / 100) * (parameters.height / 100));
            setCalculDone(true);
            setEvaluationResults({ weight: parameters.weight, height: parameters.height, imc: imc, previousWeight: parameters.previousWeight, previousWeightDate: parameters.previousWeightDate, weightLoss: 0, albuminemia: parameters.albuminemia, sarcopenia: parameters.sarcopenia, firstEtiological: parameters.firstEtiological, secondEtiological: parameters.secondEtiological, thirdEtiological: parameters.thirdEtiological })
        }

        if (parameters.weight > 0 && parameters.previousWeight > 0) {
            const weightLoss = ((parameters.previousWeight - parameters.weight) / parameters.previousWeight * 100).toFixed(1);
            setEvaluationResults(prev => ({
                ...prev,
                weightLoss: parseInt(weightLoss)
            }))
        }
    }

    return (
        <>
            <div className="px-4 mx-3 w-[90%] md:w-[75%]">
                <Title
                    text="Evaluation de la dénutrition (≥&nbsp;18&nbsp;ans et &lt;&nbsp;70 ans)"
                />
            </div>
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
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
                            title="Réduction quantifiée de la masse musculaire et/ou de la fonction musculaire"
                            onChange={handleChangeSarcopenia}
                        />
                    </li>
                </ul>
                <h2 className="text-lg font-bold text-(--orangeColor)">
                    - <span className="underline">Critères étiologiques</span> :
                </h2>
                <ul className="flex flex-col gap-3">
                    <li>
                        <InputCheckbox
                            name="firstEtiological"
                            checked={parameters.firstEtiological}
                            title="Réduction de la prise alimentaire ≥ 50 % pendant plus d’1 semaine, ou toute réduction des apports pendant plus de 2 semaines par rapport à la consommation alimentaire habituelle quantifiée ou aux besoins protéino-énergétiques estimés"
                            onChange={handleChangeFirstEtiological}
                        />
                    </li>
                    <li>
                        <InputCheckbox
                            name="secondEtiological"
                            checked={parameters.secondEtiological}
                            title="Absorption réduite (malabsorption/maldigestion)"
                            onChange={handleChangeSecondEtiological}
                        />
                    </li>
                    <li>
                        <InputCheckbox
                            name="thirdEtiological"
                            checked={parameters.thirdEtiological}
                            title="Situation d’agression (hypercatabolisme protéique avec ou sans syndrome inflammatoire) : pathologie aiguë ou pathologie chronique évolutive ou pathologie maligne évolutive"
                            onChange={handleChangeThirdEtiological}
                        />
                    </li>
                </ul>
                <ButtonGreen
                    text="Calculer"
                    type="submit"
                    lucide={Calculator}
                />
                {calculDone &&
                    <button
                        type="reset"
                        onClick={resetForm}
                        className="underline"
                    >
                        Reset
                    </button>
                }
            </form>
            {calculDone &&
                <div
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <TitleTwo
                        text="✅ Résultat&nbsp;:"
                    />
                    <p>
                        Pour un poids de <span className="font-bold">{evaluationResults.weight} kg</span> et une taille de <span className="font-bold">{evaluationResults.height} cm</span>, on obtient un IMC de <span className="font-bold">{evaluationResults.imc.toFixed(2)} kg/m²</span> ({getIMCCategory(evaluationResults.imc)}).
                    </p>
                    {evaluationResults.previousWeight > 0 && evaluationResults.weight > 0 &&
                        <p>
                            Avec un poids antérieur {evaluationResults.previousWeightDate != 'none' && `(${textPreviousWeight(evaluationResults.previousWeightDate)})`} de <span className="font-bold">{evaluationResults.previousWeight} kg</span>, la perte de poids est estimée à <span className="font-bold">{evaluationResults.weightLoss} %</span>.
                        </p>
                    }
                    <div>
                        <p className="underline">
                            Critère(s) phénotypique(s) :
                        </p>
                        {(((evaluationResults.weightLoss >= 5) && (evaluationResults.previousWeightDate === "one-month")) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "six-month")) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "before-disease" || evaluationResults.previousWeightDate === "none")) || (evaluationResults.imc < 22) || (evaluationResults.sarcopenia)) ?
                            <ul className="pl-5 list-disc">
                                {((evaluationResults.weightLoss >= 5) && (evaluationResults.previousWeightDate === "one-month")) && <li>Perte de poids de {evaluationResults.weightLoss} % en 1 mois ou plus</li>}
                                {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "six-month")) && <li>Perte de poids de {evaluationResults.weightLoss} % en 6 mois ou plus</li>}
                                {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "before-disease")) && <li>Perte de poids de {evaluationResults.weightLoss} % depuis le début de la maladie</li>}
                                {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "none")) && <li>Perte de poids de {evaluationResults.weightLoss} %</li>}
                                {(evaluationResults.imc < 18.5) && <li>IMC = {evaluationResults.imc.toFixed(2)} kg/m²</li>}
                                {evaluationResults.sarcopenia && <li>Réduction quantifiée de la masse musculaire et/ou de la fonction musculaire</li>}
                            </ul>
                            : "Aucun"}
                    </div>
                    <div>
                        <p className="underline">
                            Critère(s) étiologique(s) :
                        </p>
                        {(evaluationResults.firstEtiological || evaluationResults.secondEtiological || evaluationResults.thirdEtiological) ?
                            <ul className="pl-5 list-disc">
                                {(evaluationResults.firstEtiological) && <li>Réduction de la prise alimentaire</li>}
                                {(evaluationResults.secondEtiological) && <li>Absorption réduite</li>}
                                {(evaluationResults.thirdEtiological) && <li>Situation d&apos;agression</li>}
                            </ul>
                            : "Aucun"}
                    </div>
                    {(((evaluationResults.weightLoss >= 5) && (evaluationResults.previousWeightDate === "one-month")) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "six-month")) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "before-disease" || evaluationResults.previousWeightDate === "none")) || (evaluationResults.imc < 18.5) || (evaluationResults.sarcopenia)) && (evaluationResults.firstEtiological || evaluationResults.secondEtiological || evaluationResults.thirdEtiological) ?
                        <div className="flex flex-col gap-4">
                            <p>En présence d&apos;au moins un critère phénotypique et un critère étiologique, <span className="font-bold">le diagnostic de dénutrition est confirmé</span>.</p>

                            {((evaluationResults.imc <= 17) || ((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "one-month")) || ((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "six-month")) || ((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "before-disease" || evaluationResults.previousWeightDate === "none")) || (evaluationResults.albuminemia <= 30 && evaluationResults.albuminemia > 0)) ?

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <p className="underline">Critère(s) de dénutrition sévère : </p>
                                        <ul className="pl-5 list-disc">
                                            {evaluationResults.imc <= 17 && <li>IMC ≤ 17 kg/m²</li>}
                                            {((evaluationResults.weightLoss >= 10) && (evaluationResults.previousWeightDate === "one-month")) && <li>Perte de poids ≥ 10 % en 1 mois</li>}
                                            {((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "six-month")) && <li>Perte de poids ≥ 15 % en 6 mois</li>}
                                            {((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "before-disease")) && <li>Perte de poids ≥ 15 % par rapport au poids habituel avant le début de la maladie</li>}
                                            {((evaluationResults.weightLoss >= 15) && (evaluationResults.previousWeightDate === "none")) && <li>Perte de poids ≥ 15 %</li>}
                                            {(evaluationResults.albuminemia <= 30 && evaluationResults.albuminemia > 0) && <li>Albuminémie ≤ 30 g/L</li>}
                                        </ul>
                                    </div>
                                    <p>Il s&apos;agit donc d&apos;une <span className="text-lg font-bold underline">dénutrition sévère</span>.</p>
                                </div>
                                : <p>Il s&apos;agit ici d&apos;une <span className="text-lg font-bold underline">dénutrition modérée</span>.</p>}

                        </div>
                        : <p>En l&apos;absence d&apos;au moins un critère phénotypique et un critère étiologique, on ne peut pas poser le diagnostique de dénutrition. En ambulatoire, le patient est à réévaluer à chaque consultation. En cas d&apos;hospitalisation, réévaluation une fois par semaine (en MCO) ou toutes les 2 semaines (en SSR).</p>}
                </div>
            }
        </>
    )
}