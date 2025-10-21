'use client'

import { useEffect, useState } from "react";
import Input from "./Input";
import InputCheckbox from "./InputCheckbox";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import { Calculator } from "lucide-react";
import TitleTwo from "./TitleTwo";
import { CalculateIMC } from "@/utils/CalculateIMC";
import { SRIParameters, SRIResults } from "@/types/SRI";
import { useData } from "@/contexts/DataContext";
import { SRIScoreMajorCriterion, SRIScoreMinorCriterion } from "@/utils/SRIScore";
import { WeightLoss } from "@/utils/WeightLoss";

export default function SRIForm() {
    const initialParameters: SRIParameters = {
        weight: 0,
        height: 0,
        previousWeight: 0,
        lowIngestaFive: false,
        lowIngestaTen: false,
        potassium: 0,
        phosphorus: 0,
        magnesium: 0,
        atcd: false,
    }

    const initialResults: SRIResults = {
        weight: 0,
        height: 0,
        imc: 0,
        previousWeight: 0,
        weightLoss: 0,
        lowIngestaFive: false,
        lowIngestaTen: false,
        potassium: 0,
        phosphorus: 0,
        magnesium: 0,
        atcd: false
    }

    const { data, resetData, updateData } = useData();

    const [calculDone, setCalculDone] = useState<boolean>(false);
    const [parameters, setParameters] = useState<SRIParameters>(initialParameters);
    const [results, setResults] = useState<SRIResults>(initialResults);
    const [message, setMessage] = useState<string>("");
    const [minorCriteria, setMinorCriteria] = useState<number>(0);
    const [majorCriteria, setMajorCriteria] = useState<number>(0);

    useEffect(() => {
        setParameters({
            weight: data.weight,
            height: data.height,
            previousWeight: data.previousWeight,
            lowIngestaFive: data.lowIngestaFive,
            lowIngestaTen: data.lowIngestaTen,
            potassium: data.potassium,
            phosphorus: data.phosphorus,
            magnesium: data.magnesium,
            atcd: data.atcd,
        })
    }, [data.weight, data.height])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'lowIngestaFive') {
            setParameters(prev => ({
                ...prev,
                lowIngestaFive: !parameters.lowIngestaFive
            }))

        } else if (name === 'lowIngestaTen') {
            setParameters(prev => ({
                ...prev,
                lowIngestaTen: !parameters.lowIngestaTen
            }))

        } else if (name === 'atcd') {
            setParameters(prev => ({
                ...prev,
                atcd: !parameters.atcd
            }))

        } else {
            setParameters(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (parameters.weight > 0 && parameters.height > 0) {
            const imc = CalculateIMC(parameters.weight, parameters.height);
            setResults(prev => ({
                ...prev,
                imc: imc
            }))

        }

        if (parameters.weight > 0 && parameters.previousWeight > 0) {
            const weightLoss = WeightLoss(parameters.weight, parameters.previousWeight);
            setResults(prev => ({
                ...prev,
                weightLoss: weightLoss
            }))
        }

        if ((parameters.weight > 0 && (parameters.height > 0 || parameters.previousWeight > 0)) || (parameters.lowIngestaTen) || (parameters.potassium > 0 && parameters.phosphorus > 0 && parameters.magnesium > 0) || (parameters.lowIngestaFive && parameters.atcd)) {
            setCalculDone(true);
            setResults(prev => ({
                ...prev,
                weight: parameters.weight,
                height: parameters.height,
                previousWeight: parameters.previousWeight,
                lowIngestaFive: parameters.lowIngestaFive,
                lowIngestaTen: parameters.lowIngestaTen,
                potassium: parameters.potassium,
                phosphorus: parameters.phosphorus,
                magnesium: parameters.magnesium,
                atcd: parameters.atcd,
            }))
            updateData({
                weight: parameters.weight,
                height: parameters.height,
                previousWeight: parameters.previousWeight,
                lowIngestaFive: parameters.lowIngestaFive,
                lowIngestaTen: parameters.lowIngestaTen,
                potassium: parameters.potassium,
                phosphorus: parameters.phosphorus,
                magnesium: parameters.magnesium,
                atcd: parameters.atcd,
            })
            setMajorCriteria(SRIScoreMajorCriterion(
                CalculateIMC(parameters.weight, parameters.height),
                WeightLoss(parameters.weight, parameters.previousWeight),
                parameters.lowIngestaTen,
                parameters.potassium,
                parameters.phosphorus,
                parameters.magnesium
            ));
            setMinorCriteria(SRIScoreMinorCriterion(
                CalculateIMC(parameters.weight, parameters.height),
                WeightLoss(parameters.weight, parameters.previousWeight),
                parameters.lowIngestaFive,
                parameters.atcd
            ));
        } else {
            setMessage("Merci de bien remplir les champs nécessaires à l'évaluation du risque de SRI")
        }
    }

    const resetForm = () => {
        setParameters(initialParameters);
        setCalculDone(false);
        resetData();
        setMessage("");
    }

    return (
        <>
            <div className="px-4 mx-3 w-[90%] md:w-[75%]">
                <Title
                    text="Evaluation du risque de SRI"
                />
            </div>
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-3">
                    <Input
                        title="Poids actuel (kg) :"
                        name="weight"
                        step={0.1}
                        value={parameters.weight}
                        onChange={handleChange}
                    />
                    <Input
                        title="Taille (cm) :"
                        name="height"
                        value={parameters.height}
                        onChange={handleChange}
                    />
                    <Input
                        title="Poids le plus haut sur les 3 à 6 derniers mois (kg) : "
                        name="previousWeight"
                        step={0.1}
                        value={parameters.previousWeight}
                        onChange={handleChange}
                    />
                    <InputCheckbox
                        name="lowIngestaFive"
                        checked={parameters.lowIngestaFive}
                        title="Ingesta faibles ou nuls depuis plus de 5 jours"
                        onChange={handleChange}
                    />
                    <InputCheckbox
                        name="lowIngestaTen"
                        checked={parameters.lowIngestaTen}
                        title="Ingesta faibles ou nuls depuis plus de 10 jours"
                        onChange={handleChange}
                    />
                    <p>
                        Taux sanguins avant renutrition :
                    </p>
                    <Input
                        title="- Potassium (mmol/L) : "
                        name="potassium"
                        step={0.1}
                        value={parameters.potassium}
                        onChange={handleChange}
                    />
                    <Input
                        title="- Phosphore (mmol/L) : "
                        name="phosphorus"
                        step={0.1}
                        value={parameters.phosphorus}
                        onChange={handleChange}
                    />
                    <Input
                        title="- Magnésium (mmol/L) : "
                        name="magnesium"
                        step={0.1}
                        value={parameters.magnesium}
                        onChange={handleChange}
                    />
                    <InputCheckbox
                        name="atcd"
                        checked={parameters.atcd}
                        title="Antécédents d&apos;éthylisme, traitement par insuline, chimiothérapie, antiacides, diurétiques, chirurgie bariatrique"
                        onChange={handleChange}
                    />

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
                </div>
            </form>
            {calculDone &&
                <div
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <TitleTwo
                        text="🎯 Résultats&nbsp;:"
                    />
                    {(results.weight > 0 && results.height > 0) &&
                        <p>
                            Pour un poids de <span className="font-bold">{results.weight} kg</span> et une taille de <span className="font-bold">{results.height} cm</span>, on obtient un IMC de <span className="font-bold">{results.imc.toFixed(2)} kg/m²</span>.
                        </p>
                    }
                    {(results.weight > 0 && results.previousWeight > 0) &&
                        <p>
                            Avec un poids antérieur de <span className="font-bold">{results.previousWeight} kg</span>, la perte de poids est estimée à <span className="font-bold">{results.weightLoss} %</span>.
                        </p>
                    }

                    <div>
                        {majorCriteria < 1 ?
                            <p><span className="underline">Critère majeur</span> : Aucun</p>
                            :
                            <div>
                                {majorCriteria > 1 ?
                                    <p><span className="underline">Critères majeurs</span> :</p>
                                    :
                                    <p><span className="underline">Critère majeur</span> :</p>
                                }
                                <ul className="pl-5 list-disc">
                                    {results.imc > 0 && results.imc < 16 && <li>IMC inférieur à 16 kg/m²</li>}
                                    {results.weightLoss > 15 && <li>Perte de poids de plus de 15 % en 3 à 6 mois</li>}
                                    {results.lowIngestaTen && <li>Ingesta faibles ou nuls depuis plus de 10 jours</li>}
                                    {results.potassium > 0 && results.potassium < 3.5 && <li>Potassium trop bas (inférieur à 3,5 mmol/L)</li>}
                                    {results.phosphorus > 0 && results.phosphorus < 0.81 && <li>Phosphore trop bas (inférieur à 0,81 mmol/L)</li>}
                                    {results.magnesium > 0 && results.magnesium < 0.65 && <li>Magnésium trop bas (inférieur à 0,65 mmol/L)</li>}
                                </ul>
                            </div>
                        }
                    </div>

                    <div>
                        {minorCriteria < 1 ?
                            <p><span className="underline">Critère mineur</span> : Aucun</p>
                            :
                            <div>
                                {minorCriteria > 1 ?
                                    <p><span className="underline">Critères mineurs</span> :</p>
                                    :
                                    <p><span className="underline">Critère mineur</span> :</p>
                                }
                                <ul className="pl-5 list-disc">
                                    {results.imc > 16 && results.imc < 18.5 && <li>IMC inférieur à 18,5 kg/m²</li>}
                                    {results.weightLoss > 10 && results.weightLoss <= 15 && <li>Perte de poids de plus de 10 % en 3 à 6 mois</li>}
                                    {results.lowIngestaFive && <li>Ingesta faibles ou nuls depuis plus de 5 jours</li>}
                                    {results.atcd && <li>Antécédents d&apos;éthylisme, traitement par insuline, chimiothérapie, antiacides, diurétiques, chirurgie bariatrique</li>}
                                </ul>
                            </div>
                        }
                    </div>

                    <div>
                        {majorCriteria >= 1 && minorCriteria >= 2 ?
                            <p>En présence d&apos;au moins 1 critère majeur et 2 critères mineurs, on peut affirmer la présence d&apos;un <span className="font-bold underline">risque de syndrome de renutrition inappropriée</span>.</p>
                            :
                            <div>
                                {(majorCriteria >= 1 && minorCriteria < 1) ?
                                    <p>En présence d&apos;au moins 1 critère majeur, on peut affirmer la présence d&apos;un <span className="font-bold underline">risque de syndrome de renutrition inappropriée</span>.</p>
                                    :
                                    <div>
                                        {(majorCriteria < 1 && minorCriteria >= 2) ?
                                            <p>En présence d&apos;au moins 2 critères mineurs, on peut affirmer la présence d&apos;un <span className="font-bold underline">risque de syndrome de renutrition inappropriée</span>.</p>
                                            :
                                            <div>
                                                {(majorCriteria < 1 && minorCriteria < 2) &&
                                                    <p>En l&apos;absence d&apos;au moins 1 critère majeur ou de 2 critères mineurs, <span className="font-bold underline">le diagnostic du risque de SRI ne peut pas être posé</span>.</p>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}