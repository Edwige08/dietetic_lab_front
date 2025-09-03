'use client'

import { LogInIcon } from "lucide-react";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import Link from "next/link";
import React, { useState } from "react";
import InputText from "./InputText";
import InputCheckboxWithTitle from "./InputCheckboxWithTitle";
import { DataSignUp } from "@/types/SignInSignUp";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<DataSignUp>({ firstname: "", lastname: "", gender: "", mail: "", password: "", is_dietetician: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: (name === 'is_dietetician' ? !formData.is_dietetician : value)
        }))
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la création du compte')
            }

            setMessage(data.message);
            console.log(message);
            
            setTimeout(() => {
                router.push('/signin')
            }, 2000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(errorMessage);

        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000)
        }
    }

    return (
        <div>
            <Title
                text="Créer un compte"
            />
            <div className="card bg-white w-96 shadow-sm">
                <form className="card-body" onSubmit={handleSubmit}>
                    {message ?
                        <div className="p-2 text-center border border-(--redColor) bg-(--redLightColor)">{message}</div> : ""
                    }
                    <div className="flex flex-row items-center gap-15">
                        <div className="flex flex-row gap-2">
                            <input onChange={handleChange} type="radio" name="gender" value="f" className="radio radio-warning" />
                            <label htmlFor="gender" className="flex flex-col justify-center">Mme</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input onChange={handleChange} type="radio" name="gender" value="h" className="radio radio-warning" />
                            <label htmlFor="gender" className="flex flex-col justify-center">M.</label>
                        </div>
                        <div className="flex flex-row gap-2">
                            <input onChange={handleChange} type="radio" name="gender" value="other" className="radio radio-warning" />
                            <label htmlFor="gender" className="flex flex-col justify-center">Autre</label>
                        </div>
                    </div>

                    <InputText
                        title="Nom :"
                        name="lastname"
                        type="text"
                        placeholder="ex : Dupont"
                        value={formData.lastname}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <InputText
                        title="Prénom :"
                        name="firstname"
                        type="text"
                        placeholder="ex : Martin"
                        value={formData.firstname}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <InputText
                        title="Email :"
                        name="mail"
                        type="text"
                        placeholder="ex : martin.dupont@dietetic-lab.com"
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
                    <InputCheckboxWithTitle
                        description="Etes-vous diététicien.ne ?"
                        name="is_dietetician"
                        title="Je suis diététicien.ne"
                        onChange={handleChange}
                        checked={formData.is_dietetician}
                    />

                    <div className="flex flex-col card-actions items-center mt-5">
                        <ButtonGreen
                            text={isLoading ? "Création..." : "Créer mon compte"}
                            type="submit"
                            lucide={LogInIcon}
                            disabled={isLoading}
                        />
                        <Link
                            href="/signin"
                            className="underline text-center"
                        >
                            J&apos;ai déjà un compte
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}