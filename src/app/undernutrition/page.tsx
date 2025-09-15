'use client'

import UndernutritionAdult from "@/components/UndernutritionAdult";
import UndernutritionInformation from "@/components/UndernutritionInformation";
import UndernutritionSenior from "@/components/UndernutritionSenior";
import { MouseEvent, useState } from "react";

export default function Home() {
    const [selectedPeople, setSelectedPeople] = useState<string>("senior");

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;
        const name = target.name;
        setSelectedPeople(name);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center gap-5 mb-5 mt-10">
                <button
                    name="senior"
                    className={`py-1 border rounded-lg h-13 w-[190] text-lg ${selectedPeople === "senior" ? "font-bold bg-(--orangeColor)" : "text-(--grayColor)"}`}
                    onClick={handleClick}
                >
                    👩‍🦳 Pers. âgée 👨‍🦳
                </button>
                <button
                    name="adult"
                    className={`py-1 border rounded-lg h-13 w-[190] text-lg ${selectedPeople === "adult" ? "font-bold bg-(--orangeColor)" : "text-(--grayColor)"}`}
                    onClick={handleClick}
                >
                    👩‍🦰 Adulte 🧑‍🦰
                </button>
            </div>
            {selectedPeople === "adult" ? <UndernutritionAdult /> : ""}
            {selectedPeople === "senior" ? <UndernutritionSenior /> : ""}
            <UndernutritionInformation />
        </div>
    )
}