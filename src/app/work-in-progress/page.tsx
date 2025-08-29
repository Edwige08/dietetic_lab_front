import Title from "@/components/Title";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-10">
            <Title 
                text="🚧 Page en construction 🚧"
            />
            <p className="text-center px-4 max-w-md">
                Cette page est encore en cours de développement. <br />
                Vous pouvez revenir plus tard pour la consulter lorsqu'elle sera fraîchement créée.
            </p>
            <Link href="/" className="btn btn-link">Retour à l'accueil</Link>
        </div>
    )
}