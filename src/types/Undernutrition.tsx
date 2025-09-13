export interface UndernutParameters {
    weight: number,
    height: number,
    previousWeight: number,
    previousWeightDate: "none" | "one-month" | "six-month" | "before-disease",
    albuminemia: number,
    sarcopenia: boolean,
    etiologicalFoodIntake: boolean,
    etiologicalAbsorption: boolean,
    etiologicalAgression: boolean,
}

export interface UndernutResults {
    weight: number,
    height: number,
    imc: number,
    previousWeight: number,
    previousWeightDate: "none" | "one-month" | "six-month" | "before-disease",
    weightLoss: number,
    albuminemia: number,
    sarcopenia: boolean,
    etiologicalFoodIntake: boolean,
    etiologicalAbsorption: boolean,
    etiologicalAgression: boolean,
}
