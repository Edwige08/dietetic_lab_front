import { ChangeEventHandler } from "react";

export default function InputCheckboxWithTitle(props: { description: string, name: string, onChange: ChangeEventHandler<HTMLInputElement>, checked: boolean, title: string }) {
    return (
        <div className="flex flex-col gap-1">
            <p>{props.description}</p>
            <div className="flex flex-row items-center gap-2">

                <input type="checkbox" name={props.name} onChange={props.onChange} checked={props.checked} className="checkbox checkbox-warning" />
                <label htmlFor="{props.name}" className="label">{props.title}</label>
            </div>
        </div>
    )
}