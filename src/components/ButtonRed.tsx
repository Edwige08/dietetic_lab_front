import { LucideIcon } from "lucide-react";

interface ButtonRedProps {
    type?: "submit" | "button",
    text: string,
    lucide?: LucideIcon,
    disabled?: boolean,
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>) | undefined,
}

export default function ButtonRed({
    type, text, disabled, lucide: Icon, onClick }: ButtonRedProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="btn text-lg rounded-xl h-13 bg-(--redColor) shadow-lg text-white hover:bg-(--redSecondColor) cursor-pointer "
        >
            <p>{Icon && <Icon />}</p>
            <p>{text}</p>
        </button>
    )
}