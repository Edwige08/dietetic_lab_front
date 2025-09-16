'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface DataState {
    weight: number,
    height: number,
    age: number,
    nap: number,
    gender: string,
    previousWeight: number,
    previousWeightDate: "none" | "one-month" | "six-month" | "before-disease",
    albuminemia: number,
    sarcopenia: boolean,
    etiologicalAbsorption: boolean,
    etiologicalFoodIntake: boolean,
    etiologicalAgression: boolean,
    lowIngestaFive: boolean,
    lowIngestaTen: boolean,
    potassium: number,
    phosphorus: number,
    magnesium: number,
    atcd: boolean,
}

interface DataContextType {
    data: DataState;
    updateData: (newData: Partial<DataState>) => void;
    updateField: <K extends keyof DataState>(field: K, value: DataState[K]) => void;
    resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
    children: ReactNode;
}

const initialData: DataState = {
    weight: 0,
    height: 0,
    age: 0,
    nap: 0,
    gender: "f",
    previousWeight: 0,
    previousWeightDate: "none",
    albuminemia: 0,
    sarcopenia: false,
    etiologicalAbsorption: false,
    etiologicalFoodIntake: false,
    etiologicalAgression: false,
    lowIngestaFive: false,
    lowIngestaTen: false,
    potassium: 0,
    phosphorus: 0,
    magnesium: 0,
    atcd: false,
}

export function DataProvider({ children }: DataProviderProps) {
    const [data, setData] = useState<DataState>(initialData);

    // Update multiple fields :
    const updateData = (newData: Partial<DataState>) => {
        setData(prevData => ({
            ...prevData,
            ...newData
        }));
    }

    // Update only one field :
    const updateField = <K extends keyof DataState>(field: K, value: DataState[K]) => {
        setData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    // Reset all datas :
    const resetData = () => {
        setData(initialData);
    }

    const value: DataContextType = {
        data,
        updateData,
        updateField,
        resetData,
    };

    useEffect(() => {
        const savedData = localStorage.getItem('patientData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('patientData', JSON.stringify(data));
    }, [data]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(): DataContextType {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('Pas de data');
    }
    return context
}