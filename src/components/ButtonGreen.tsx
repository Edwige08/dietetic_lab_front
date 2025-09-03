import { LucideIcon } from "lucide-react";

interface ButtonGreenProps {
    type?: "submit" | "button",
    text: string,
    lucide?: LucideIcon,
    disabled?: boolean,
}

export default function ButtonGreen({
    type, text, disabled, lucide: Icon }: ButtonGreenProps) {
    return (
        <button
            type={type}
            disabled= {disabled}
            className="btn text-lg rounded-xl h-13 bg-(--greenColor) shadow-lg text-white hover:bg-(--greenSecondColor) cursor-pointer "
        >
            <p>{Icon && <Icon />}</p>
            <p>{text}</p>
        </button>
    )
}