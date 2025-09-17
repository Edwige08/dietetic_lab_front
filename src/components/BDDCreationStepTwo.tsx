import { ChangeEventHandler, FormEventHandler } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import TitleTwo from "./TitleTwo";
import InputText from "./InputText";

export default function BDDCreationStepTwo(props: {
    onSubmit: FormEventHandler<HTMLFormElement>,
    databaseName: string,
    titleValue: string,
    caloriesValue: number,
    proteinsValue: number,
    fatsValue: number,
    agsValue: number,
    agmiValue: number,
    agpiValue: number,
    cholesterolValue: number,
    carbohydratesValue: number,
    sugarsValue: number,
    fibersValue: number,
    alcoholValue: number,
    sodiumValue: number,
    potassiumValue: number,
    phosphorusValue: number,
    ironValue: number,
    calciumValue: number,
    vitamin_dValue: number,
    onchange: ChangeEventHandler<HTMLInputElement>,
}) {
    return (
        <div>

            <form onSubmit={props.onSubmit}>
                <TitleTwo text={`2. J'ajoute chaque aliment et ses valeurs nutritionnelles à "${props.databaseName}"`} />
                <p className="pb-5 italic">
                    Veuillez entrer le nom de votre aliment, ainsi que ses valeurs nutritionnelles pour 100g. Si certaines valeurs sont absentes, vous pouvez laisser le chiffre &quot;0&quot;.
                </p>
                <InputText
                    title="Nom de l'aliment :"
                    name="title"
                    type="text"
                    value={props.titleValue}
                    onChange={props.onchange}
                />

                <div className="pl-3 mt-5 ml-2 border-l-10 border-(--orangeLightColor) rounded-lg ">
                    <Input
                        title="Calories (kcal) :"
                        name="calories_kcal"
                        step={0.1}
                        value={props.caloriesValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Protéines (g) :"
                        name="proteins"
                        step={0.1}
                        value={props.proteinsValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Lipides (g) :"
                        name="fats"
                        step={0.1}
                        value={props.fatsValue}
                        onChange={props.onchange}
                    />
                    <div className="pl-3 my-1 ml-2 border-l-10 border-(--yellowLightColor) rounded-lg ">
                        <Input
                            title="dont AGS (g) :"
                            name="ags"
                            step={0.1}
                            value={props.agsValue}
                            onChange={props.onchange}
                        />
                        <Input
                            title="dont AGMI (g) :"
                            name="agmi"
                            step={0.1}
                            value={props.agmiValue}
                            onChange={props.onchange}
                        />
                        <Input
                            title="dont AGPI (g) :"
                            name="agpi"
                            step={0.1}
                            value={props.agpiValue}
                            onChange={props.onchange}
                        />
                        <Input
                            title="dont cholestérol (g) :"
                            name="cholesterol"
                            step={0.1}
                            value={props.cholesterolValue}
                            onChange={props.onchange}
                        />
                    </div>
                    <Input
                        title="Glucides (g) :"
                        name="carbohydrates"
                        step={0.1}
                        value={props.carbohydratesValue}
                        onChange={props.onchange}
                    />
                    <div className="pl-3 my-1 ml-2 border-l-10 border-(--yellowLightColor) rounded-lg ">
                        <Input
                            title="dont sucres (g) :"
                            name="sugars"
                            step={0.1}
                            value={props.sugarsValue}
                            onChange={props.onchange}
                        />
                    </div>
                    <Input
                        title="Fibres (g) :"
                        name="fibers"
                        step={0.1}
                        value={props.fibersValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Alcool (g) :"
                        name="alcohol"
                        step={0.1}
                        value={props.alcoholValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Sodium (mg) :"
                        name="sodium"
                        step={0.1}
                        value={props.sodiumValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Potassium (mg) :"
                        name="potassium"
                        step={0.1}
                        value={props.potassiumValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Phosphore (mg) :"
                        name="phosphorus"
                        step={0.1}
                        value={props.phosphorusValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Fer (mg) :"
                        name="iron"
                        step={0.1}
                        value={props.ironValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Calcium (mg) :"
                        name="calcium"
                        step={0.1}
                        value={props.calciumValue}
                        onChange={props.onchange}
                    />
                    <Input
                        title="Vitamine D (µg) :"
                        name="vitamin_d"
                        step={0.1}
                        value={props.vitamin_dValue}
                        onChange={props.onchange}
                    />
                </div>
                <div className="flex flex-row justify-center pt-5">
                    <ButtonGreen text="Valider l'aliment" />
                </div>
            </form>

        </div>
    )
}