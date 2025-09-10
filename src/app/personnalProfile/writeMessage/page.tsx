'use client';

import SeeMessages from "@/components/SeeMessages";
import Title from "@/components/Title"
import WriteMessage from "@/components/WriteMessage";
import { useState } from "react";

export default function Home() {
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
                    <button role="tab" onClick={handleChangeSeerWrite} className={` text-black w-[50%] py-2 rounded-t-lg ${seeWriteMessage ? " font-bold underline text-black border-x border-t border-black" : "border-b border-black bg-(--grayLightColor) text-gray-700"}`} disabled={seeWriteMessage}>Ecrire un message</button>
                    <button role="tab" onClick={handleChangeSeerWrite} className={` text-black w-[50%] py-2 rounded-t-lg ${seeWriteMessage ? "border-b border-black bg-(--grayLightColor) text-gray-700" : " font-bold underline text-black border-x border-t border-black"}`} disabled={!seeWriteMessage}>Messages envoyés</button>
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