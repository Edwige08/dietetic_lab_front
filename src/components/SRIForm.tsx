'use client'

import { useState } from "react";
import Input from "./Input";
import InputCheckbox from "./InputCheckbox";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import { Calculator } from "lucide-react";

interface SRIParameters {
    weight: number,
    height: number,
    previousWeight: number,
    lowIngestaFive: boolean,
    lowIngestaTen: boolean,
    potassium: number,
    phosphorus: number,
    magnesium: number,
    atcd: boolean,
}

interface SRIResults {
    weight: number,
    height: number,
    imc: number,
    previousWeight: number,
    weightLoss: number,
    lowIngestaFive: boolean,
    lowIngestaTen: boolean,
    potassium: number,
    phosphorus: number,
    magnesium: number,
    atcd: boolean,
}

export default function SRIForm() {
    const [calculDone, setCalculDone] = useState<boolean>(false);
    const [parameters, setParameters] = useState<SRIParameters>({
        weight: 0,
        height: 0,
        previousWeight: 0,
        lowIngestaFive: false,
        lowIngestaTen: false,
        potassium: 0,
        phosphorus: 0,
        magnesium: 0,
        atcd: false,
    })
    const [results, setResults] = useState<SRIResults>({
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
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setParameters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangeIngestaFive = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParameters(prev => ({
            ...prev,
            lowIngestaFive: !parameters.lowIngestaFive
        }))
    }

    const handleChangeIngestaTen = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParameters(prev => ({
            ...prev,
            lowIngestaTen: !parameters.lowIngestaTen
        }))
    }

    const handleChangeAtcd = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParameters(prev => ({
            ...prev,
            atcd: !parameters.atcd
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (parameters.weight > 0 && parameters.height > 0) {
            const imc = parameters.weight / ((parameters.height / 100) * (parameters.height / 100));
            setCalculDone(true);
            setResults(prev => ({
                ...prev,
                weight: parameters.weight,
                height: parameters.height,
                imc: imc,
                previousWeight: parameters.previousWeight,
                lowIngestaFive: parameters.lowIngestaFive,
                lowIngestaTen: parameters.lowIngestaTen,
                potassium: parameters.potassium,
                phosphorus: parameters.phosphorus,
                magnesium: parameters.magnesium,
                atcd: parameters.atcd,
            }))
        }

        if (parameters.weight > 0 && parameters.previousWeight > 0) {
            const weightLoss = ((parameters.previousWeight - parameters.weight) / parameters.previousWeight * 100).toFixed(1);
            setResults(prev => ({
                ...prev,
                weightLoss: parseInt(weightLoss)
            }))
        }
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
                        value={parameters.previousWeight}
                        onChange={handleChange}
                    />
                    <InputCheckbox
                        name="lowIngestaFive"
                        checked={parameters.lowIngestaFive}
                        title="Ingesta faibles ou nuls depuis plus de 5 jours"
                        onChange={handleChangeIngestaFive}
                    />
                    <InputCheckbox
                        name="lowIngestaTen"
                        checked={parameters.lowIngestaTen}
                        title="Ingesta faibles ou nuls depuis plus de 10 jours"
                        onChange={handleChangeIngestaTen}
                    />
                    <p>
                        Taux sanguins avant renutrition :
                    </p>
                    <Input
                        title="- Potassium (mmol/L) : "
                        name="potassium"
                        value={parameters.potassium}
                        onChange={handleChange}
                    />
                    <Input
                        title="- Phosphore (mmol/L) : "
                        name="phosphorus"
                        value={parameters.phosphorus}
                        onChange={handleChange}
                    />
                    <Input
                        title="- Magnésium (mmol/L) : "
                        name="magnesium"
                        value={parameters.magnesium}
                        onChange={handleChange}
                    />
                    <InputCheckbox
                        name="atcd"
                        checked={parameters.atcd}
                        title="Antécédents d'éthylisme, traitement par insuline, chimiothérapie, antiacides, diurétiques, chirurgie bariatrique"
                        onChange={handleChangeAtcd}
                    />
                    <ButtonGreen
                        text="Calculer"
                        type="submit"
                        lucide={Calculator}
                    />
                </div>
            </form>
            {calculDone &&
                <div
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <h2 className="text-lg font-bold">
                        ✅ Résultats :
                    </h2>
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
                        <p className="underline">
                            Critère(s) majeur(s) :
                        </p>
                        {((results.imc < 16) || (results.weightLoss > 15) || (results.lowIngestaTen) || (results.potassium < 10) || (results.phosphorus < 0.75) || (results.magnesium > 10)) ?
                            <ul className="pl-5 list-disc">
                                {results.imc < 16 && <li>IMC inférieur à 16 kg/m²</li>}
                                {results.weightLoss > 15 && <li>Perte de poids de plus de 15 % en 3 à 6 mois</li>}
                                {results.lowIngestaTen && <li>Ingesta faibles ou nuls depuis plus de 10 jours</li>}
                                {results.potassium < 16 && <li>Potassium trop bas</li>}
                                {results.phosphorus < 0.75 && <li>Phosphore trop bas</li>}
                                {results.magnesium < 16 && <li>Magnésium trop bas</li>}
                            </ul>
                            : ""}
                    </div>
                    <div>
                        <p className="underline">
                            Critère(s) mineur(s) :
                        </p>
                        {((results.imc > 16 && results.imc < 18.5) || (results.weightLoss > 10 && results.weightLoss <= 15) || (results.lowIngestaFive && !results.lowIngestaTen) || (results.atcd)) ?
                            <ul className="pl-5 list-disc">
                                {results.imc > 16 && results.imc < 18.5 && <li>IMC inférieur à 18,5 kg/m²</li>}
                                {results.weightLoss > 10 && results.weightLoss <= 15 && <li>Perte de poids de plus de 10 % en 3 à 6 mois</li>}
                                {results.lowIngestaFive && <li>Ingesta faibles ou nuls depuis plus de 5 jours</li>}
                                {results.atcd && <li>Antécédents d'éthylisme, traitement par insuline, chimiothérapie, antiacides, diurétiques, chirurgie bariatrique</li>}
                            </ul>
                            : ""}
                    </div>
                    <div>
                        La présence d'1 critère majeur ou d'au moins 2 critères mineurs suffit à diagnostiquer le risque de SRI.
                    </div>
                </div>
            }
        </>
    )
}