'use client'

import { useState } from "react";
import Input from "./Input";
import ButtonGreen from "./ButtonGreen";
import InputCheckbox from "./InputCheckbox";

export default function UndernutritionSenior() {
    const [parameters, setParameters] = useState<WeightHeight>({ weight: 0, height: 0, previousWeight: 0, previousWeightDate: "none", albuminemia: 0, sarcopenia: false, etiological: false });
    const [calculDone, setCalculDone] = useState<boolean>(false);
    const [evaluationResults, setEvaluationResults] = useState<EvaluationResults>({ weight: 0, height: 0, imc: 0, previousWeight: 0, weightLoss: 0, sarcopenia: false, etiological: false });
    const [isEtiologicalCriterium, setIsEtiologicalCriterium] = useState<boolean>(false)
    const [isSarcopenia, setIsSarcopenia] = useState<boolean>(false)

    interface WeightHeight {
        weight: number,
        height: number,
        previousWeight: number,
        previousWeightDate: string,
        albuminemia: number,
        sarcopenia: boolean,
        etiological: boolean,
    }

    interface EvaluationResults {
        weight: number,
        height: number,
        imc: number,
        previousWeight: number,
        weightLoss: number,
        sarcopenia: boolean,
        etiological: boolean,
    }

    const resetForm = () => {
        setParameters({ weight: 0, height: 0, previousWeight: 0, previousWeightDate: "none", albuminemia: 0, sarcopenia: false, etiological: false });
        setCalculDone(false);
        // setIsDisabled(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setParameters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeSarcopenia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSarcopenia(!isSarcopenia)
    }

    const handleChangeEtiological = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEtiologicalCriterium(!isEtiologicalCriterium)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parameters.weight > 0 && parameters.height > 0) {
            const imc = parameters.weight / ((parameters.height / 100) * (parameters.height / 100));
            setCalculDone(true);
            setEvaluationResults({ weight: parameters.weight, height: parameters.height, imc: imc, previousWeight: parameters.previousWeight, weightLoss: 0, sarcopenia: parameters.sarcopenia, etiological: parameters.etiological })
        }

        if (parameters.weight > 0 && parameters.previousWeight > 0) {
            const weightLoss = ((parameters.weight - parameters.previousWeight) / parameters.weight * 100).toFixed(1);
            setEvaluationResults(prev => ({
                ...prev,
                weightLoss: parseInt(weightLoss)
            }))
        }
    }

    return (
        <>
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row gap-4 border p-3">
                    <Input
                        title="Taille (cm) :"
                        name="height"
                        value={parameters.height}
                        onChange={handleChange}
                    />
                    <Input
                        title="Poids actuel (kg) :"
                        name="weight"
                        value={parameters.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-row gap-4 border p-3">
                    <Input
                        title="Poids antérieur (kg) : "
                        name="previousWeight"
                        value={parameters.previousWeight}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col gap-1 justify-center">
                        <label>Ce poids antérieur était :</label>
                        <select className="p-2 w-full border border-gray-300 rounded-lg">
                            <option value="none">Choisir une option</option>
                            <option value="one-month">il y a 1 mois ou plus</option>
                            <option value="six-month">il y a 6 mois ou plus</option>
                            <option value="before-disease">habituel avant le début de la maladie</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-row gap-4 border p-3">
                    <Input
                        title="Albuminémie (g/L) : "
                        name="albuminemia"
                        value={parameters.albuminemia}
                        onChange={handleChange}
                    />
                </div>
                <InputCheckbox
                    name="sarcopenia"
                    checked={isSarcopenia}
                    title="Sarcopénie confirmée"
                    onChange={handleChangeSarcopenia}
                />
                <InputCheckbox
                    name="etiological"
                    checked={isEtiologicalCriterium}
                    title="Présence d'au moins un critère étiologique : <br /> Réduction de la prise alimentaire ≥ 50 % pendant
plus d’1 semaine, ou toute réduction des apports pendant plus de 2 semaines par rapport à la
consommation alimentaire habituelle ou aux besoins protéino-énergétiques.
─ Absorption réduite (malabsorption/maldigestion).
─ Situation d’agression (avec ou sans syndrome inflammatoire) : pathologie aiguë ou pathologie
chronique évolutive ou pathologie maligne évolutive."
                    onChange={handleChangeEtiological}
                />
                <ButtonGreen
                    text="Calculer"
                    type="submit"
                />
                {calculDone ?
                    <button
                        type="reset"
                        onClick={resetForm}
                        className="underline"
                    >
                        Reset
                    </button> : ""
                }
            </form>
            {calculDone ?
                <div
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <h2 className="text-lg font-bold">
                        ✅ Résultat :
                    </h2>
                    <p>
                        Pour un poids de <span className="font-bold">{evaluationResults.weight} kg</span> et une taille de <span className="font-bold">{evaluationResults.height} cm</span>, on obtient un IMC de <span className="font-bold">{evaluationResults.imc.toFixed(2)} kg/m²</span>.
                    </p>
                    {evaluationResults.previousWeight > 0 && evaluationResults.weight > 0 ?
                        <p>
                            Avec un poids antérieur () de {evaluationResults.previousWeight} kg, la perte de poids est estimée à {evaluationResults.weightLoss} %
                        </p> : ""
                    }
                    <p>
                        SI CRITERE PHENOTYPIQUE ET ETIOLOGIQUE : Dire si dénutrition modérée ou sévère
                    </p>
                    <p>
                        SI ABSENCE DE CRITERES DIAGNOSTIC
                    </p>
                    <p>
                        En l'absence d'un critère phénotypique et d'un critère étiologique, on ne peut pas poser le diagnostic de dénutrition. Cependant, en cas d’évènement clinique intercurrent (infection, chirurgie…) ou de diminution de l’appétit ou des consommations alimentaires, rapprocher la surveillance du poids, de l’appétit et des consommations alimentaires à une fois par semaine.
                    </p>

                    <p>Poids : {evaluationResults.weight}</p>
                    <p>Taille : {evaluationResults.height}</p>
                    <p>IMC : {evaluationResults.imc}</p>
                    <p>Poids antérieur : {evaluationResults.previousWeight}</p>
                    <p>Sarcopénie : {evaluationResults.sarcopenia ? "oui" : "non"}</p>
                    <p>Critère étio : {evaluationResults.etiological ? "oui" : "non"}</p>

                </div>
                : ""
            }
        </>
    )
}