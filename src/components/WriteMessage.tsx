'use client';

import { useState } from "react";
import ButtonGreen from "./ButtonGreen";
import { useUser } from "@/contexts/UserContext";
import { Send } from "lucide-react";

export default function WriteMessage() {
    const { isAuthenticated } = useUser();

    const [comment, setComment] = useState<string>("");
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);

        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour créer une base de données");
            setIsLoading(false);
            return;
        }

        if (comment === "") {
            setMessage("Vous n'avez rien écrit 🤷‍♀️");
            setIsLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ description: comment })
            })
            const data = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(data.detail || data.message || `Erreur ${response.status}`)
            }

            setMessage("✅ Votre message a bien été envoyé");
            setComment("");
            setIsLoading(false);


        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "❌ Une erreur est survenue lors de la création de la base de donneés"

            setMessage(errorMessage);
            setIsLoading(false);
        }
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setComment(value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-2">
                {message &&
                    <div className="flex flex-row justify-center">
                        <p className="border text-center p-2 rounded-lg w-fit bg-(--yellowColor)">{message}</p>
                    </div>
                }
                <p className="py-2 text-center">
                    Vous pouvez écrire ci-dessous votre commentaires, puis l&apos;envoyer en cliquant sur le bouton &ldquo;Envoyer&ldquo;.
                </p>
                <textarea name="comment" placeholder="Votre commentaire" className="border rounded-lg p-2 h-70" value={comment} onChange={handleChange} />

                <div className="flex flex-col items-center py-2">
                    <ButtonGreen disabled={isLoading} text={`${isLoading ? "Envoi..." : "Envoyer"}`} lucide={Send} />
                </div>
            </form>
        </div>
    )
}