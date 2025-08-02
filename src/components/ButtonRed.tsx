import { EventHandler } from "react";

export default function ButtonRed(props: { type?: "submit" | "button" | "reset", text: string, onClick?: () => void }) {
    return (
        <button
            type={props.type}
            className="p-2 rounded-lg font-bold bg-(--redColor) shadow-lg hover:bg-(--redSecondColor) cursor-pointer"
            onClick={props.onClick}
            >
            {props.text}
        </button>
    )
}