import { Trash2 } from "lucide-react";

export default function FoodColapse(props: {
    food: string, 
    calories: number, 
    protein: number, 
    fats: number,
    carbohydrates: number,
    fibers: number,
    sugar: number,
    ags: number,
    agmi: number,
    agpi: number,
    cholesterol: number,
    alcohol: number,
    sodium: number,
    potassium: number,
    phosphorus: number,
    iron: number,
    calcium: number,
    vitamin_d: number,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <div className="flex flex-row gap-2">
            <div className="collapse collapse-arrow border-base-300 border">
                <input type="checkbox" />
                <div className="collapse-title font-semibold flex flex-row justify-between gap-2">
                    <div>{props.food}</div>
                </div>
                <div className="collapse-content text-sm">
                    <p>Pour 100 g :</p>
                    <ul>
                        <li>- Energie : {props.calories} kcal</li>
                        <li>- Protéines : {props.protein} g</li>
                        <li>- Lipides : {props.fats} g</li>
                        <li className="">&nbsp;&nbsp; dont AGS : {props.ags} g</li>
                        <li className="">&nbsp;&nbsp; dont AGMI : {props.agmi} g</li>
                        <li className="">&nbsp;&nbsp; dont AGPI : {props.agpi} g</li>
                        <li className="">&nbsp;&nbsp; cholestérol : {props.cholesterol} g</li>
                        <li>- Glucides : {props.carbohydrates} g</li>
                        <li className="">&nbsp;&nbsp; dont sucres : {props.sugar} g</li>
                        <li>- Fibres : {props.fibers} g</li>
                        <li>- Alcool : {props.alcohol} g</li>
                        <li>- Sodium : {props.sodium} g</li>
                        <li>- Potassium : {props.potassium} g</li>
                        <li>- Phosphore : {props.phosphorus} g</li>
                        <li>- Fer : {props.iron} g</li>
                        <li>- Calcium : {props.calcium} g</li>
                        <li>- Vitamine D : {props.vitamin_d} g</li>
                    </ul>
                </div>
            </div>
            <button type="button" className="text-(--redColor)" onClick={props.onClick} title="Supprimer cet aliment de la liste">
                <Trash2 />
            </button>
        </div>
    )
}