'use client'

import { useState } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import { Calculator } from 'lucide-react';
import Title from "./Title";
import TitleTwo from "./TitleTwo";
import { CalculateIMC } from "@/utils/CalculateIMC";
import { IMCParameters, IMCResults } from "@/types/IMC";
import { IMCCategory } from "@/utils/IMCCategory";

export default function IMCForm() {

    const [weightHeight, setWeightHeight] = useState<IMCParameters>({ weight: 0, height: 0 });
    const [IMCresults, setIMCResults] = useState<IMCResults>({ weight: 0, height: 0, imc: 0 });
    const [calculDone, setCalculDone] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (weightHeight.weight > 0 && weightHeight.height > 0) {
            setCalculDone(true);
            const imc = CalculateIMC(weightHeight.weight, weightHeight.height)
            setIMCResults({ weight: weightHeight.weight, height: weightHeight.height, imc: imc })
        } else if (weightHeight.weight > 0 && weightHeight.height === 0) {
            alert("Vous avez oublié d'entrer une taille")
        } else if (weightHeight.weight === 0 && weightHeight.height > 0) {
            alert("Vous avez oublié d'entrer un poids")
        } else {
            alert("Vous devez rentrer un poids et une taille")
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setWeightHeight(prev => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setWeightHeight({ weight: 0, height: 0 });
        setCalculDone(false);
    }

    return (
        <>
            <div>
                <Title text="Calcul de l&apos;IMC" />
            </div>

            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <Input
                    title="Poids (kg) : "
                    name="weight"
                    step={0.1}
                    value={weightHeight.weight}
                    onChange={handleChange}
                />
                <Input
                    title="Taille (cm) : "
                    name="height"
                    onChange={handleChange}
                    value={weightHeight.height}
                />

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
                    className="flex flex-col gap-4 px-4 pb-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <TitleTwo text="✅ Résultat&nbsp;:" />
                    <p>
                        Pour un poids de <span className="font-bold">{IMCresults.weight} kg</span> et une taille de <span className="font-bold">{(IMCresults.height / 100).toFixed(2)} m</span>, on obtient un IMC de <span className="font-bold">{IMCresults.imc.toFixed(2)} kg/m²</span>, ce qui correspond à <span className="font-bold">{IMCCategory(IMCresults.imc)}</span>.
                    </p>
                </div>
            }
        </>
    )
}