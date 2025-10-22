import { LucideIcon } from "lucide-react";

interface ButtonOrangeProps {
    type?: "submit" | "button",
    text: string,
    lucide?: LucideIcon,
    disabled?: boolean,
    onClick?: () => void,
}

export default function ButtonOrange({
    type, text, disabled, lucide: Icon, onClick }: ButtonOrangeProps) {
    return (
        <div className="flex flex-col justify-center py-5 m-auto">
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                className="btn text-lg rounded-xl h-13 bg-(--orangeColor) shadow-lg text-black hover:bg-(--orangeSecondColor) cursor-pointer "
            >
                <p>{Icon && <Icon />}</p>
                <p>{text}</p>
            </button>
        </div>
    )
}