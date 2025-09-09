'use client';

import ButtonGreen from "@/components/ButtonGreen"
import SeeMessages from "@/components/SeeMessages";
import Title from "@/components/Title"
import WriteMessage from "@/components/WriteMessage";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [comment, setComment] = useState<string>("");
    const [seeWriteMessage, setSeeWriteMessage] = useState<boolean>(true);

    const handleChangeSeerWrite = () => {
        setSeeWriteMessage(!seeWriteMessage);
    }

    return (
        <div className="flex flex-col items-center">
            <Title text="Mes messages" />
            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <div role="tablist" className="tabs tabs-lift">
                    <button role="tab" onClick={handleChangeSeerWrite} className={`tab w-[50%] text-lg ${seeWriteMessage ? "tab-active font-bold underline" : ""}`} disabled={seeWriteMessage}>Ecrire un message</button>
                    <button role="tab" onClick={handleChangeSeerWrite} className={`tab w-[50%] text-lg ${seeWriteMessage ? "" : "tab-active font-bold underline"}`} disabled={!seeWriteMessage}>Messages envoyés</button>
                </div>

                {seeWriteMessage ?
                    <WriteMessage />
                    :
                    <SeeMessages onClick={handleChangeSeerWrite} />
                }
            </div>
        </div>
    )
}