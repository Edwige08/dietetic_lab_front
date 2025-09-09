'use client';

import ButtonGreen from "@/components/ButtonGreen";
import InputCheckboxWithTitle from "@/components/InputCheckboxWithTitle";
import InputText from "@/components/InputText";
import Title from "@/components/Title";
import { useUser } from "@/contexts/UserContext";
import { DataSignUp } from "@/types/SignInSignUp";
import { LogInIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const { isAuthenticated } = useUser();

    const [formData, setFormData] = useState<DataSignUp>({ firstname: "", lastname: "", gender: "", mail: "", password: "", is_dietetician: false });

    // Faire un GET et mettre les informations user dans le formData

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: (name === 'is_dietetician' ? !formData.is_dietetician : value)
        }))
    }

    async function handleSubmit() {
        // Faire le PATCH
    }

    return (
        <div className="flex flex-col items-center">
            <Title text="Vos informations personnelles" />
            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <form className="card-body" onSubmit={handleSubmit}>
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
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    <InputText
                        title="Prénom :"
                        name="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    <InputText
                        title="Adresse mail :"
                        name="email"
                        type="email"
                        value={formData.mail}
                        onChange={handleChange}
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
                            text={"Modifier mes infos"}
                            type="submit"
                            lucide={LogInIcon}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}