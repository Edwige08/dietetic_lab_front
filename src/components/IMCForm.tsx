'use client'

import { useState } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import ButtonRed from "./ButtonRed";

interface WeightHeight {
    weight: number,
    height: number,
}

export default function IMCForm() {

    const [weightHeight, setWeightHeight] = useState<WeightHeight>({ weight: 0, height: 0 })
    const [calculDone, setCalculDone] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [IMCvalue, setIMCvalue] = useState<number>(0)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsDisabled(true)

        if (weightHeight.weight > 0 && weightHeight.height > 0) {
            const imc = weightHeight.weight / ((weightHeight.height / 100) * (weightHeight.height / 100))
            console.log("imc : ", imc);
            setIMCvalue(imc)
            setCalculDone(true)
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
        setIsDisabled(false)
    }

    return (
        <>
            <form
                className="flex flex-col gap-4 p-4 m-3 bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <h2 className="text-lg font-bold">
                    Calcul de l'IMC
                </h2>
                <Input
                    title="Poids (en kg)"
                    name="weight"
                    value={weightHeight.weight}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
                <Input
                    title="Taille (en cm)"
                    name="height"
                    onChange={handleChange}
                    value={weightHeight.height}
                    disabled={isDisabled}
                />

                <ButtonGreen
                    text="Calculer"
                    type="submit"
                />
            </form>
            {calculDone ?
                <div
                    className="flex flex-col gap-4 p-4 m-3 bg-white border border-gray-300 rounded-xl shadow-xl"
                >
                    <h2 className="text-lg font-bold">
                        Résultat :
                    </h2>
                    <p>
                        Pour un poids de <span className="font-bold">{weightHeight.weight} kg</span> et une taille de <span className="font-bold">{weightHeight.height} cm</span>, on obtient un IMC de <span className="font-bold">{IMCvalue.toFixed(2)} kg/m²</span>, ce qui correspond à <span className="font-bold">{getIMCCategory(IMCvalue)}</span>.
                    </p>
                    <ButtonRed
                        text="Nouveau calcul"
                        type="reset"
                        onClick={resetForm}
                    />
                </div> : ""
            }
        </>
    )
}