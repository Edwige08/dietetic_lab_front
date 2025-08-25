import Title from "@/components/Title";
import TitleTwo from "@/components/TitleTwo";

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <Title
                text="À propos de Dietetic Lab"
            />
            <div className="flex flex-col p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl text-justify">

                <TitleTwo
                    text="🔬 La mission de Dietetic Lab"
                />
                <p>
                    Dietetic Lab est une application web innovante conçue spécifiquement pour accompagner les diététicien.ne.s et nutritionnistes dans leur pratique quotidienne. L'objectif est de simplifier et d'optimiser les calculs nutritionnels complexes grâce à des outils numériques précis et intuitifs.
                </p>
                <br />

                <TitleTwo
                    text="🎯 Pourquoi Dietetic Lab ?"
                />
                <p>
                    Dans un contexte où la nutrition joue un rôle central dans la prévention et le traitement de nombreuses pathologies, les professionnels de la diététique ont besoin d'outils fiables et efficaces pour :
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
                    <li>Calcul rapide pour l'adulte</li>
                    <li>Correspond aux critères de l'OMS</li>
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
                    <li>Evaluation de la dénutrition de l'adulte et de la personne âgée</li>
                </ul>

                <h3 className="my-2 font-bold">Évaluation du risque de SRI</h3>
                <ul className="list-disc ml-7">
                    <li>Critères de dépistage de la SFNCM</li>
                </ul>

                {/* <h4>Calcul des Ingestas</h4>
            <ul>
                <li>Analyse détaillée des apports alimentaires</li>
                <li>Base de données nutritionnelles Open Food Facts</li>
                <li>Comparaison avec les recommandations</li>
            </ul> */}
                <br />

                <TitleTwo
                    text="📊 Base de données nutritionnelle"
                />
                <p>
                    Dietetic Lab s'appuie sur l'API d'Open Food Facts, la plus grande base de données alimentaires collaborative au monde, garantissant :
                </p>
                <ul>
                    <li>+2 millions d'aliments référencés</li>
                    <li>Données nutritionnelles détaillées et vérifiées</li>
                    <li>Mise à jour continue par la communauté</li>
                    <li>Transparence des informations</li>
                </ul>
                <br />

                <TitleTwo
                    text="👥 À qui s'adresse Dietetic Lab ?"
                />
                <p>
                    Dietetic Lab s'adresse aux diététicien.ne.s et à l'ensemble des professionnels de la nutrition afin de faciliter les calculs du quotidien.
                </p>
                <br />
                <hr />

                <p className="pt-5 italic">
                    Dietetic Lab - L'innovation au service de la nutrition professionnelle.
                    <br />
                    Développé avec passion par une diététicienne en reconversion pour devenir développeuse web.
                </p>
            </div>
        </div>
    )
}