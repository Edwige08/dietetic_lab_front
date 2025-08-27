import { Trash2 } from "lucide-react";

export default function IngestaColapse(props: { index: number, food: string, quantity: number, calories: number, protein: number, fats: number, carbohydrates: number, onClick: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <div key={props.index} className="collapse collapse-arrow border-base-300 border">
            <input type="checkbox" />
            <div className="collapse-title font-semibold flex flex-row justify-between">
                <div>{props.food}</div>
                <div className="flex flex-row items-center gap-3">
                    <div className="text-(--grayColor)">{props.quantity}&nbsp;g</div>
                    <button type="button" onClick={props.onClick}><Trash2 /></button>
                </div>
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
    )
}