'use client';

import { useUser } from "@/contexts/UserContext";
import { Comments } from "@/types/Comments";
import { getDate, getHour } from "@/utils/GetDate";
import { ChevronRight } from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";

export default function SeeMessages(props: { onClick: MouseEventHandler<HTMLButtonElement> }) {
    const { isAuthenticated } = useUser();

    const [message, setMessage] = useState<string>();
    const [comments, setComments] = useState<Comments[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function getUserComments() {
        setMessage("");
        console.log("hello");
        setIsLoading(true);


        if (!isAuthenticated) {
            setMessage("Vous devez être connecté pour créer une base de données");
            return;
        }

        try {
            const token = localStorage.getItem('access_token');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/commentaries/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(`❌ Erreur ${response.status} : ${response.statusText}`)
            }

            const data = await response.json();
            console.log("🎁🎁 data : ", data.results);
            setComments(data.results);
            setIsLoading(false);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
            console.log(errorMessage);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated) getUserComments();
    }, [isAuthenticated])

    return (
        <div>
            {isLoading ?
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-25 w-full"></div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
                :
                <div>
                    {comments && comments.length > 0 ?
                        <div className="flex flex-col gap-2">
                            {comments.map((comment) => (
                                <div className="border p-2 rounded-lg" key={comment.id}>
                                    <p className="italic text-(--greenSecondColor) pb-1">
                                        Ecrit le {getDate(comment.created_at)} à {getHour(comment.created_at)} : 
                                    </p>
                                    <p className=" text-(--grayColor)">

                                        {comment.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="py-2 text-center">
                            <p className="pb-10">
                                Pour le moment vous n&apos;avez écrit aucun message. <br />
                                N&apos;hésitez pas à me faire part de vos retours ou suggestions.
                            </p>
                            <div className="flex flex-row justify-center">
                                <button onClick={props.onClick} className="link link-primary flex flex-row gap-2 border px-5 py-2 rounded-lg">
                                    <ChevronRight />
                                    <p>
                                        Ecrire un message
                                    </p>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}