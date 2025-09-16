import { Trash2 } from "lucide-react";

export default function IngestaColapse(props: { food: string, quantity: number, calories: number, protein: number, fats: number, carbohydrates: number, onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <div className="flex flex-row items-start gap-2">
            <div className="collapse collapse-arrow border-base-300 border">
                <input type="checkbox" />
                <div className="collapse-title font-semibold flex flex-row justify-between gap-2">
                    <div>{props.food}</div>
                    <p className="text-(--grayColor)">
                        {props.quantity}&nbsp;g
                    </p>
                </div>
                <div className="collapse-content text-sm">
                    <p>Pour {props.quantity} g :</p>
                    <ul>
                        <li>- Energie : {props.calories} kcal</li>
                        <li>- Protéines : {props.protein} g</li>
                        <li>- Lipides : {props.fats} g</li>
                        <li>- Glucides : {props.carbohydrates} g</li>
                    </ul>
                </div>
            </div>
            <button type="button" className="pt-4 text-(--redColor)" onClick={props.onClick} title="Supprimer cet aliment de la liste">
                <Trash2 />
            </button>
        </div>
    )
}