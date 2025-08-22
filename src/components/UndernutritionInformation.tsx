export default function UndernutritionInformation() {
    return (
        <div
            className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--grayLightColor) border border-gray-300 rounded-xl shadow-xl"
        >

            <div className="flex flex-col gap-4 mb-5">
                <h2 className="text-xl font-bold">
                    👩‍🏫 Comment diagnostiquer la dénutrition ?
                </h2>
                <p>
                    Selon la Haute Autorité de Santé (novembre 2021), le diagnostic de la dénutrition est posé en cas de présence d'au moins 1 critère phénotypique et 1 critère étiologique. Les critères diffèrent en fonction de la tranche d'âge dans laquelle se situe le patient (enfant, adulte ou personne de 70 ans et plus).
                </p>
                <p>
                    <span className="">Source : </span>
                    <a href="https://www.has-sante.fr/upload/docs/application/pdf/2021-11/reco368_fiche_outil_denutrition_pa_cd_20211110_v1.pdf" className="link italic text-(--grayColor)">HAS - Diagnostic de la dénutrition chez l’enfant, l’adulte, et la personne de 70 ans et plus</a>
                </p>
            </div>

        </div>
    )
}