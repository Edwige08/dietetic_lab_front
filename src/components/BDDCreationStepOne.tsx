import { ChangeEventHandler, FormEventHandler } from "react";
import ButtonGreen from "./ButtonGreen";
import InputText from "./InputText";
import TitleTwo from "./TitleTwo";

export default function BDDCreationStepOne(props: { onSubmit: FormEventHandler<HTMLFormElement>, value: string, onChange: ChangeEventHandler<HTMLInputElement> }) {
    return (
        <form onSubmit={props.onSubmit}>
            <TitleTwo text="1. Je nomme ma base de données" />
            <p className="pb-5 italic">
                Veuillez entrer ci-dessous le nom que vous allez donner à votre base de données nutritionnelles, puis cliquez sur le bouton "Valider".
            </p>
            <InputText
                title="Nom :"
                name="bddName"
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
            <div className="flex flex-row justify-center pt-5">
                <ButtonGreen text="Valider le nom" />
            </div>
        </form>
    )
}