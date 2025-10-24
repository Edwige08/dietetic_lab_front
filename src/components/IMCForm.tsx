'use client'

import { useEffect, useState } from "react";
import ButtonGreen from "./ButtonGreen";
import Input from "./Input";
import { Calculator } from 'lucide-react';
import Title from "./Title";
import TitleTwo from "./TitleTwo";
import { CalculateIMC } from "@/utils/CalculateIMC";
import { IMCParameters, IMCResults } from "@/types/IMC";
import { IMCCategory } from "@/utils/IMCCategory";
import { IMCCategoryColor } from "@/utils/ResultsColors";
import { useData } from "@/contexts/DataContext";
import { useAnalytics } from '@/utils/usePosthog';
import { useUser } from "@/contexts/UserContext";

export default function IMCForm() {
    const { data, resetData, updateData } = useData();
    const { trackEvent } = useAnalytics();
    const { isAuthenticated } = useUser();

    const [weightHeight, setWeightHeight] = useState<IMCParameters>({ weight: data.weight, height: data.height });
    const [IMCresults, setIMCResults] = useState<IMCResults>({ weight: 0, height: 0, imc: 0 });
    const [calculDone, setCalculDone] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");


    const saveIMCHistory = async (weight: number, height: number, imc: number) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Pas de token trouvé');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/v1/imc-histories/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    weight: Number(weight),
                    height: Number(height),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur lors de la sauvegarde des données :', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données :', {
                error: error instanceof Error ? error.message : error
            });
        }
    };

    useEffect(() => {
        setWeightHeight({
            weight: data.weight,
            height: data.height,
        })
    }, [data.weight, data.height])

    useEffect(() => {
        trackEvent('imc_form_viewed', {
            has_previous_data: !!(data.weight || data.height)
        })
    }, [trackEvent])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("")

        if (weightHeight.weight > 0 && weightHeight.height > 0) {
            setCalculDone(true);
            const imc = CalculateIMC(weightHeight.weight, weightHeight.height);
            setIMCResults({ weight: weightHeight.weight, height: weightHeight.height, imc: imc });
            setMessage("");
            updateData({
                weight: weightHeight.weight,
                height: weightHeight.height,
            });

            trackEvent('imc_calculated', {
                weight: weightHeight.weight,
                height: weightHeight.height,
                imc: parseFloat(imc.toFixed(2)),
                is_reusing_data: weightHeight.weight === data.weight && weightHeight.height === data.height
            });

            // Sauvegarde asynchrone si l'utilisateur est connecté
            if (isAuthenticated) {
                saveIMCHistory(weightHeight.weight, weightHeight.height, imc)
                    .then(() => {
                        trackEvent('imc_saved', {
                            success: true
                        });
                    })
                    .catch(() => {
                        trackEvent('imc_saved', {
                            success: false
                        });
                    });
            }

        } else if (weightHeight.weight > 0 && weightHeight.height == 0) {
            setMessage("Vous avez oublié d'entrer une taille");
            trackEvent('imc_calculation_error', {
                error_type: 'missing_height',
            })
        } else if (weightHeight.weight == 0 && weightHeight.height > 0) {
            setMessage("Vous avez oublié d'entrer un poids")
            trackEvent('imc_calculation_error', {
                error_type: 'missing_weight',
            })
        } else {
            setMessage("Vous devez rentrer un poids et une taille")
            trackEvent('imc_calculation_error', {
                error_type: 'missing_both',
            })
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setWeightHeight(prev => ({ ...prev, [name]: value }))
        setMessage("")
    }

    const resetForm = () => {
        setWeightHeight({ weight: 0, height: 0 });
        setCalculDone(false);
        setMessage("");
        resetData();

        trackEvent('imc_form_reset', {
            had_results: calculDone,
            had_data: !!(data.weight || data.height)
        })
    }

    return (
        <>
            <div>
                <Title text="Calcul de l&apos;IMC" />
            </div>

            <form
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
                onSubmit={handleSubmit}
            >

                <Input
                    title="Poids (kg) : "
                    name="weight"
                    step={0.1}
                    value={weightHeight.weight}
                    onChange={handleChange}
                />
                <Input
                    title="Taille (cm) : "
                    name="height"
                    onChange={handleChange}
                    value={weightHeight.height}
                />

                {message &&
                    <div role="alert" className="alert border border-(--redColor) text-(--redColor) p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{message}</span>
                    </div>
                }

                <ButtonGreen
                    text="Calculer"
                    type="submit"
                    lucide={Calculator}
                />
                <button
                    type="reset"
                    onClick={resetForm}
                    className="underline"
                >
                    Réinitialiser
                </button>
            </form>

            {calculDone &&
                <div
                    className={`flex flex-col gap-4 px-4 pb-4 m-3 w-[90%] md:w-[75%] ${IMCCategoryColor(IMCresults.imc)} border border-black rounded-xl shadow-xl`}
                >
                    <TitleTwo text="🎯 Résultats&nbsp;:" />
                    <p>
                        Pour un poids de <span className="font-bold">{IMCresults.weight} kg</span> et une taille de <span className="font-bold">{(IMCresults.height / 100).toFixed(2)} m</span>, on obtient un IMC de <span className="font-bold">{IMCresults.imc.toFixed(2)} kg/m²</span>, ce qui correspond à <span className="font-bold">{IMCCategory(IMCresults.imc)}</span>.
                    </p>
                </div>
            }
        </>
    )
}