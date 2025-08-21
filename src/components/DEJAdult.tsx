'use client'

import { MouseEvent, useState } from "react";
import Input from "./Input";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import { Calculator, Mars, Venus } from "lucide-react";

interface DejParameters {
    weight: number,
    height: number,
    age: number,
    gender: string,
    nap: number,
}

interface DejResults {
    weight: number,
    height: number,
    imc: number,
    age: number,
    gender: string,
    nap: number,
}

export default function DEJAdult() {
    const [dejParameters, setDejParameters] = useState<DejParameters>({ weight: 0, height: 0, age: 0, gender: "f", nap: 0 })
    const [dejResults, setDejResults] = useState<DejResults>({ weight: 0, height: 0, imc: 0, age: 0, gender: "f", nap: 0 })
    const [calculDone, setCalculDone] = useState<boolean>(false);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();
        const target = event.target as HTMLButtonElement;
        const name = target.name;
        setDejParameters(prev => ({
            ...prev,
            gender: name
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setDejParameters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (dejParameters.weight > 0 && dejParameters.height > 0 && dejParameters.age > 0 && dejParameters.nap > 0) {
            const imc = dejParameters.weight / ((dejParameters.height / 100) * (dejParameters.height / 100));
            setCalculDone(true);
            setDejResults({ weight: dejParameters.weight, height: dejParameters.height, imc: imc, age: dejParameters.age, gender: dejParameters.gender, nap: dejParameters.nap })

        }
    }

    const resetForm = () => {
        setDejParameters({ weight: 0, height: 0, age: 0, gender: "f", nap: 0 })
        setCalculDone(false);
    }

    return (
        <>
            <div className="px-4 mx-3 w-[90%] md:w-[75%]">
                <Title
                    text="Calcul de la Dépense Energétique Journalière (DEJ)"
                />
            </div>
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-row justify-center gap-5">
                    <button
                        name="f"
                        className={`flex flex-row gap-2 items-center justify-center py-1 border rounded-lg h-13 w-[140px] ${dejParameters.gender === "f" ? "underline font-bold bg-(--orangeColor)" : ""}`}
                        onClick={handleClick}
                        type="button"
                    >
                        <Venus />
                        Femme
                    </button>
                    <button
                        name="h"
                        className={`flex flex-row gap-2 items-center justify-center py-1 border rounded-lg h-13 w-[140px] ${dejParameters.gender === "h" ? "underline font-bold bg-(--orangeColor)" : ""}`}
                        onClick={handleClick}
                        type="button"
                    >
                        <Mars />
                        Homme
                    </button>
                </div>
                <Input
                    title="Poids (kg) : "
                    name="weight"
                    value={dejParameters.weight}
                    onChange={handleChange}
                />
                <Input
                    title="Taille (cm) : "
                    name="height"
                    value={dejParameters.height}
                    onChange={handleChange}
                />
                <Input
                    title="Age (ans) : "
                    name="age"
                    value={dejParameters.age}
                    onChange={handleChange}
                />
                <Input
                    title="NAP : "
                    name="nap"
                    value={dejParameters.nap}
                    onChange={handleChange}
                />
                <ButtonGreen
                    text="Calculer"
                    type="submit"
                    lucide={Calculator}
                />
                {/* {calculDone &&
                    <button
                        type="reset"
                        onClick={resetForm}
                        className="underline"
                    >
                        Reset
                    </button>
                } */}
            </form>
            {calculDone &&
                <div
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <h2 className="text-lg font-bold">
                        ✅ Résultats :
                    </h2>
                    <p>
                        Pour un poids de <span className="font-bold">{dejResults.weight} kg</span> et une taille de <span className="font-bold">{dejResults.height} cm</span>, on obtient un IMC de <span className="font-bold">{dejResults.imc.toFixed(2)} kg/m²</span>.
                    </p>
                    <p className="underline">
                        Avec la formule de Harris et Benedict :
                    </p>
                    <p>
                        Pour <span className="font-bold">{dejResults.gender === 'f' ? "une femme" : "un homme"}</span> de <span className="font-bold">{dejResults.age} ans</span>, mesurant <span className="font-bold">{dejResults.height / 100} m</span> pour <span className="font-bold">{dejResults.weight} kg</span> et ayant un <span className="font-bold">NAP à {dejResults.nap}</span> on obtient un DEJ de
                        {dejResults.gender === "f" ?
                            <span className="font-bold"> {((9.740 * dejResults.weight + 184.96 * (dejResults.height / 100) - 4.6756 * dejResults.age + 655.0955) * dejResults.nap).toFixed(0)} kcal</span>
                            :
                            <span className="font-bold"> {((13.7516 * dejResults.weight + 500.33 * (dejResults.height / 100) - 6.7550 * dejResults.age + 66.479) * dejResults.nap).toFixed(0)} kcal</span>
                        }.
                    </p>
                    <p className="underline">
                        Avec la formule de Black et al. :
                    </p>
                    <p>
                        Pour <span className="font-bold">{dejResults.gender === 'f' ? "une femme" : "un homme"}</span> de <span className="font-bold">{dejResults.age} ans</span>, mesurant <span className="font-bold">{dejResults.height / 100} m</span> pour <span className="font-bold">{dejResults.weight} kg</span> et ayant un <span className="font-bold">NAP à {dejResults.nap}</span> on obtient un DEJ de
                        {dejResults.gender === "f" ?
                            <span className="font-bold"> {((0.963 * Math.pow(dejResults.weight, 0.48) * Math.pow((dejResults.height / 100), 0.50) * Math.pow(dejResults.age, -0.13)) * dejResults.nap * 239).toFixed(0)} kcal</span>
                            :
                            <span className="font-bold"> {((1.083 * Math.pow(dejResults.weight, 0.48) * Math.pow((dejResults.height / 100), 0.50) * Math.pow(dejResults.age, -0.13)) * dejResults.nap * 239).toFixed(0)} kcal</span>
                        }.
                    </p>
                </div>}
        </>
    )
}