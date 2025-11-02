'use client'

import Title from "@/components/Title";
import UndernutritionAdult from "@/components/UndernutritionAdult";
import UndernutritionInformation from "@/components/UndernutritionInformation";
import UndernutritionSenior from "@/components/UndernutritionSenior";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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
            <div className="flex flex-row justify-start items-start gap-2 w-[90%] md:w-[75%]">
                <Link href="/" className="pt-5 text-4xl text-(--greenSecondColor)"><ChevronLeft /></Link>
                <div className="px-2 w-full">
                    <Title text="Evaluation de la dénutrition" />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-5 px-3 mb-5 w-[90%] md:w-[75%]">
                <button
                    name="senior"
                    className={`py-1 border rounded-lg h-13 w-[190] text-lg ${selectedPeople === "senior" ? "font-bold bg-(--orangeColor)" : "text-(--grayColor)"}`}
                    onClick={handleClick}
                >
                    Pers. âgée
                </button>
                <button
                    name="adult"
                    className={`py-1 border rounded-lg h-13 w-[190] text-lg ${selectedPeople === "adult" ? "font-bold bg-(--orangeColor)" : "text-(--grayColor)"}`}
                    onClick={handleClick}
                >
                    Adulte
                </button>
            </div>
            {selectedPeople === "adult" ? <UndernutritionAdult /> : ""}
            {selectedPeople === "senior" ? <UndernutritionSenior /> : ""}
            <UndernutritionInformation />
        </div>
    )
}