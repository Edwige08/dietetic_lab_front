'use client'

import { LogInIcon } from "lucide-react";
import ButtonGreen from "./ButtonGreen";
import Title from "./Title";
import Link from "next/link";
import React, { useState } from "react";
import InputText from "./InputText";
import InputCheckboxWithTitle from "./InputCheckboxWithTitle";
import { DataSignUp } from "@/types/SignInSignUp";

export default function SignUpForm() {
    const [formData, setFormData] = useState<DataSignUp>({ firstname: "", lastname: "", gender: "", mail: "", password: "", is_dietetician: false });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev, 
            [name]: (name === 'is_dietetician' ? !formData.is_dietetician : value)
        }))
    }

    return (
        <div>
            <Title
                text="Créer un compte"
            />
            <div className="card bg-white w-96 shadow-sm">
                <form className="card-body">
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
                        placeholder="ex : Dupont"
                        value={formData.lastname}
                        onChange={handleChange}
                        disabled={false}
                    />
                    <InputText
                        title="Prénom :"
                        name="firstname"
                        placeholder="ex : Martin"
                        value={formData.firstname}
                        onChange={handleChange}
                        disabled={false}
                    />
                    <InputText
                        title="Email :"
                        name="mail"
                        placeholder="ex : martin.dupont@dietetic-lab.com"
                        value={formData.mail}
                        onChange={handleChange}
                        disabled={false}
                    />
                    <InputText
                        title="Mot de passe :"
                        name="password"
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={false}
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
                            text="Créer mon compte"
                            type="submit"
                            lucide={LogInIcon}
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