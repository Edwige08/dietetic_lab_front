import { ChangeEventHandler } from "react";

export default function InputCheckbox(props: { name: string, onChange: ChangeEventHandler<HTMLInputElement>, checked: boolean, title: string }) {
    return (
        <div className="flex flex-row gap-2 items-start">
            <input type="checkbox" name={props.name} onChange={props.onChange} checked={props.checked} className="mt-1"/>
            <label htmlFor="{props.name}">{props.title}</label>
        </div>
    )
}