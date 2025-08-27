'use client'

import { useState } from "react";
import Input from "./Input";
import InputText from "./InputText";
import Title from "./Title";
import TitleTwo from "./TitleTwo";
import ButtonGreen from "./ButtonGreen";
import { ListPlus } from "lucide-react";
import IngestaResults from "./IngestaResults";
import IngestaColapse from "./IngestaColapse";

interface FoodWithQuantity {
    food: string,
    quantity: number,
}

export default function IngestaForm() {
    const [foodWithQuantity, setFoodWithQuantity] = useState<FoodWithQuantity>({ food: "", quantity: 0 })
    const [foodTable, setFoodTable] = useState("");

    const foodListExample = [
        {
            food: "Pain",
            quantity: 60,
            calories: 165.6,
            protein: 4.9,
            fats: 1.61,
            carbohydrates: 32.6
        },
        {
            food: "Beurre demi-sel",
            quantity: 10,
            calories: 75.3,
            protein: 0.1,
            fats: 8.3,
            carbohydrates: 0.1
        },
        {
            food: "Lait demi-écrémé",
            quantity: 100,
            calories: 47,
            protein: 3.3,
            fats: 1.5,
            carbohydrates: 4.8
        },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFoodWithQuantity(prev => ({
            ...prev,
            [name]: value

        }))
    };

    return (
        <>
            <Title
                text="Calcul des ingesta"
            />
            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Ajouter des aliments au calcul"
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
                    text="Liste des aliments pour le calcul"
                />

                <div className="flex flex-col gap-1">
                    {foodListExample.map((food, index) => {
                        return (
                            <IngestaColapse
                                index={index}
                                food={food.food}
                                quantity={food.quantity}
                                calories={food.calories}
                                protein={food.protein}
                                fats={food.fats}
                                carbohydrates={food.carbohydrates}
                            />
                        )
                    })}
                </div>
            </div>

            <IngestaResults
                energy={1300}
                proteins={30}
                fats={30}
                ags={10}
                agmi={10}
                agpi={10}
                cholesterol={10}
                carbohydrates={30}
                sugar={10}
                fibers={30}
            />
        </>
    )
}