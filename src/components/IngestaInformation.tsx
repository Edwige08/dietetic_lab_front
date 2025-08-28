import TitleTwo from "./TitleTwo";

export default function IngestaInformation() {
    return (
        <div
            className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--grayLightColor) border border-gray-300 rounded-xl shadow-xl"
        >
            <div className="flex flex-col gap-4 mb-5">
                <TitleTwo
                    text="👩‍🏫 Comment sont calculés les ingesta&nbsp;?"
                />
                <p>
                    Le calcul des ingesta se fait avec les données de la <span className="font-bold">table de composition nutritionnelle des aliments du Ciqual</span>. Elle renseigne sur la composition nutritionnelle moyenne des aliments les plus consommés en France.
                </p>
            </div>

            <div className="flex flex-col gap-4 mb-5">
                    <TitleTwo
                        text="👩‍🏫 Comment utiliser cet outil&nbsp;?"
                    />
                    <p>
                        Afin d'ajouter un aliment au calcul, il faut le sélectionner via les propositions issues des données du Ciqual, lui associer une quantité (par défaut, en grammes), puis valider avec le bouton "Ajouter".
                    </p>
                    <p>
                        Chaque aliment validé est ajouté automatiquement à la liste des aliments pour le calcul. Il est possible de supprimer un aliment en cliquant sur le bouton en forme de poubelle sur la droite.
                    </p>
                    <p>
                        Et enfin, à chaque ajout ou suppression d'aliment, la section "Résultats" est actualisée avec les principaux nutriments.
                    </p>
            </div>

            <div>
                <p>
                    <span className="">Source : </span>
                    <a href="https://ciqual.anses.fr/" className="link italic text-(--grayColor)">
                        "Anses. 2020. Table de composition nutritionnelle des aliments Ciqual."
                    </a>
                </p>
            </div>

        </div>
    )
}