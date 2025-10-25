import { CalculateIMC } from "./CalculateIMC";
import { WeightLoss } from "./WeightLoss";

export const UndernutritionAdultResult = (weight: number, height: number, previousWeight: number, previousWeightDate: string, albuminemia: number, sarcopenia: boolean, etiologicalFoodIntake: boolean, etiologicalAbsorption: boolean, etiologicalAgression: boolean): "no" | "moderate" | "severe" => {
    const imc = CalculateIMC(weight, height);
    const weightLoss = WeightLoss(weight, previousWeight);

    if ((weightLoss >= 10) || (weightLoss >= 5 && previousWeightDate === "one-month") || (imc < 18.5) || sarcopenia) {
        if (etiologicalFoodIntake || etiologicalAbsorption || etiologicalAgression) {
            if ((imc < 17) || (weightLoss >= 15) || (weightLoss >= 10 && previousWeightDate === "one-month") || (albuminemia <= 30)) {
                return "severe";
            } else {
                return "moderate";
            }
        } else {
            return "no";
        }
    } else {
        return "no";
    }
}

export const UndernutritionSeniorResult = (weight: number, height: number, previousWeight: number, previousWeightDate: string, albuminemia: number, sarcopenia: boolean, etiologicalFoodIntake: boolean, etiologicalAbsorption: boolean, etiologicalAgression: boolean): "no" | "moderate" | "severe" => {
    const imc = CalculateIMC(weight, height);
    const weightLoss = WeightLoss(weight, previousWeight);

    if ((weightLoss >= 10) || (weightLoss >= 5 && previousWeightDate === "one-month") || (imc < 22) || sarcopenia) {
        if (etiologicalFoodIntake || etiologicalAbsorption || etiologicalAgression) {
            if ((imc < 20) || (weightLoss >= 15) || (weightLoss >= 10 && previousWeightDate === "one-month") || (albuminemia <= 30)) {
                return "severe";
            } else {
                return "moderate";
            }
        } else {
            return "no";
        }
    } else {
        return "no";
    }
}