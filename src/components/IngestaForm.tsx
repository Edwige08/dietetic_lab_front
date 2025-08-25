'use client'

import { useState } from "react";
import InputText from "./InputText";
import Title from "./Title";
import Input from "./Input";
import ButtonGreen from "./ButtonGreen";
import { ListPlus } from "lucide-react";
import TitleTwo from "./TitleTwo";

export default function IngestaForm() {
    const [foodWithQuantity, setFoodWithQuantity] = useState({ food: "", quantity: 0 })
    const [foodTable, setFoodTable] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFoodWithQuantity(prev => ({
            ...prev,
            [name]: value

        }))
    }

    return (
        <>
            <Title
                text="Calcul des ingesta"
            />
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Ajouter des aliments"
                />
                <InputText
                    title="Aliment : "
                    name="food"
                    value={foodWithQuantity.food}
                    onChange={handleChange}
                />
                <Input
                    title="Quantité (g) : "
                    name="quantity"
                    value={foodWithQuantity.quantity}
                    onChange={handleChange}
                />
                <ButtonGreen
                    text="Ajouter"
                    type="submit"
                    lucide={ListPlus}
                />

            </form>

            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Liste d'aliments"
                />
            </div>

            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Résultat"
                />
                <p>Au total, on a : </p>

                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-center">
                            Calories
                        </p>
                        <div className="flex flex-col justify-center items-center border rounded-full h-20 w-20 shadow-lg border-(--grayColor) bg-(--grayMediumColor)">
                            <p className="text-center font-bold">
                                1300
                                <br />
                                kcal
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-center">
                            Protéines
                        </p>
                        <div className="flex flex-col justify-center items-center border rounded-full h-20 w-20 shadow-lg border-(--redSecondColor) bg-(--redLightColor)">
                            <p className="text-center font-bold">
                                30 g
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-center">
                            Lipides

                        </p>
                        <div className="flex flex-col justify-center items-center border rounded-full h-20 w-20 shadow-lg border-(--yellowSecondColor) bg-(--yellowLightColor)">
                            <p className="text-center font-bold">
                                30 g
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-center">
                            Glucides

                        </p>
                        <div className="flex flex-col justify-center items-center border rounded-full h-20 w-20 shadow-lg border-(--greenSecondColor) bg-(--greenLightColor)">
                            <p className="text-center font-bold">
                                30 g
                            </p>
                        </div>
                    </div>
                </div>

                <ul className="pl-5 list-disc">
                    <li>
                        XXX kcal ou xxx MJ
                    </li>
                    <li>
                        XXX g de protéines (XXX kcal), soit XXX % de l'AET
                    </li>
                    <li>
                        XXX g de lipides (XXX kcal), soit XXX % de l'AET
                    </li>
                    <ul className="pl-5 list-disc">
                        <li>
                            dont XXX g d'AGS
                        </li>
                        <li>
                            dont XXX g d'AGMI
                        </li>
                        <li>
                            dont XXX g d'AGPI
                        </li>
                    </ul>
                    <li>
                        XXX g de glucides (XXX kcal), soit XXX % de l'AET
                    </li>
                    <ul className="pl-5 list-disc">
                        <li>
                            dont XXX g de sucres
                        </li>
                    </ul>
                </ul>
            </div>
        </>
    )
}