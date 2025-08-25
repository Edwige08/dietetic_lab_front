'use client'

import { useState } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import { Calculator } from 'lucide-react';

interface WeightHeight {
    weight: number,
    height: number,
}

interface IMCResults {
    weight: number,
    height: number,
    imc: number,
}

export default function IMCForm() {

    const [weightHeight, setWeightHeight] = useState<WeightHeight>({ weight: 0, height: 0 });
    const [calculDone, setCalculDone] = useState<boolean>(false);
    const [IMCresults, setIMCResults] = useState<IMCResults>({ weight: 0, height: 0, imc: 0 });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (weightHeight.weight > 0 && weightHeight.height > 0) {
            const imc = weightHeight.weight / ((weightHeight.height / 100) * (weightHeight.height / 100));
            console.log("imc : ", imc);
            setCalculDone(true);
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

        setWeightHeight(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const getIMCCategory = (imc: number) => {
        if (imc < 18.5) return "un état de maigreur"
        if (imc < 25) return "un équilibre staturo-pondéral"
        if (imc < 30) return "un surpoids"
        if (imc < 35) return "une obésité de grade I"
        if (imc < 40) return "une obésité de grade II"
        if (imc < 45) return "une obésité de grade III"
        if (imc >= 45) return "une obésité de grade IV"
    }

    const resetForm = () => {
        setWeightHeight({ weight: 0, height: 0 });
        setCalculDone(false);
    }

    return (
        <>
            <div>

                <h2 className="py-4 text-3xl font-bold text-(--greenSecondColor) ">
                    Calcul de l&apos;IMC
                </h2>
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
                    className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--orangeLightColor) border border-gray-300 rounded-xl shadow-xl"
                >
                    <h2 className="text-lg font-bold">
                        ✅ Résultat :
                    </h2>
                    <p>
                        Pour un poids de <span className="font-bold">{IMCresults.weight} kg</span> et une taille de <span className="font-bold">{(IMCresults.height / 100).toFixed(2)} m</span>, on obtient un IMC de <span className="font-bold">{IMCresults.imc.toFixed(2)} kg/m²</span>, ce qui correspond à <span className="font-bold">{getIMCCategory(IMCresults.imc)}</span>.
                    </p>
                </div>
            }
        </>
    )
}