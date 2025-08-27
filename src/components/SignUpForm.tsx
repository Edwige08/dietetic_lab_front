import { LogInIcon } from "lucide-react";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import Link from "next/link";

export default function SignUpForm() {
    return (
        <div>
            <Title
                text="Créer un compte"
            />
            <div className="card bg-white w-96 shadow-sm">
                <div className="card-body">
                    <div className="flex flex-row items-center gap-15">
                        <div className="flex flex-row gap-2">
                            <input type="radio" name="gender" value="f" />
                            <label htmlFor="gender" className="label">Mme</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="radio" name="gender" value="h" />
                            <label htmlFor="gender" className="label">M.</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input type="radio" name="gender" value="other" />
                            <label htmlFor="gender" className="label">Autre</label>
                        </div>
                    </div>

                    <label className="label">Nom :</label>
                    <input type="email" className="input bg-white border-(--grayMediumColor)" placeholder="Votre nom" />

                    <label className="label">Prénom :</label>
                    <input type="email" className="input bg-white border-(--grayMediumColor)" placeholder="Votre prénom" />

                    <label className="label">Email :</label>
                    <input type="email" className="input bg-white border-(--grayMediumColor)" placeholder="Votre email" />

                    <label className="label">Password :</label>
                    <input type="password" className="input bg-white border-(--grayMediumColor)" placeholder="Votre mot de passe" />

                    <p className="label">Etes-vous diététicien.ne ?</p>
                    <div className="flex flex-row items-center gap-2">
                        <input type="checkbox" name="diet" className="checkbox checkbox-warning" />
                        <label htmlFor="">Je suis diététicien.ne</label>
                    </div>

                    <div className="flex flex-col card-actions items-center mt-5">
                        <ButtonGreen
                            text="Créer mon compte"
                            type="submit"
                            lucide={LogInIcon}
                        />
                        <Link
                            href="/signin"
                            className="underline text-center"
                        >
                            J'ai déjà un compte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}