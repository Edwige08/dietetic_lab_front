import { ChangeEventHandler, FormEventHandler } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import InputText from "./InputText";

export default function FoodCreation(props: {
    onSubmit: FormEventHandler<HTMLFormElement>,
    databaseName: string,
    alim_nom_fr: string,
    energie_reg_ue_kcal: string | number,
    proteines: string | number,
    lipides: string | number,
    ags: string | number,
    agmi: string | number,
    agpi: string | number,
    cholesterol: string | number,
    glucides: string | number,
    sucres: string | number,
    fibres: string | number,
    alcool: string | number,
    sodium: string | number,
    potassium: string | number,
    phosphore: string | number,
    fer: string | number,
    calcium: string | number,
    vitamine_d: string | number,
    onchange: ChangeEventHandler<HTMLInputElement>,
}) {
    return (
        <form onSubmit={props.onSubmit}>
            <p className="py-5 italic">
                Veuillez entrer le nom de votre aliment, ainsi que ses valeurs nutritionnelles pour 100g. Si certaines valeurs sont absentes, vous pouvez laisser le chiffre &quot;0&quot;.
            </p>
            <InputText
                title="Nom de l'aliment :"
                name="alim_nom_fr"
                type="text"
                value={props.alim_nom_fr}
                onChange={props.onchange}
            />

            <div className="pl-3 mt-5 ml-2 border-l-10 border-(--orangeLightColor) rounded-lg ">
                <Input
                    title="Calories (kcal) :"
                    name="energie_reg_ue_kcal"
                    step={0.1}
                    value={props.energie_reg_ue_kcal}
                    onChange={props.onchange}
                />
                <Input
                    title="Protéines (g) :"
                    name="proteines"
                    step={0.1}
                    value={props.proteines}
                    onChange={props.onchange}
                />
                <Input
                    title="Lipides (g) :"
                    name="lipides"
                    step={0.1}
                    value={props.lipides}
                    onChange={props.onchange}
                />
                <div className="pl-3 my-1 ml-2 border-l-10 border-(--yellowLightColor) rounded-lg ">
                    <Input
                        title="dont AGS (g) :"
                        name="ags"
                        step={0.1}
                        value={props.ags}
                        onChange={props.onchange}
                    />
                    <Input
                        title="dont AGMI (g) :"
                        name="agmi"
                        step={0.1}
                        value={props.agmi}
                        onChange={props.onchange}
                    />
                    <Input
                        title="dont AGPI (g) :"
                        name="agpi"
                        step={0.1}
                        value={props.agpi}
                        onChange={props.onchange}
                    />
                    <Input
                        title="dont cholestérol (g) :"
                        name="cholesterol"
                        step={0.1}
                        value={props.cholesterol}
                        onChange={props.onchange}
                    />
                </div>
                <Input
                    title="Glucides (g) :"
                    name="glucides"
                    step={0.1}
                    value={props.glucides}
                    onChange={props.onchange}
                />
                <div className="pl-3 my-1 ml-2 border-l-10 border-(--yellowLightColor) rounded-lg ">
                    <Input
                        title="dont sucres (g) :"
                        name="sucres"
                        step={0.1}
                        value={props.sucres}
                        onChange={props.onchange}
                    />
                </div>
                <Input
                    title="Fibres (g) :"
                    name="fibres"
                    step={0.1}
                    value={props.fibres}
                    onChange={props.onchange}
                />
                <Input
                    title="Alcool (g) :"
                    name="alcool"
                    step={0.1}
                    value={props.alcool}
                    onChange={props.onchange}
                />
                <Input
                    title="Sodium (mg) :"
                    name="sodium"
                    step={0.1}
                    value={props.sodium}
                    onChange={props.onchange}
                />
                <Input
                    title="Potassium (mg) :"
                    name="potassium"
                    step={0.1}
                    value={props.potassium}
                    onChange={props.onchange}
                />
                <Input
                    title="Phosphore (mg) :"
                    name="phosphore"
                    step={0.1}
                    value={props.phosphore}
                    onChange={props.onchange}
                />
                <Input
                    title="Fer (mg) :"
                    name="fer"
                    step={0.1}
                    value={props.fer}
                    onChange={props.onchange}
                />
                <Input
                    title="Calcium (mg) :"
                    name="calcium"
                    step={0.1}
                    value={props.calcium}
                    onChange={props.onchange}
                />
                <Input
                    title="Vitamine D (µg) :"
                    name="vitamine_d"
                    step={0.1}
                    value={props.vitamine_d}
                    onChange={props.onchange}
                />
            </div>
            <div className="flex flex-row justify-center pt-5">
                <ButtonGreen text="Valider l'aliment" />
            </div>
        </form>
    )
}