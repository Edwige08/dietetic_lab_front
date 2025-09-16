import { LucideIcon } from "lucide-react";

interface ButtonOrangeProps {
    type?: "submit" | "button",
    text: string,
    lucide?: LucideIcon,
    disabled?: boolean,
}

export default function ButtonOrange({
    type, text, disabled, lucide: Icon }: ButtonOrangeProps) {
    return (
        <div className="flex flex-col justify-center py-5 m-auto">
        <button
            type={type}
            disabled= {disabled}
            className="btn text-lg rounded-xl h-13 bg-(--orangeColor) shadow-lg text-black hover:bg-(--orangeColor) cursor-pointer "
        >
            <p>{Icon && <Icon />}</p>
            <p>{text}</p>
        </button>
        </div>
    )
}