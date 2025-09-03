'use client'

import { LogInIcon } from "lucide-react";
import ButtonGreen from "./ButtonGreen";
import Link from "next/link";
import Title from "./Title";
import { useState } from "react";
import { DataSignIn } from "@/types/SignInSignUp";
import InputText from "./InputText";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export default function SignInForm() {
    const [formData, setFormData] = useState<DataSignIn>({ "mail": "", "password": "" });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    const router = useRouter();
    const { login } = useUser();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setIsLoading(true);
        setMessage("");

        const result = await login(formData.mail, formData.password);

        if (result.success) {
            router.push('/personnalProfile')
        } else {
            setMessage(result.error ||'Erreur de connexion')
        }

        setIsLoading(false)
    }

    return (
        <div>
            <Title
                text="Connexion"
            />
            <div className="card bg-white w-96 shadow-sm">
                <form className="card-body" onSubmit={handleSubmit}>
                    {message ?
                        <div className="p-2 text-center border border-(--redColor) bg-(--redLightColor)">{message}</div> : ""
                    }
                    <InputText
                        title="Email :"
                        name="mail"
                        type="text"
                        placeholder="Votre email"
                        value={formData.mail}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <InputText
                        title="Mot de passe :"
                        name="password"
                        type="password"
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <div className="flex flex-col card-actions items-center mt-5">
                        <ButtonGreen
                            text="Me connecter"
                            type="submit"
                            lucide={LogInIcon}
                            disabled={isLoading}
                        />
                        <Link
                            href="/signup"
                            className="underline text-center"
                        >
                            Créer un compte
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}