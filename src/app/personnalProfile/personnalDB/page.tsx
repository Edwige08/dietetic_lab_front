'use client'

import BDDCreation from "@/components/BDDCreation";
import ButtonGreen from "@/components/ButtonGreen";
import FoodColapse from "@/components/FoodColapse";
import Title from "@/components/Title";
import TitleTwo from "@/components/TitleTwo";
import { PersonnalDB } from "@/types/FoodDB";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

    const [userDB, setUserDB] = useState<PersonnalDB>();
    const [seeDB, setSeeDB] = useState<boolean>(true);

    // async function getUserDB() {
    //     try {
    //         const token = localStorage.getItem("auth_token");
    //         if (!token) return;

    //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/personal-databases/${id}/`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Token ${token}`
    //             },
    //         });
    //         const data = await response.json();
    //         console.log("🎁 data : ", data);

    //         if (!response.ok) {
    //             throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
    //         }

    //     } catch (error) {
    //         const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    //         console.log(errorMessage);
    //     }
    // }

    const handleClickSeeDB = () => {
        setSeeDB(!seeDB);
    }

    const removeFood = () => {

    }

    return (
        <div className="flex flex-col items-center">
            <Link href="/personnalProfile">Retour profil</Link>
            <div className="px-4 mx-3 w-[90%] md:w-[75%]">
                <Title text="Ma base de données alimentaires" />
            </div>

            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <div className="border p-2">
                    <p className=" italic text-(--redColor)">
                        Si pas de BDD nutritionnelle, affiche :
                    </p>
                    <p>
                        Vous n'avez pour le moment aucune base de données nutritionnelles personnalisée
                    </p>
                    <div className="flex flex-col justify-center">

                        <ButtonGreen lucide={CirclePlus} type="button" text="Créer une base" />
                    </div>
                </div>

                <BDDCreation />

                <div className="border p-2">
                    <p className=" italic text-(--redColor)">
                        Sinon, affiche :
                    </p>
                    <div className="flex flex-col items-center">
                        <TitleTwo text="Nom de ma BDD" />
                    </div>
                    <div className="flex flex-row justify-center gap-4 p-2">

                        <button className="border rounded-lg w-30 py-1 bg-(--blueLightColor) hover:underline">Modifier</button>
                        <button className="border rounded-lg w-30 bg-(--redLightColor) hover:underline">Supprimer</button>
                    </div>
                    <div role="tablist" className="tabs tabs-lift flex flex-row justify-center">
                        <button onClick={handleClickSeeDB} role="tab" className={`tab w-[50%] ${seeDB ? "tab-active underline" : ""}`}>Voir ma base</button>
                        <button onClick={handleClickSeeDB} role="tab" className={`tab w-[50%] ${seeDB ? "" : "tab-active underline"}`}>Rechercher dans ma base</button>
                    </div>
                    {seeDB ?
                        <div>
                            <p className=" italic text-(--redColor)">
                                Liste des aliments à trier par ordre alphabétique. <br />
                                Quand clic suppr = pop-up qui valide suppr° alim
                            </p>
                            <FoodColapse
                                key="1"
                                food="Nom aliment 1"
                                calories={100}
                                protein={100}
                                fats={100}
                                carbohydrates={100}
                                fibers={100}
                                sugar={100}
                                ags={100}
                                agmi={100}
                                agpi={100}
                                cholesterol={100}
                                alcohol={100}
                                sodium={100}
                                potassium={100}
                                phosphorus={100}
                                iron={100}
                                calcium={100}
                                vitamin_d={100}
                                onClick={() => removeFood()}
                            />
                            <FoodColapse
                                key="2"
                                food="Nom aliment 2"
                                calories={100}
                                protein={100}
                                fats={100}
                                carbohydrates={100}
                                fibers={100}
                                sugar={100}
                                ags={100}
                                agmi={100}
                                agpi={100}
                                cholesterol={100}
                                alcohol={100}
                                sodium={100}
                                potassium={100}
                                phosphorus={100}
                                iron={100}
                                calcium={100}
                                vitamin_d={100}
                                onClick={() => removeFood()}
                            />
                        </div>
                        :
                        <div>
                            <p className=" italic text-(--redColor)">
                                Input pour recherche par nom
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}