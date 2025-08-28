import TitleTwo from "./TitleTwo";

export default function IMCInformation() {
    return (
        <div
            className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--grayLightColor) border border-gray-300 rounded-xl shadow-xl"
        >
            <div className="flex flex-col gap-4 mb-5">
                <TitleTwo
                text="👩‍🏫 Comment calcule-t-on l&apos;IMC&nbsp;?"
                />
                <p>L&apos;Indice de Masse Corporelle, ou IMC, se calcule grâce au poids (en kg) et à la taille (en m), avec la formule suivante :</p>
                <div className="flex justify-center">
                    <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                        IMC = Poids (kg) / (Taille (m))²
                    </p>
                </div>
                <p>
                    Attention, cette formule n&apos;est valable que pour les adultes entre 18 et 65 ans. Elle n&apos;est pas valable pour les enfants, les personnes âgées, mais aussi les femmes enceintes.
                </p>
            </div>

            <div className="flex flex-col gap-4 mb-5">
                <TitleTwo
                text="📊 Interprétation de l&apos;IMC&nbsp;:"
                />
                <div className="grid grid-cols-2 text-center border">
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-white font-bold">
                        Valeur de l&apos;IMC
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-white font-bold">
                        Interprétation
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--yellowLightColor)">
                        IMC &lt; 18.5 kg/m²
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--yellowLightColor)">
                        Maigreur
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--greenLightColor)">
                        18.5 ≤ IMC &lt; 25 kg/m²
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--greenLightColor)">
                        Equilibre staturo-pondéral
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--orangeLightColor)">
                        25 ≤ IMC &lt; 30 kg/m²
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--orangeLightColor)">
                        Surpoids
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        30 ≤ IMC &lt; 35 kg/m²
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        Obésité de grade I
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        35 ≤ IMC &lt; 40 kg/m²
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        Obésité de grade II
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        40 ≤ IMC &lt; 45 kg/m²
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        Obésité de grade III
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        45 kg/m² ≤ IMC
                    </div>
                    <div className="flex flex-col justify-center items-center border p-1 min-h-12 bg-(--redLightColor)">
                        Obésité de grade IV
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
                <div>
                    <span className="">Sources : </span>
                    <ul className="pl-5 list-disc">
                        <li>
                            <a href="https://www.has-sante.fr/jcms/c_964938/fr/surpoids-et-obesite-de-l-adulte-prise-en-charge-medicale-de-premier-recours" className="link italic text-(--grayColor)">
                                HAS - Surpoids et obésité de l&apos;adulte : prise en charge médicale de premier recours
                            </a>
                        </li>
                        <li>
                            <a href="https://www.has-sante.fr/upload/docs/application/pdf/2011-10/annexe_1_table_dindice_de_masse_corporelle.pdf" className="link italic text-(--grayColor)">
                                HAS - Table d&apos;indice de masse corporelle (IMC)
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}