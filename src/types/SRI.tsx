export interface SRIParameters {
    weight: number,
    height: number,
    previousWeight: number,
    lowIngestaFive: boolean,
    lowIngestaTen: boolean,
    potassium: number,
    phosphorus: number,
    magnesium: number,
    atcd: boolean,
}

export interface SRIResults {
    weight: number,
    height: number,
    imc: number,
    previousWeight: number,
    weightLoss: number,
    lowIngestaFive: boolean,
    lowIngestaTen: boolean,
    potassium: number,
    phosphorus: number,
    magnesium: number,
    atcd: boolean,
}