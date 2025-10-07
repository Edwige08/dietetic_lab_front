export interface FoodDetails {
    id: number,
    alim_nom_fr: string,
    energie_reg_ue_kcal: string,
    proteines: string,
    lipides: string,
    glucides: string,
    sucres: string,
    fibres: string,
    ags: string,
    agmi: string,
    agpi: string,
    cholesterol: string,
    alcool: string,
    sodium: string,
    potassium: string,
    phosphore: string,
    fer: string,
    calcium: string,
    vitamine_d: string,
    personal_db: string,
}

export interface FoodBase {
    id: number,
    title: string,
    foods: FoodDetails[],
}