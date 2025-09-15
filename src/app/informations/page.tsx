'use client'

import Title from "@/components/Title";
import TitleTwo from "@/components/TitleTwo";
import { BookOpenText, MessageCircleQuestionMark } from "lucide-react";
import { MouseEvent, useState } from "react";

export default function Informations() {
    const [isFAQ, setIsFAQ] = useState<boolean>(true)

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
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
                            <TitleTwo text="Je ne comprends pas ce qui est écrit dans cette FAQ. Pourquoi&nbsp;?" />
                            <p>
                                Ne vous inquiétez pas, c&apos;est normal. Cette page est encore en cours de construction. Le texte que vous lisez est du <span className="italic">lorem ipsum</span>. C&apos;est une suite de mots sans signification que j&apos;utilise pour la mise en page. Il sera bientôt transformé en une vraie FAQ.
                            </p>
                            <br />
                            <TitleTwo text="Ma question n°2 de la FAQ&nbsp;?" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra mauris a dictum scelerisque. Aenean id suscipit nunc. Donec convallis nunc nec ex suscipit vulputate. Ut tempor magna vel imperdiet scelerisque. Nam pulvinar mauris vel accumsan tristique. Quisque vehicula tortor risus, et venenatis nulla condimentum id. Donec vitae est lacus. Nunc pretium purus ac velit maximus gravida.
                            </p>
                            <br />
                            <TitleTwo text="Ma question n°3 de la FAQ&nbsp;?" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra mauris a dictum scelerisque. Aenean id suscipit nunc. Donec convallis nunc nec ex suscipit vulputate. Ut tempor magna vel imperdiet scelerisque. Nam pulvinar mauris vel accumsan tristique. Quisque vehicula tortor risus, et venenatis nulla condimentum id. Donec vitae est lacus. Nunc pretium purus ac velit maximus gravida.
                            </p>
                            <br />
                            <TitleTwo text="Ma question n°4 de la FAQ&nbsp;?" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra mauris a dictum scelerisque. Aenean id suscipit nunc. Donec convallis nunc nec ex suscipit vulputate. Ut tempor magna vel imperdiet scelerisque. Nam pulvinar mauris vel accumsan tristique. Quisque vehicula tortor risus, et venenatis nulla condimentum id. Donec vitae est lacus. Nunc pretium purus ac velit maximus gravida.
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
                                Dietetic Lab est une application web innovante conçue spécifiquement pour accompagner les diététicien.ne.s et nutritionnistes dans leur pratique quotidienne. L&apos;objectif est de simplifier et d&apos;optimiser les calculs nutritionnels complexes grâce à des outils numériques précis et intuitifs.
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
                                <li>Critères de dépistage de la HAS</li>
                                <li>Protocoles de prévention intégrés</li>
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
                                Dietetic Lab s&apos;appuie sur l&apos;API d&apos;Open Food Facts, la plus grande base de données alimentaires collaborative au monde, garantissant :
                            </p>
                            <ul>
                                <li>+2 millions d&apos;aliments référencés</li>
                                <li>Données nutritionnelles détaillées et vérifiées</li>
                                <li>Mise à jour continue par la communauté</li>
                                <li>Transparence des informations</li>
                            </ul>
                            <br />

                            <TitleTwo
                                text="👥 À qui s&apos;adresse Dietetic Lab ?"
                            />
                            <p>
                                Dietetic Lab s&apos;adresse aux diététicien.ne.s et à l&apos;ensemble des professionnels de la nutrition afin de faciliter les calculs du quotidien.
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