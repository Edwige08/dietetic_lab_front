'use client'

import Title from "@/components/Title";
import TitleTwo from "@/components/TitleTwo";
import { BookOpenText, MessageCircleQuestionMark } from "lucide-react";
import { useState } from "react";

export default function Informations() {
    const [isFAQ, setIsFAQ] = useState<boolean>(true)

    const handleClick = () => {
        setIsFAQ(!isFAQ);
    }
        ; return (
            <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-10 justify-center text-lg m-5">

                    <button
                        onClick={handleClick}
                        className={`flex flex-col justify-center items-center gap-1 border px-4 py-1 rounded-lg w-40 ${isFAQ ? "bg-(--orangeColor) font-bold" : "text-(--grayColor)"}`}
                        disabled={isFAQ}
                    >
                        <MessageCircleQuestionMark />
                        <p>
                            FAQ
                        </p>
                    </button>
                    <button
                        onClick={handleClick}
                        className={`flex flex-col justify-center items-center gap-1 border px-4 py-1 rounded-lg w-40 ${!isFAQ ? "bg-(--orangeColor) font-bold" : "text-(--grayColor)"}`}
                        disabled={!isFAQ}
                    >
                        <BookOpenText />
                        <p>
                            A propos
                        </p>
                    </button>
                </div>

                {isFAQ ?
                    <div className="flex flex-col items-center">
                        <Title
                            text="Foire aux Questions"
                        />
                        <div className="flex flex-col p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl text-justify">
                            <TitleTwo text="Qu'est-ce que Dietetic Lab&nbsp;?" />
                            <p>
                                Dietetic Lab est un outil en ligne spécialement conçu pour les professionnels de la nutrition et de la diététique qui propose une suite de calculateurs et d&apos;outils d&apos;évaluation nutritionnelle pour faciliter le travail.
                            </p>
                            <TitleTwo text="À qui s'adresse cet outil&nbsp;?" />
                            <p>
                                Dietetic Lab s&apos;adresse principalement aux diététicien·ne·s, nutritionnistes et étudiants en nutrition.
                            </p>
                            <TitleTwo text="Je veux améliorer ma santé, suis-je au bon endroit&nbsp;?" />
                            <p>
                                Cet outil ne vous permettra pas d&apos;améliorer votre santé ou de suivre votre alimentation. Il est principalement à destination des professionnels de la nutrition afin de les aider dans leurs tâches quotidiennes.
                            </p>
                            <TitleTwo text="Dietetic Lab est-il gratuit&nbsp;?" />
                            <p>
                                Oui, Dietetic Lab est un ensemble d&apos;outils gratuits.
                            </p>
                            <TitleTwo text="Comment être sûr·e que les calculs sont bons&nbsp;?" />
                            <p>
                                Dans chaque outil, Dietetic Lab indique les formules et sources utilisées pour les calculs présentés. Mais si vous décelez une erreur, n&apos;hésitez pas à nous en faire part pour la corriger au plus vite&nbsp;!
                            </p>
                            <TitleTwo text="J&apos;ai une question ou une remarque, comment vous la transmettre&nbsp;?" />
                            <p>
                                Après avoir créé un compte, dans la page &quot;Profile&quot;, vous avez la possibilité de laisser un message à la développeuse.
                            </p>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center">
                        <Title
                            text="À propos de Dietetic Lab"
                        />
                        <div className="flex flex-col p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl text-justify">

                            <TitleTwo
                                text="🔬 La mission de Dietetic Lab"
                            />
                            <p>
                                Dietetic Lab est une application web innovante conçue spécifiquement pour accompagner les diététicien·ne·s et nutritionnistes dans leur pratique quotidienne. L&apos;objectif est de simplifier et d&apos;optimiser les calculs nutritionnels complexes grâce à des outils numériques précis et intuitifs.
                            </p>
                            <br />

                            <TitleTwo
                                text="🎯 Pourquoi Dietetic Lab ?"
                            />
                            <p>
                                Dans un contexte où la nutrition joue un rôle central dans la prévention et le traitement de nombreuses pathologies, les professionnels de la diététique ont besoin d&apos;outils fiables et efficaces pour :
                            </p>
                            <ul className="list-disc ml-7">
                                <li><span className="font-bold">Gagner du temps</span> sur les calculs répétitifs</li>
                                <li><span className="font-bold">Réduire les erreurs</span> de calcul manuel</li>
                                <li><span className="font-bold">Optimiser</span> le suivi nutritionnel des patients</li>
                            </ul>
                            <br />

                            <TitleTwo
                                text="🛠️ Les outils disponibles"
                            />
                            <h3 className="my-2 font-bold">Indice de Masse Corporelle (IMC)</h3>
                            <ul className="list-disc ml-7">
                                <li>Calcul rapide pour l&apos;adulte</li>
                                <li>Correspond aux critères de l&apos;OMS</li>
                            </ul>

                            <h3 className="my-2 font-bold">Besoins Nutritionnels Quotidiens</h3>
                            <ul className="list-disc ml-7">
                                <li>Formules validées (Harris et Benedict, Black et al.)</li>
                                <li>Personnalisation en fonction des données patient</li>
                            </ul>

                            <h3 className="my-2 font-bold">Évaluation de la dénutrition</h3>
                            <ul className="list-disc ml-7">
                                <li>Critères de dépistage de la Haute Autorité de Santé (HAS)</li>
                                <li>Evaluation de la dénutrition de l&apos;adulte et de la personne âgée</li>
                            </ul>

                            <h3 className="my-2 font-bold">Évaluation du risque de SRI</h3>
                            <ul className="list-disc ml-7">
                                <li>Critères de dépistage de la SFNCM</li>
                            </ul>

                            <br />

                            <TitleTwo
                                text="📊 Base de données nutritionnelle"
                            />
                            <p>
                                Dietetic Lab s&apos;appuie sur les données de la table Ciqual, la base de données nutritionnelles de référence de l&apos;Anses (Agence nationale de sécurité sanitaire de l&apos;alimentation, de l&apos;environnement et du travail), garantissant&nbsp;:
                            </p>
                            <ul className="list-disc ml-7">
                                <li>Plus de 3 000 aliments référencés</li>
                                <li>Données nutritionnelles validées scientifiquement</li>
                                <li>Référence officielle pour les professionnels de santé en France</li>
                                <li>Fiabilité et précision des compositions nutritionnelles</li>
                            </ul>
                            <br />

                            <TitleTwo
                                text="👥 À qui s&apos;adresse Dietetic Lab ?"
                            />
                            <p>
                                Dietetic Lab s&apos;adresse aux diététicien·ne·s et à l&apos;ensemble des professionnels de la nutrition afin de faciliter les calculs du quotidien.
                            </p>
                            <br />
                            <hr />

                            <p className="pt-5 italic">
                                Dietetic Lab - L&apos;innovation au service de la nutrition professionnelle.
                                <br />
                                Développé avec passion par une diététicienne en reconversion pour devenir développeuse web.
                            </p>
                        </div>
                    </div>
                }

            </div>
        )
}