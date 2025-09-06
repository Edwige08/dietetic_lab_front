'use client'

import { useState } from "react";
import FoodColapse from "./FoodColapse";
import TitleTwo from "./TitleTwo";

export default function BDDView() {
    const [seeDB, setSeeDB] = useState<boolean>(true);


    const handleClickSeeDB = () => {
        setSeeDB(!seeDB);
    }

    const removeFood = () => {
    }

    return (
        <div>
            <div className="border p-2">
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
    )
}