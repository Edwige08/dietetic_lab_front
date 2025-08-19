export default function IMCInformation() {
    return (
        <div className="flex flex-col items-center">
            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--grayLightColor) border border-gray-300 rounded-xl shadow-xl"
            >
                <div className="flex flex-col gap-4 mb-5">
                    <h2 className="text-xl font-bold">
                        👩‍🏫 Comment calcule-t-on l'IMC ?
                    </h2>
                    <p>L'Indice de Masse Corporelle, ou IMC, se calcule grâce au poids (en kg) et à la taille (en m), avec la formule suivante :</p>
                    <div className="flex justify-center">
                        <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                            IMC = Poids (kg) / (Taille (m))²
                        </p>
                    </div>
                    <p>
                        Attention, cette formule n'est valable que pour les adultes entre 18 et 65 ans. Elle n'est pas valable pour les enfants, les personnes âgées, mais aussi les femmes enceintes.
                    </p>
                </div>

                <h2 className="text-xl font-bold">
                    📊 Interprétation de l'IMC :
                </h2>
                <div className="grid grid-cols-2 text-center border">
                    <div className="border p-1 bg-white font-bold">
                        Valeur de l'IMC
                    </div>
                    <div className="border p-1 bg-white font-bold">
                        Interprétation
                    </div>
                    <div className="border p-1 bg-(--yellowLightColor)">
                        IMC &lt; 18.5 kg/m²
                    </div>
                    <div className="border p-1 bg-(--yellowLightColor)">
                        Maigreur
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        18.5 ≤ IMC &lt; 25 kg/m²
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Equilibre staturo-pondéral
                    </div>
                    <div className="border p-1 bg-(--orangeLightColor)">
                        25 ≤ IMC &lt; 30 kg/m²
                    </div>
                    <div className="border p-1 bg-(--orangeLightColor)">
                        Surpoids
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        30 ≤ IMC &lt; 35 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade I
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        35 ≤ IMC &lt; 40 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade II
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        40 ≤ IMC &lt; 45 kg/m²
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade III
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        45 kg/m² ≤ IMC
                    </div>
                    <div className="border p-1 bg-(--redLightColor)">
                        Obésité de grade IV
                    </div>
                </div>
            </div>
        </div>
    )
}