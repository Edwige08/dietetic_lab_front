'use client'

import { useState } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import ButtonRed from "./ButtonRed";
import { loadManifestWithRetries } from "next/dist/server/load-components";

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
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    // const [IMCvalue, setIMCvalue] = useState<number>(0);
    const [IMCresults, setIMCResults] = useState<IMCResults>({ weight: 0, height: 0, imc: 0 });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (weightHeight.weight > 0 && weightHeight.height > 0) {
            const imc = weightHeight.weight / ((weightHeight.height / 100) * (weightHeight.height / 100));
            console.log("imc : ", imc);
            // setIMCvalue(imc);
            setCalculDone(true);
            setIMCResults({ weight: weightHeight.weight, height: weightHeight.height, imc: imc })
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
                />
                <Input
                    title="Taille (en cm)"
                    name="height"
                    onChange={handleChange}
                    value={weightHeight.height}
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
                        Pour un poids de <span className="font-bold">{IMCresults.weight} kg</span> et une taille de <span className="font-bold">{IMCresults.height} cm</span>, on obtient un IMC de <span className="font-bold">{IMCresults.imc.toFixed(2)} kg/m²</span>, ce qui correspond à <span className="font-bold">{getIMCCategory(IMCresults.imc)}</span>.
                    </p>


                    <ButtonRed
                        text="Nouveau calcul"
                        type="reset"
                        onClick={resetForm}
                    />
                </div> : ""
            }
            <div
                className="flex flex-col gap-4 p-4 m-3 bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <div className="flex flex-col gap-4 mb-5">
                    <h2 className="text-lg font-bold">
                        Comment calcule-t-on l'IMC ?
                    </h2>
                    <p>L'Indice de Masse Corporelle se calcule avec la formule suivante :</p>
                    <div className="flex justify-center">
                        <p className="py-2 px-6 w-fit text-center font-bold text-lg border">
                            IMC = Poids (kg) / (Taille (m))²
                        </p>
                    </div>
                    <p>
                        Cependant, cette formule n'est valable que pour les adultes entre 18 et 65 ans. Elle n'est pas valable pour les enfants, les personnes âgées, mais aussi les femmes enceintes.
                    </p>
                </div>

                <h2 className="text-lg font-bold">
                    Interprétation de l'IMC :
                </h2>
                <div className="grid grid-cols-2 text-center border">
                    <div className="border p-1 bg-(--) font-bold">
                        Valeur de l'IMC
                    </div>
                    <div className="border p-1 bg-(--) font-bold">
                        Interprétation
                    </div>
                    <div className="border p-1 bg-(--yellowLightColor)">
                        Inférieur à 18.5 kg/m²
                    </div>
                    <div className="border p-1 bg-(--yellowLightColor)">
                        Maigreur
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Entre 18.5 et 25 kg/m²
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Equilibre staturo-pondéral
                    </div>
                    <div className="border p-1 bg-(--orangeLightColor)">
                        Entre 25 et 30 kg/m²
                    </div>
                    <div className="border p-1 bg-(--orangeLightColor)">
                        Surpoids
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Entre 30 et 35 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade I
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Entre 35 et 40 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade II
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Entre 40 et 45 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade III
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Supérieur à 45 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade IV
                    </div>
                </div>

            </div>
        </>
    )
}