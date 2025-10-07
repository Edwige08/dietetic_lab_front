import { Trash2 } from "lucide-react";

export default function FoodColapse(props: {
    alim_nom_fr: string, 
    energie_reg_ue_kcal: string, 
    proteines: string, 
    lipides: string,
    glucides: string,
    sucres: string,
    fibres: string,
    ags: string,
    agmi: string,
    agpi: string,
    cholesterol: string,
    alcool: string,
    sodium: string,
    potassium: string,
    phosphore: string,
    fer: string,
    calcium: string,
    vitamine_d: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <div className="flex flex-row items-start gap-2">
            <div className="collapse collapse-arrow border-base-300 border">
                <input type="checkbox" />
                <div className="collapse-title font-semibold flex flex-row justify-between gap-2">
                    <div>{props.alim_nom_fr}</div>
                </div>
                <div className="collapse-content text-sm">
                    <p className="underline">Pour 100 g :</p>
                    <ul>
                        <li className="flex flex-row"><p className="min-w-35">- Energie : </p><p className="w-[50%]">{props.energie_reg_ue_kcal} kcal</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Protéines : </p><p className="w-[50%]">{props.proteines} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Lipides : </p><p className="w-[50%]">{props.lipides} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">&nbsp;&nbsp; dont AGS : </p><p className="w-[50%]">{props.ags} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">&nbsp;&nbsp; dont AGMI : </p><p className="w-[50%]">{props.agmi} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">&nbsp;&nbsp; dont AGPI : </p><p className="w-[50%]">{props.agpi} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">&nbsp;&nbsp; cholestérol : </p><p className="w-[50%]">{props.cholesterol} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Glucides : </p><p className="w-[50%]">{props.glucides} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">&nbsp;&nbsp; dont sucres : </p><p className="w-[50%]">{props.sucres} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Fibres : </p><p className="w-[50%]">{props.fibres} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Alcool : </p><p className="w-[50%]">{props.alcool} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Sodium : </p><p className="w-[50%]">{props.sodium} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Potassium : </p><p className="w-[50%]">{props.potassium} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Phosphore : </p><p className="w-[50%]">{props.phosphore} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Fer : </p><p className="w-[50%]">{props.fer} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Calcium : </p><p className="w-[50%]">{props.calcium} g</p></li>
                        <li className="flex flex-row"><p className="min-w-35">- Vitamine D : </p><p className="w-[50%]">{props.vitamine_d} g</p></li>
                    </ul>
                </div>
            </div>
            <button type="button" className="pt-4 text-(--redColor)" onClick={props.onClick} title="Supprimer cet aliment de la liste">
                <Trash2 />
            </button>
        </div>
    )
}