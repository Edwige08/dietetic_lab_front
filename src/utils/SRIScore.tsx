export function SRIScoreMajorCriterion(imc: number, weightLoss: number, lowIngestaTen: boolean, potassium: number, phosphorus: number, magnesium: number): number {
    let score = 0;

    if (imc > 0 && imc < 16) {
        score += 1;
    }
    if (weightLoss > 15) {
        score += 1;
    }
    if (lowIngestaTen) {
        score += 1;
    }
    if ((potassium > 0 && potassium < 3.5) || (phosphorus > 0 && phosphorus < 0.81) || (magnesium > 0 && magnesium > 0.65)) {
        score += 1;
    }

    return score;
}

export function SRIScoreMinorCriterion(imc: number, weightLoss: number, lowIngestaFive: boolean, atcd: boolean): number {
    let score = 0;

    if (imc > 16 && imc < 18.5) {
        score += 1;
    }
    if (weightLoss > 10) {
        score += 1;
    }
    if (lowIngestaFive) {
        score += 1;
    }
    if ((atcd)) {
        score += 1;
    }

    return score;
}