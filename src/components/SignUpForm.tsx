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
import { PasswordValidation } from "@/types/PasswordValidation";

export default function SignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<DataSignUp>({ firstname: "", lastname: "", gender: "", mail: "", password: "", is_dietetician: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();
    const [messageOK, setMessageOK] = useState<string>();
    const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
        minLength: false,
        hasUppercase: false,
        hasNum: false,
        hasSpecialChar: false
    });

    const validatePassword = (password: string): PasswordValidation => {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNum = /[0123456789]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            minLength,
            hasUppercase,
            hasNum,
            hasSpecialChar
        };
    };

    const isPasswordValid = passwordValidation.minLength && 
                          passwordValidation.hasUppercase && 
                          passwordValidation.hasNum && 
                          passwordValidation.hasSpecialChar;

    const canSubmit = formData.firstname.trim() !== "" &&
                     formData.lastname.trim() !== "" &&
                     formData.gender !== "" &&
                     formData.mail.trim() !== "" &&
                     isPasswordValid &&
                     !isLoading;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: (name === 'is_dietetician' ? !formData.is_dietetician : value)
        }));

        if (name === 'password') {
            const validation = validatePassword(value);
            setPasswordValidation(validation);
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!isPasswordValid) {
            setMessage("Le mot de passe ne respecte pas tous les critères requis");
            return;
        }

        setIsLoading(true);
        setMessage("");
        setMessageOK("");

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

            setMessageOK(data.message);
            
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
                    {messageOK ?
                        <div className="p-2 text-center border border-(--yellowColor) bg-(--yellowLightColor)">{messageOK}</div> : ""
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
                    
                    {formData.password && (
                        <div className="pb-2 text-sm">
                            <p className="font-medium mb-2">Critères du mot de passe :</p>
                            <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-(--greenSecondColor)' : 'text-(--redColor)'}`}>
                                <span>{passwordValidation.minLength ? '✓' : '✗'}</span>
                                <span>Au moins 8 caractères</span>
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasUppercase ? 'text-(--greenSecondColor)' : 'text-(--redColor)'}`}>
                                <span>{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                                <span>Au moins une majuscule</span>
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasNum ? 'text-(--greenSecondColor)' : 'text-(--redColor)'}`}>
                                <span>{passwordValidation.hasNum ? '✓' : '✗'}</span>
                                <span>Au moins un chiffre</span>
                            </div>
                            <div className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-(--greenSecondColor)' : 'text-(--redColor)'}`}>
                                <span>{passwordValidation.hasSpecialChar ? '✓' : '✗'}</span>
                                <span>Au moins un caractère spécial (!@#$%^&*...)</span>
                            </div>
                        </div>
                    )}
                    
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
                            disabled={!canSubmit}
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