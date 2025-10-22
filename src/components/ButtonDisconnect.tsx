import { useUser } from "@/contexts/UserContext";
import { LucideIcon } from "lucide-react";

interface ButtonDisconnectProps {
    type?: "submit" | "button",
    text: string,
    lucide?: LucideIcon,
    disabled?: boolean,
}

export default function ButtonDisconnect({
    type, text, disabled, lucide: Icon }: ButtonDisconnectProps) {
    const { logout } = useUser();

    return (
        <div className="flex flex-col justify-center py-5 m-auto">
            <button
                type={type}
                disabled={disabled}
                onClick={logout}
                className="btn text-lg rounded-xl h-13 bg-(--redColor) shadow-lg text-white hover:bg-(--redSecondColor) cursor-pointer "
            >
                <p>{Icon && <Icon />}</p>
                <p>{text}</p>
            </button>
        </div>
    )
}