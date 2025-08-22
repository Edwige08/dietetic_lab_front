export default function SRIInformation() {
    return (
        <div
            className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--grayLightColor) border border-gray-300 rounded-xl shadow-xl"
        >
            <div className="flex flex-col gap-4 mb-5">
                <h2 className="text-xl font-bold">
                    👩‍🏫 Comment évaluer le risque de syndrome de renutrition inappropriée (SRI)&nbsp;?
                </h2>
                <p>
                    Afin de diagnostiquer le risque de SRI, il suffit de repérer soit au minimum 1 critère majeur, soit au minimum 2 critères mineurs.
                </p>
                <div>
                    <p className="underline">Critères de risque majeurs&nbsp;: </p>
                    <ul className="pl-5 list-disc">
                        <li>IMC &lt; à 16&nbsp;kg/m²</li>
                        <li>Perte de poids &gt; 15&nbsp;% en 3 à 6 mois</li>
                        <li>Ingesta faibles ou nuls depuis plus de 10&nbsp;jours</li>
                        <li>Des taux sanguins de potassium, phosphore et magnésium bas avant la renutrition</li>
                    </ul>
                </div>
                <div>
                    <p className="underline">Critères de risque majeurs&nbsp;: </p>
                    <ul className="pl-5 list-disc">
                        <li>16 &lt; IMC &lt; 18,5&nbsp;kg/m²</li>
                        <li>Perte de poids &gt; 10&nbsp;% en 3 à 6&nbsp;mois</li>
                        <li>Ingesta faibles ou nuls depuis plus de 5&nbsp;jours</li>
                        <li>Antécédents d'éthylisme, traitement par insuline, chimiothérapie, antiacides, diurétiques, chirurgie bariatrique</li>
                    </ul>
                </div>
            </div>

            <div>
                <p>
                    <span className="">Source : </span>
                    <a href="/Institut_Curie_0524___Copieversionsiteinternet.pdf" className="link italic text-(--grayColor)">
                        SFNCM - Syndrome de Renutrition Inappropriée : Repérer / Dépister / Prendre en charge (PDF)
                    </a>
                </p>
            </div>

        </div>
    )
}