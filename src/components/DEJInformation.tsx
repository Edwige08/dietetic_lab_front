export default function DEJInformation() {
    return (
        <div
            className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-(--grayLightColor) border border-gray-300 rounded-xl shadow-xl"
        >
            <div className="flex flex-col gap-4 mb-5">
                <h2 className="text-xl font-bold">
                    👩‍🏫 Comment calcule-t-on la DEJ ?
                </h2>
                <p>Tout d&apos;abord, il faut calculer le <span className="underline font-bold">Métabolisme de Base</span> (MB).</p>
                <p>
                    La première méthode est l&apos;utilisation de la <span className="font-bold">formule de Harris et Benedict</span>, qui est la suivante :
                </p>
                <p className="underline">
                    Pour la femme :
                </p>
                <div className="flex justify-center">
                    <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                        MB = 9,740&nbsp;x&nbsp;Poids +&nbsp;184,96&nbsp;x&nbsp;Taille –&nbsp;4,6756&nbsp;x&nbsp;Age +&nbsp;655,0955
                    </p>
                </div>
                <p className="underline">
                    Pour l&apos;homme :
                </p>
                <div className="flex justify-center">
                    <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                        MB = 13,7516&nbsp;x&nbsp;Poids +&nbsp;500,33&nbsp;x&nbsp;Taille –&nbsp;6,7550&nbsp;x&nbsp;Age +&nbsp;66,479
                    </p>
                </div>
                <p>
                    La seconde méthode est l&apos;utilisation de la <span className="font-bold">formule de Black et al.</span>, qui est la suivante :
                </p>
                <p className="underline">
                    Pour la femme :
                </p>
                <div className="flex justify-center">
                    <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                        MB = 0,963&nbsp;x&nbsp;Poids<sup>0,48</sup> x&nbsp;Taille<sup>0,50</sup> x&nbsp;Age<sup>-0,13</sup> x&nbsp;239
                    </p>
                </div>
                <p className="underline">
                    Pour l&apos;homme :
                </p>
                <div className="flex justify-center">
                    <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                        MB = 1,083&nbsp;x&nbsp;Poids<sup>0,48</sup> x&nbsp;Taille<sup>0,50</sup> x&nbsp;Age<sup>-0,13</sup> x&nbsp;239
                    </p>
                </div>
                <p className="italic">
                    * Pour chacune des formules : Poids en kg, Taille en m, Age en années et le MB en kcal
                </p>
                <p>Ensuite, pour obtenir la Dépense Energétique Journalière, on multiplie le Métabolisme de Base avec le Niveau d&apos;Activité Physique :</p>
                <div className="flex justify-center">
                    <p className="py-2 px-6 w-fit text-center font-bold text-lg border bg-white">
                        DEJ = MB x NAP
                    </p>
                </div>

                <p>
                    Exemples de profils en fonction du NAP :
                </p>
                <div className="grid grid-cols-2 text-center border">
                    <div className="border p-1 bg-white font-bold">
                        Profil
                    </div>
                    <div className="border p-1 bg-white font-bold">
                        NAP
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Très actif
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        &gt; 2,40
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Vigoureusement actif
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        2,00 - 2,40
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Modérément actif
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        1,70 - 1,99
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Sédentaire
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        1,40 - 1,69
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        Extrêmement inactif
                    </div>
                    <div className="border p-1 bg-(--greenLightColor)">
                        &lt; 1,40
                    </div>
                </div>
            </div>

        </div>
    )
}