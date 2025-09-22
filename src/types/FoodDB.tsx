export interface FoodDetails {
    id: number,
    title: string,
    calories_kcal: number,
    proteins: number,
    fats: number,
    carbohydrates: number,
    sugars: number,
    fibers: number,
    ags: number,
    agmi: number,
    agpi: number,
    cholesterol: number,
    alcohol: number,
    sodium: number,
    potassium: number,
    phosphorus: number,
    iron: number,
    calcium: number,
    vitamin_d: number,
    personal_db: number,
}

export interface PersonnalDB {
    id: number,
    title: string,
    foods: FoodDetails[],
}