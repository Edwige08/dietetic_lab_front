import { useUser } from "@/contexts/UserContext";

export default function ButtonDisconnect() {
    const { logout } = useUser();

    return (
        <div className="flex flex-col justify-center py-5 m-auto">
            <button
                type="button"
                onClick={logout}
                className="btn text-lg rounded-xl h-13 bg-(--redColor) shadow-lg text-white hover:bg-(--greenSecondColor) cursor-pointer "
            >
                Déconnexion
            </button>
        </div>
    )
}