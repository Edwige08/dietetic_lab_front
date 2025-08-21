import { LucideIcon } from "lucide-react";

interface ButtonGreenProps {
    type?: "submit" | "button";
    text: string;
    lucide?: LucideIcon;
}

export default function ButtonGreen({
    type, text, lucide: Icon }: ButtonGreenProps) {
    return (
        <button
            type={type}
            className="btn text-lg rounded-lg bg-(--greenColor) shadow-lg hover:bg-(--greenSecondColor) cursor-pointer"
        >
            <p>{Icon && <Icon />}</p>
            <p>{text}</p>
        </button>
    )
}