'use client';

import ButtonGreen from "@/components/ButtonGreen";
import ButtonOrange from "@/components/ButtonOrange";
import ButtonRed from "@/components/ButtonRed";
import InputCheckboxWithTitle from "@/components/InputCheckboxWithTitle";
import InputText from "@/components/InputText";
import Title from "@/components/Title";
import { useUser } from "@/contexts/UserContext";
import { UserInformations, UserInformationsToUpdate } from "@/types/users";
import { getDate } from "@/utils/GetDate";
import { Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const { isAuthenticated, user, logoutToSignInPage } = useUser();

    const [formData, setFormData] = useState<UserInformations>({ id: 0, firstname: "", lastname: "", gender: "", mail: "", is_dietetician: false, created_at: "" });
    const [formDataToUpdate, setFormDataToUpdate] = useState<UserInformationsToUpdate>({ firstname: "", lastname: "", gender: "", mail: "", is_dietetician: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    async function getUserInformations() {
        setIsLoading(true);
        setMessage("");
        if (!isAuthenticated) return;

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/users/${user?.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            const data = await response.json();
            setFormData(data);
            setFormDataToUpdate(data);
            setIsLoading(false);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            console.log(errorMessage);
            setIsLoading(false);
            setMessage(errorMessage);
        }
    }

    useEffect(() => {
        if (isAuthenticated) getUserInformations();
    }, [isAuthenticated === true]);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/users/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formDataToUpdate),
            });

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            setMessage("✅ Vos informations ont été mises à jour avec succès !");
            setIsEditing(false);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(errorMessage);

        } finally {
            await getUserInformations();
            setIsLoading(false);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setFormDataToUpdate(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    };

    async function deleteAccount() {
        setIsLoading(true);
        setMessage("");
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/users/${user?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            // Supprime le token et redirige vers la page d'accueil
            localStorage.removeItem('access_token');
            window.location.href = "/";

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            setMessage(errorMessage);
            setShowDeleteModal(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <Title text="Vos informations personnelles" />
            <div className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl">
                {isLoading ?
                    <div className="py-40 text-center text-xl">Chargement...</div>
                    :
                    <div>
                        {message && message != "✅ Vos informations ont été mises à jour avec succès !" ?
                            <div className="flex flex-col gap-6 items-center min-h-55 text-lg">
                                <p>
                                    {message}
                                </p>
                                <p className="text-center">
                                    Impossibilité de charger les données. <br />
                                    Merci de vous reconnecter en cliquant sur le bouton ci-dessous&nbsp;:
                                </p>
                                <button onClick={logoutToSignInPage} className="border rounded-lg px-4 py-1 bg-(--orangeColor)">
                                    Page de connexion
                                </button>
                            </div>
                            :
                            <div>
                                {isEditing ?
                                    <form>
                                        <InputText
                                            title="Nom :"
                                            name="lastname"
                                            type="text"
                                            value={formDataToUpdate.lastname}
                                            onChange={handleChange}
                                        />
                                        <InputText
                                            title="Prénom :"
                                            name="firstname"
                                            type="text"
                                            value={formDataToUpdate.firstname}
                                            onChange={handleChange}
                                        />
                                        <InputText
                                            title="Email :"
                                            name="mail"
                                            type="email"
                                            value={formDataToUpdate.mail}
                                            onChange={handleChange}
                                        />
                                        <InputCheckboxWithTitle
                                            description=""
                                            name="is_dietetician"
                                            title="Je suis diététicien·ne"
                                            onChange={handleChange}
                                            checked={formDataToUpdate.is_dietetician}
                                        />
                                        <div className="flex flex-col justify-center py-5 m-auto">
                                            <ButtonGreen type="button" text="Enregistrer les modifications" onClick={handleSubmit} disabled={isLoading} />
                                            <button className="underline px-3 m-auto" onClick={() => setIsEditing(false)}>Annuler les modifications</button>
                                        </div>
                                    </form>
                                    :
                                    <div>
                                        <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Nom : </span><span>{formData.lastname}</span></p>
                                        <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Prénom : </span><span>{formData.firstname}</span></p>
                                        <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Email : </span><span>{formData.mail}</span></p>
                                        <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Diététicien·ne : </span><span>{formData.is_dietetician ? "oui" : "non"}</span></p>
                                        <p className="flex flex-row justify-start gap-1 pb-3 px-2"><span className="font-bold">Compte créé le : </span><span>{getDate(formData.created_at)}</span></p>
                                        <div className="flex flex-col justify-center py-5 m-auto">
                                            <ButtonOrange type="button" lucide={Pencil} text="Modifier" onClick={() => setIsEditing(true)} />
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
            <div>
                {!isLoading && !isEditing &&
                    <div className="flex flex-col mt-5 mb-8">
                        <ButtonRed type="button" lucide={X} text="Supprimer mon compte" onClick={() => setShowDeleteModal(true)} />
                    </div>
                }
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowDeleteModal(false)}
                    />
                    <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        {isLoading ? 
                        <div>
                            <p className="mb-6 text-center">
                                Suppression en cours...
                            </p>
                        </div>
                        :
                        <div>
                            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
                            <p className="mb-6">
                                Attention ! En supprimant votre compte, toutes vos données seront <span className="font-bold">définitivement perdues</span>.
                                Cette action est <span className="font-bold">irréversible</span>.
                            </p>
                        </div>
                        }
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border bg-(--greenColor) text-white font-bold rounded-lg hover:bg-gray-100"
                                disabled={isLoading}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={deleteAccount}
                                className="px-4 py-2  bg-(--redColor) text-white font-bold rounded-lg hover:bg-red-700"
                                disabled={isLoading}
                            >
                                Supprimer définitivement 😢
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}