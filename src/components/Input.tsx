import { ChangeEventHandler } from "react";

export default function Input(props: { title: string, name: string, placeholder?: string, value: string | number, onChange?: ChangeEventHandler<HTMLInputElement>, disabled?: boolean }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.name} className="">
                {props.title}
            </label>
            <input
                name={props.name}
                type="number"
                placeholder={props.placeholder}
                className="p-2 border border-gray-300 rounded-lg"
                value={props.value}
                onChange={props.onChange}
                required
                disabled={props.disabled}
            />
        </div>
    )
}