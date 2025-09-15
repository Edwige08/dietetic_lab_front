'use client'

import { MouseEvent, useEffect, useState } from "react";
import Input from "./Input";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import { Calculator, Mars, Venus } from "lucide-react";
import TitleTwo from "./TitleTwo";
import { CalculateIMC } from "@/utils/CalculateIMC";
import { CalculateDEJBlackMan, CalculateDEJBlackWoman, CalculateDEJHandBMan, CalculateDEJHandBWoman } from "@/utils/CalculateDEJ";
import { DEJParameters, DEJResults } from "@/types/DEJ";
import { useData } from "@/contexts/DataContext";

export default function DEJAdult() {
    const { data, updateData, resetData } = useData();

    const [dejParameters, setDejParameters] = useState<DEJParameters>({ weight: 0, height: 0, age: 0, gender: "f", nap: 0 })
    const [dejResults, setDejResults] = useState<DEJResults>({ weight: 0, height: 0, imc: 0, age: 0, gender: "f", nap: 0 })
    const [calculDone, setCalculDone] = useState<boolean>(false);

    useEffect(() => {
        setDejParameters({
            weight: data.weight,
            height: data.height,
            age: data.age,
            gender: data.gender,
            nap: data.nap,
        })
    }, [data.weight, data.height])


    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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
            const imc: number = CalculateIMC(dejParameters.weight, dejParameters.height)
            setCalculDone(true);
            setDejResults({ weight: dejParameters.weight, height: dejParameters.height, imc: imc, age: dejParameters.age, gender: dejParameters.gender, nap: dejParameters.nap });
            updateData({
                weight: dejParameters.weight,
                height: dejParameters.height,
                age: dejParameters.age,
                gender: dejParameters.gender,
                nap: dejParameters.nap,
            })

        } else {
            alert("Merci de bien remplir tous les champs.")
        }
    }

    const resetForm = () => {
        setDejParameters({ weight: 0, height: 0, age: 0, gender: "f", nap: 0 })
        setCalculDone(false);
        resetData();
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
                    step={0.1}
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
                    step={0.05}
                    value={dejParameters.nap}
                    onChange={handleChange}
                />
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
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <TitleTwo
                        text="🎯 Résultats&nbsp;:"
                    />
                    <p>
                        Pour un poids de <span className="font-bold">{dejResults.weight} kg</span> et une taille de <span className="font-bold">{dejResults.height} cm</span>, on obtient un IMC de <span className="font-bold">{dejResults.imc.toFixed(2)} kg/m²</span>.
                    </p>
                    <p className="underline">
                        Avec la formule de Harris et Benedict :
                    </p>
                    <p>
                        Pour <span className="font-bold">{dejResults.gender === 'f' ? "une femme" : "un homme"}</span> de <span className="font-bold">{dejResults.age} ans</span>, mesurant <span className="font-bold">{dejResults.height / 100} m</span> pour <span className="font-bold">{dejResults.weight} kg</span> et ayant un <span className="font-bold">NAP à {dejResults.nap}</span> on obtient un DEJ de
                        {dejResults.gender === "f" ?
                            <span className="font-bold"> {CalculateDEJHandBWoman(dejResults.weight, dejParameters.height, dejParameters.age, dejParameters.nap)} kcal</span>
                            :
                            <span className="font-bold"> {CalculateDEJHandBMan(dejResults.weight, dejParameters.height, dejParameters.age, dejParameters.nap)} kcal</span>
                        }.
                    </p>
                    <p className="underline">
                        Avec la formule de Black et al. :
                    </p>
                    <p>
                        Pour <span className="font-bold">{dejResults.gender === 'f' ? "une femme" : "un homme"}</span> de <span className="font-bold">{dejResults.age} ans</span>, mesurant <span className="font-bold">{dejResults.height / 100} m</span> pour <span className="font-bold">{dejResults.weight} kg</span> et ayant un <span className="font-bold">NAP à {dejResults.nap}</span> on obtient un DEJ de
                        {dejResults.gender === "f" ?
                            <span className="font-bold"> {CalculateDEJBlackWoman(dejResults.weight, dejParameters.height, dejParameters.age, dejParameters.nap)} kcal</span>
                            :
                            <span className="font-bold"> {CalculateDEJBlackMan(dejResults.weight, dejParameters.height, dejParameters.age, dejParameters.nap)} kcal</span>
                        }.
                    </p>
                </div>}
        </>
    )
}