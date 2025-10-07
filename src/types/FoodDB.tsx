export interface FoodDetails {
    id: number,
    alim_nom_fr: string,
    energie_reg_ue_kcal: string | number,
    proteines: string | number,
    lipides: string | number,
    glucides: string | number,
    sucres: string | number,
    fibres: string | number,
    ags: string | number,
    agmi: string | number,
    agpi: string | number,
    cholesterol: string | number,
    alcool: string | number,
    sodium: string | number,
    potassium: string | number,
    phosphore: string | number,
    fer: string | number,
    calcium: string | number,
    vitamine_d: string | number,
    personal_db: string | number,
}

export interface FoodBase {
    id: number,
    title: string,
    foods: FoodDetails[],
}