import { LogInIcon } from "lucide-react";
import ButtonGreen from "./ButtonGreen";
import Link from "next/link";
import Title from "./Title";

export default function SignInForm() {
    return (
        <div>
            <Title
                text="Connexion"
            />
            <div className="card bg-white w-96 shadow-sm">
                <div className="card-body">
                    <label className="label">Email :</label>
                    <input type="email" className="input bg-white border-(--grayMediumColor)" placeholder="Mon email" />
                    <label className="label">Password :</label>
                    <input type="password" className="input bg-white border-(--grayMediumColor)" placeholder="Mon mot de passe" />
                    <div className="flex flex-col card-actions items-center mt-5">
                        <ButtonGreen
                            text="Me connecter"
                            type="submit"
                            lucide={LogInIcon}
                        />
                        <Link
                            href="/signup"
                            className="underline text-center"
                        >
                            Créer un compte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}