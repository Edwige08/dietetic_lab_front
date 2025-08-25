import { ChangeEventHandler } from "react";

export default function Input(props: { title: string, name: string, step?:number, value: string | number, onChange?: ChangeEventHandler<HTMLInputElement>, disabled?: boolean, unity?: string }) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.name}>
                {props.title}
            </label>
            <input
                name={props.name}
                type="number"
                step={props.step}
                min={0}
                className="p-2 border border-gray-300 rounded-lg w-full"
                value={props.value}
                onChange={props.onChange}
                required
                disabled={props.disabled}
                onFocus={(e) => e.target.select()}
            />
            <p>{props.unity}</p>
        </div>
    )
}