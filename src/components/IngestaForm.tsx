'use client'

import React, { useEffect, useState } from "react";
import Input from "./Input";
import InputText from "./InputText";
import Title from "./Title";
import TitleTwo from "./TitleTwo";
import ButtonGreen from "./ButtonGreen";
import { ListPlus } from "lucide-react";
import IngestaResults from "./IngestaResults";
import IngestaColapse from "./IngestaColapse";
import { CiqualData, FoodDataWithQuantity, FoodWithQuantity } from "@/types/Ciqual";

export default function IngestaForm() {
    const [foodWithQuantity, setFoodWithQuantity] = useState<FoodWithQuantity>({ food: "", quantity: 0 })
    const [ciqualData, setCiqualData] = useState<CiqualData[]>([]);
    const [searchResults, setSearchResults] = useState<CiqualData[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [foodList, setFoodList] = useState<FoodDataWithQuantity[]>([]);

    // Fetch of the ciqual data and put it in "ciqualData" :
    async function fetchCiqual() {
        try {
            const response = await fetch('/table_ciqual_2020.json');
            const data = await response.json();
            setCiqualData(data);

        } catch (error) {
            alert(`Erreur au moment du chargement des données : ${error}`)
        }
    }

    useEffect(() => {
        fetchCiqual();
    }, []);

    // Get the value entered in the inputs (food and quantity) :
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFoodWithQuantity(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value

        }))

        if (name === 'food') {
            searchFood(value);
        }
    };

    // List the ciqual food matching with what is writen in the input :
    function searchFood(query: string) {
        if (query.length < 3) {
            setSearchResults([])
            setShowSearchResults(false);
            return
        }

        const results = ciqualData.filter(food =>
            food.alim_nom_fr.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
        setShowSearchResults(true);
    }

    // Put the selected food in "foodWithQuantity" :
    const selectFood = (selectedFood: CiqualData) => {
        setFoodWithQuantity(prev => ({
            ...prev,
            food: selectedFood.alim_nom_fr
        }));

        setShowSearchResults(false);
        setSearchResults([]);
    }

    // Add a food and its quantity to the food list :
    const addFood = (event: React.FormEvent) => {
        event.preventDefault();

        if (!foodWithQuantity.food || foodWithQuantity.quantity <= 0) {
            alert("Veuillez sélectionner un aliment et lui associer une quantité");
            return;
        }

        const ciqualFood = ciqualData.find(food =>
            food.alim_nom_fr === foodWithQuantity.food
        );

        if (!ciqualFood) {
            alert('non');
            return;
        }

        const foodAdded: FoodDataWithQuantity = {
            quantity: foodWithQuantity.quantity,
            "AG 4:0, butyrique (g/100 g)": ciqualFood["AG 4:0, butyrique (g/100 g)"],
            "AG 6:0, caproïque (g/100 g)": ciqualFood["AG 6:0, caproïque (g/100 g)"],
            "AG 8:0, caprylique (g/100 g)": ciqualFood["AG 8:0, caprylique (g/100 g)"],
            "AG 10:0, caprique (g/100 g)": ciqualFood["AG 10:0, caprique (g/100 g)"],
            "AG 12:0, laurique (g/100 g)": ciqualFood["AG 12:0, laurique (g/100 g)"],
            "AG 14:0, myristique (g/100 g)": ciqualFood["AG 14:0, myristique (g/100 g)"],
            "AG 16:0, palmitique (g/100 g)": ciqualFood["AG 16:0, palmitique (g/100 g)"],
            "AG 18:0, stéarique (g/100 g)": ciqualFood["AG 18:0, stéarique (g/100 g)"],
            "AG 18:1 9c (n-9), oléique (g/100 g)": ciqualFood["AG 18:1 9c (n-9), oléique (g/100 g)"],
            "AG 18:2 9c,12c (n-6), linoléique (g/100 g)": ciqualFood["AG 18:2 9c,12c (n-6), linoléique (g/100 g)"],
            "AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)": ciqualFood["AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)"],
            "AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)": ciqualFood["AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)"],
            "AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)": ciqualFood["AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)"],
            "AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)": ciqualFood["AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)"],
            "AG monoinsaturés (g/100 g)": ciqualFood["AG monoinsaturés (g/100 g)"],
            "AG polyinsaturés (g/100 g)": ciqualFood["AG polyinsaturés (g/100 g)"],
            "AG saturés (g/100 g)": ciqualFood["AG saturés (g/100 g)"],
            "Acides organiques (g/100 g)": ciqualFood["Acides organiques (g/100 g)"],
            "Alcool (g/100 g)": ciqualFood["Alcool (g/100 g)"],
            "Amidon (g/100 g)": ciqualFood["Amidon (g/100 g)"],
            "Beta-Carotène (µg/100 g)": ciqualFood["Beta-Carotène (µg/100 g)"],
            "Calcium (mg/100 g)": ciqualFood["Calcium (mg/100 g)"],
            "Cendres (g/100 g)": ciqualFood["Cendres (g/100 g)"],
            "Chlorure (mg/100 g)": ciqualFood["Chlorure (mg/100 g)"],
            "Cholestérol (mg/100 g)": ciqualFood["Cholestérol (mg/100 g)"],
            "Cuivre (mg/100 g)": ciqualFood["Cuivre (mg/100 g)"],
            "Eau (g/100 g)": ciqualFood["Eau (g/100 g)"],
            "Energie, N x facteur Jones, avec fibres (kJ/100 g)": ciqualFood["Energie, N x facteur Jones, avec fibres (kJ/100 g)"],
            "Energie, N x facteur Jones, avec fibres (kcal/100 g)": ciqualFood["Energie, N x facteur Jones, avec fibres (kcal/100 g)"],
            "Energie, Règlement UE N° 1169/2011 (kJ/100 g)": ciqualFood["Energie, Règlement UE N° 1169/2011 (kJ/100 g)"],
            "Energie, Règlement UE N° 1169/2011 (kcal/100 g)": ciqualFood["Energie, Règlement UE N° 1169/2011 (kcal/100 g)"],
            "Fer (mg/100 g)": ciqualFood["Fer (mg/100 g)"],
            "Fibres alimentaires (g/100 g)": ciqualFood["Fibres alimentaires (g/100 g)"],
            "Fructose (g/100 g)": ciqualFood["Fructose (g/100 g)"],
            "Galactose (g/100 g)": ciqualFood["Galactose (g/100 g)"],
            "Glucides (g/100 g)": ciqualFood["Glucides (g/100 g)"],
            "Glucose (g/100 g)": ciqualFood["Glucose (g/100 g)"],
            "Iode (µg/100 g)": ciqualFood["Iode (µg/100 g)"],
            "Lactose (g/100 g)": ciqualFood["Lactose (g/100 g)"],
            "Lipides (g/100 g)": ciqualFood["Lipides (g/100 g)"],
            "Magnésium (mg/100 g)": ciqualFood["Magnésium (mg/100 g)"],
            "Maltose (g/100 g)": ciqualFood["Maltose (g/100 g)"],
            "Manganèse (mg/100 g)": ciqualFood["Manganèse (mg/100 g)"],
            "Phosphore (mg/100 g)": ciqualFood["Phosphore (mg/100 g)"],
            "Polyols totaux (g/100 g)": ciqualFood["Polyols totaux (g/100 g)"],
            "Potassium (mg/100 g)": ciqualFood["Potassium (mg/100 g)"],
            "Protéines, N x 6.25 (g/100 g)": ciqualFood["Protéines, N x 6.25 (g/100 g)"],
            "Protéines, N x facteur de Jones (g/100 g)": ciqualFood["Protéines, N x facteur de Jones (g/100 g)"],
            "Rétinol (µg/100 g)": ciqualFood["Rétinol (µg/100 g)"],
            "Saccharose (g/100 g)": ciqualFood["Saccharose (g/100 g)"],
            "Sel chlorure de sodium (g/100 g)": ciqualFood["Sel chlorure de sodium (g/100 g)"],
            "Sodium (mg/100 g)": ciqualFood["Sodium (mg/100 g)"],
            "Sucres (g/100 g)": ciqualFood["Sucres (g/100 g)"],
            "Sélénium (µg/100 g)": ciqualFood["Sélénium (µg/100 g)"],
            "Vitamine B1 ou Thiamine (mg/100 g)": ciqualFood["Vitamine B1 ou Thiamine (mg/100 g)"],
            "Vitamine B2 ou Riboflavine (mg/100 g)": ciqualFood["Vitamine B2 ou Riboflavine (mg/100 g)"],
            "Vitamine B3 ou PP ou Niacine (mg/100 g)": ciqualFood["Vitamine B3 ou PP ou Niacine (mg/100 g)"],
            "Vitamine B5 ou Acide pantothénique (mg/100 g)": ciqualFood["Vitamine B5 ou Acide pantothénique (mg/100 g)"],
            "Vitamine B6 (mg/100 g)": ciqualFood["Vitamine B6 (mg/100 g)"],
            "Vitamine B9 ou Folates totaux (µg/100 g)": ciqualFood["Vitamine B9 ou Folates totaux (µg/100 g)"],
            "Vitamine B12 (µg/100 g)": ciqualFood["Vitamine B12 (µg/100 g)"],
            "Vitamine C (mg/100 g)": ciqualFood["Vitamine C (mg/100 g)"],
            "Vitamine D (µg/100 g)": ciqualFood["Vitamine D (µg/100 g)"],
            "Vitamine E (mg/100 g)": ciqualFood["Vitamine E (mg/100 g)"],
            "Vitamine K1 (µg/100 g)": ciqualFood["Vitamine K1 (µg/100 g)"],
            "Vitamine K2 (µg/100 g)": ciqualFood["Vitamine K2 (µg/100 g)"],
            "Zinc (mg/100 g)": ciqualFood["Zinc (mg/100 g)"],
            "alim_code": ciqualFood.alim_code,
            "alim_grp_code": ciqualFood.alim_grp_code,
            "alim_grp_nom_fr": ciqualFood.alim_grp_nom_fr,
            "alim_nom_fr": ciqualFood.alim_nom_fr,
            "alim_nom_sci": ciqualFood.alim_nom_sci,
            "alim_ssgrp_code": ciqualFood.alim_ssgrp_code,
            "alim_ssgrp_nom_fr": ciqualFood.alim_ssgrp_nom_fr,
            "alim_ssssgrp_code": ciqualFood.alim_ssssgrp_code,
            "alim_ssssgrp_nom_fr": ciqualFood.alim_ssssgrp_nom_fr,
        }

        setFoodList(prev => [...prev, foodAdded]);
        setFoodWithQuantity({ food: "", quantity: 0 })
    }

    // Remove a food from the food list :
    const removeFood = (index: number) => {
        setFoodList(prev => prev.filter((_, i) => i !== index))
    }

    const adjustedValue = (valueFor100g: string, quantity: number): number => {
        return (parseFloat(valueFor100g) * quantity / 100) || 0
    }

    const totals = foodList.reduce((accumulator, food) => ({
        "AG 4:0, butyrique (g/100 g)": accumulator["AG 4:0, butyrique (g/100 g)"] + adjustedValue(food["AG 4:0, butyrique (g/100 g)"], food.quantity),
        "AG 6:0, caproïque (g/100 g)": accumulator["AG 6:0, caproïque (g/100 g)"] + adjustedValue(food["AG 6:0, caproïque (g/100 g)"], food.quantity),
        "AG 8:0, caprylique (g/100 g)": accumulator["AG 8:0, caprylique (g/100 g)"] + adjustedValue(food["AG 8:0, caprylique (g/100 g)"], food.quantity),
        "AG 10:0, caprique (g/100 g)": accumulator["AG 10:0, caprique (g/100 g)"] + adjustedValue(food["AG 10:0, caprique (g/100 g)"], food.quantity),
        "AG 12:0, laurique (g/100 g)": accumulator["AG 12:0, laurique (g/100 g)"] + adjustedValue(food["AG 12:0, laurique (g/100 g)"], food.quantity),
        "AG 14:0, myristique (g/100 g)": accumulator["AG 14:0, myristique (g/100 g)"] + adjustedValue(food["AG 14:0, myristique (g/100 g)"], food.quantity),
        "AG 16:0, palmitique (g/100 g)": accumulator["AG 16:0, palmitique (g/100 g)"] + adjustedValue(food["AG 16:0, palmitique (g/100 g)"], food.quantity),
        "AG 18:0, stéarique (g/100 g)": accumulator["AG 18:0, stéarique (g/100 g)"] + adjustedValue(food["AG 18:0, stéarique (g/100 g)"], food.quantity),
        "AG 18:1 9c (n-9), oléique (g/100 g)": accumulator["AG 18:1 9c (n-9), oléique (g/100 g)"] + adjustedValue(food["AG 18:1 9c (n-9), oléique (g/100 g)"], food.quantity),
        "AG 18:2 9c,12c (n-6), linoléique (g/100 g)": accumulator["AG 18:2 9c,12c (n-6), linoléique (g/100 g)"] + adjustedValue(food["AG 18:2 9c,12c (n-6), linoléique (g/100 g)"], food.quantity),
        "AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)": accumulator["AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)"] + adjustedValue(food["AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)"], food.quantity),
        "AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)": accumulator["AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)"] + adjustedValue(food["AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)"], food.quantity),
        "AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)": accumulator["AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)"] + adjustedValue(food["AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)"], food.quantity),
        "AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)": accumulator["AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)"] + adjustedValue(food["AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)"], food.quantity),
        "AG monoinsaturés (g/100 g)": accumulator["AG monoinsaturés (g/100 g)"] + adjustedValue(food["AG monoinsaturés (g/100 g)"], food.quantity),
        "AG polyinsaturés (g/100 g)": accumulator["AG polyinsaturés (g/100 g)"] + adjustedValue(food["AG polyinsaturés (g/100 g)"], food.quantity),
        "AG saturés (g/100 g)": accumulator["AG saturés (g/100 g)"] + adjustedValue(food["AG saturés (g/100 g)"], food.quantity),
        "Acides organiques (g/100 g)": accumulator["Acides organiques (g/100 g)"] + adjustedValue(food["Acides organiques (g/100 g)"], food.quantity),
        "Alcool (g/100 g)": accumulator["Alcool (g/100 g)"] + adjustedValue(food["Alcool (g/100 g)"], food.quantity),
        "Amidon (g/100 g)": accumulator["Amidon (g/100 g)"] + adjustedValue(food["Amidon (g/100 g)"], food.quantity),
        "Beta-Carotène (µg/100 g)": accumulator["Beta-Carotène (µg/100 g)"] + adjustedValue(food["Beta-Carotène (µg/100 g)"], food.quantity),
        "Calcium (mg/100 g)": accumulator["Calcium (mg/100 g)"] + adjustedValue(food["Calcium (mg/100 g)"], food.quantity),
        "Cendres (g/100 g)": accumulator["Cendres (g/100 g)"] + adjustedValue(food["Cendres (g/100 g)"], food.quantity),
        "Chlorure (mg/100 g)": accumulator["Chlorure (mg/100 g)"] + adjustedValue(food["Chlorure (mg/100 g)"], food.quantity),
        "Cholestérol (mg/100 g)": accumulator["Cholestérol (mg/100 g)"] + adjustedValue(food["Cholestérol (mg/100 g)"], food.quantity),
        "Cuivre (mg/100 g)": accumulator["Cuivre (mg/100 g)"] + adjustedValue(food["Cuivre (mg/100 g)"], food.quantity),
        "Eau (g/100 g)": accumulator["Eau (g/100 g)"] + adjustedValue(food["Eau (g/100 g)"], food.quantity),
        "Energie, N x facteur Jones, avec fibres (kJ/100 g)": accumulator["Energie, N x facteur Jones, avec fibres (kJ/100 g)"] + adjustedValue(food["Energie, N x facteur Jones, avec fibres (kJ/100 g)"], food.quantity),
        "Energie, N x facteur Jones, avec fibres (kcal/100 g)": accumulator["Energie, N x facteur Jones, avec fibres (kcal/100 g)"] + adjustedValue(food["Energie, N x facteur Jones, avec fibres (kcal/100 g)"], food.quantity),
        "Energie, Règlement UE N° 1169/2011 (kJ/100 g)": accumulator["Energie, Règlement UE N° 1169/2011 (kJ/100 g)"] + adjustedValue(food["Energie, Règlement UE N° 1169/2011 (kJ/100 g)"], food.quantity),
        "Energie, Règlement UE N° 1169/2011 (kcal/100 g)": accumulator["Energie, Règlement UE N° 1169/2011 (kcal/100 g)"] + adjustedValue(food["Energie, Règlement UE N° 1169/2011 (kcal/100 g)"], food.quantity),
        "Fer (mg/100 g)": accumulator["Fer (mg/100 g)"] + adjustedValue(food["Fer (mg/100 g)"], food.quantity),
        "Fibres alimentaires (g/100 g)": accumulator["Fibres alimentaires (g/100 g)"] + adjustedValue(food["Fibres alimentaires (g/100 g)"], food.quantity),
        "Fructose (g/100 g)": accumulator["Fructose (g/100 g)"] + adjustedValue(food["Fructose (g/100 g)"], food.quantity),
        "Galactose (g/100 g)": accumulator["Galactose (g/100 g)"] + adjustedValue(food["Galactose (g/100 g)"], food.quantity),
        "Glucides (g/100 g)": accumulator["Glucides (g/100 g)"] + adjustedValue(food["Glucides (g/100 g)"], food.quantity),
        "Glucose (g/100 g)": accumulator["Glucose (g/100 g)"] + adjustedValue(food["Glucose (g/100 g)"], food.quantity),
        "Iode (µg/100 g)": accumulator["Iode (µg/100 g)"] + adjustedValue(food["Iode (µg/100 g)"], food.quantity),
        "Lactose (g/100 g)": accumulator["Lactose (g/100 g)"] + adjustedValue(food["Lactose (g/100 g)"], food.quantity),
        "Lipides (g/100 g)": accumulator["Lipides (g/100 g)"] + adjustedValue(food["Lipides (g/100 g)"], food.quantity),
        "Magnésium (mg/100 g)": accumulator["Magnésium (mg/100 g)"] + adjustedValue(food["Magnésium (mg/100 g)"], food.quantity),
        "Maltose (g/100 g)": accumulator["Maltose (g/100 g)"] + adjustedValue(food["Maltose (g/100 g)"], food.quantity),
        "Manganèse (mg/100 g)": accumulator["Manganèse (mg/100 g)"] + adjustedValue(food["Manganèse (mg/100 g)"], food.quantity),
        "Phosphore (mg/100 g)": accumulator["Phosphore (mg/100 g)"] + adjustedValue(food["Phosphore (mg/100 g)"], food.quantity),
        "Polyols totaux (g/100 g)": accumulator["Polyols totaux (g/100 g)"] + adjustedValue(food["Polyols totaux (g/100 g)"], food.quantity),
        "Potassium (mg/100 g)": accumulator["Potassium (mg/100 g)"] + adjustedValue(food["Potassium (mg/100 g)"], food.quantity),
        "Protéines, N x 6.25 (g/100 g)": accumulator["Protéines, N x 6.25 (g/100 g)"] + adjustedValue(food["Protéines, N x 6.25 (g/100 g)"], food.quantity),
        "Protéines, N x facteur de Jones (g/100 g)": accumulator["Protéines, N x facteur de Jones (g/100 g)"] + adjustedValue(food["Protéines, N x facteur de Jones (g/100 g)"], food.quantity),
        "Rétinol (µg/100 g)": accumulator["Rétinol (µg/100 g)"] + adjustedValue(food["Rétinol (µg/100 g)"], food.quantity),
        "Saccharose (g/100 g)": accumulator["Saccharose (g/100 g)"] + adjustedValue(food["Saccharose (g/100 g)"], food.quantity),
        "Sel chlorure de sodium (g/100 g)": accumulator["Sel chlorure de sodium (g/100 g)"] + adjustedValue(food["Sel chlorure de sodium (g/100 g)"], food.quantity),
        "Sodium (mg/100 g)": accumulator["Sodium (mg/100 g)"] + adjustedValue(food["Sodium (mg/100 g)"], food.quantity),
        "Sucres (g/100 g)": accumulator["Sucres (g/100 g)"] + adjustedValue(food["Sucres (g/100 g)"], food.quantity),
        "Sélénium (µg/100 g)": accumulator["Sélénium (µg/100 g)"] + adjustedValue(food["Sélénium (µg/100 g)"], food.quantity),
        "Vitamine B1 ou Thiamine (mg/100 g)": accumulator["Vitamine B1 ou Thiamine (mg/100 g)"] + adjustedValue(food["Vitamine B1 ou Thiamine (mg/100 g)"], food.quantity),
        "Vitamine B2 ou Riboflavine (mg/100 g)": accumulator["Vitamine B2 ou Riboflavine (mg/100 g)"] + adjustedValue(food["Vitamine B2 ou Riboflavine (mg/100 g)"], food.quantity),
        "Vitamine B3 ou PP ou Niacine (mg/100 g)": accumulator["Vitamine B3 ou PP ou Niacine (mg/100 g)"] + adjustedValue(food["Vitamine B3 ou PP ou Niacine (mg/100 g)"], food.quantity),
        "Vitamine B5 ou Acide pantothénique (mg/100 g)": accumulator["Vitamine B5 ou Acide pantothénique (mg/100 g)"] + adjustedValue(food["Vitamine B5 ou Acide pantothénique (mg/100 g)"], food.quantity),
        "Vitamine B6 (mg/100 g)": accumulator["Vitamine B6 (mg/100 g)"] + adjustedValue(food["Vitamine B6 (mg/100 g)"], food.quantity),
        "Vitamine B9 ou Folates totaux (µg/100 g)": accumulator["Vitamine B9 ou Folates totaux (µg/100 g)"] + adjustedValue(food["Vitamine B9 ou Folates totaux (µg/100 g)"], food.quantity),
        "Vitamine B12 (µg/100 g)": accumulator["Vitamine B12 (µg/100 g)"] + adjustedValue(food["Vitamine B12 (µg/100 g)"], food.quantity),
        "Vitamine C (mg/100 g)": accumulator["Vitamine C (mg/100 g)"] + adjustedValue(food["Vitamine C (mg/100 g)"], food.quantity),
        "Vitamine D (µg/100 g)": accumulator["Vitamine D (µg/100 g)"] + adjustedValue(food["Vitamine D (µg/100 g)"], food.quantity),
        "Vitamine E (mg/100 g)": accumulator["Vitamine E (mg/100 g)"] + adjustedValue(food["Vitamine E (mg/100 g)"], food.quantity),
        "Vitamine K1 (µg/100 g)": accumulator["Vitamine K1 (µg/100 g)"] + adjustedValue(food["Vitamine K1 (µg/100 g)"], food.quantity),
        "Vitamine K2 (µg/100 g)": accumulator["Vitamine K2 (µg/100 g)"] + adjustedValue(food["Vitamine K2 (µg/100 g)"], food.quantity),
        "Zinc (mg/100 g)": accumulator["Zinc (mg/100 g)"] + adjustedValue(food["Zinc (mg/100 g)"], food.quantity),
    }), {
        // Valeurs initiales de l'accumulateur (toutes à 0)
        "AG 4:0, butyrique (g/100 g)": 0,
        "AG 6:0, caproïque (g/100 g)": 0,
        "AG 8:0, caprylique (g/100 g)": 0,
        "AG 10:0, caprique (g/100 g)": 0,
        "AG 12:0, laurique (g/100 g)": 0,
        "AG 14:0, myristique (g/100 g)": 0,
        "AG 16:0, palmitique (g/100 g)": 0,
        "AG 18:0, stéarique (g/100 g)": 0,
        "AG 18:1 9c (n-9), oléique (g/100 g)": 0,
        "AG 18:2 9c,12c (n-6), linoléique (g/100 g)": 0,
        "AG 18:3 c9,c12,c15 (n-3), alpha-linolénique (g/100 g)": 0,
        "AG 20:4 5c,8c,11c,14c (n-6), arachidonique (g/100 g)": 0,
        "AG 20:5 5c,8c,11c,14c,17c (n-3) EPA (g/100 g)": 0,
        "AG 22:6 4c,7c,10c,13c,16c,19c (n-3) DHA (g/100 g)": 0,
        "AG monoinsaturés (g/100 g)": 0,
        "AG polyinsaturés (g/100 g)": 0,
        "AG saturés (g/100 g)": 0,
        "Acides organiques (g/100 g)": 0,
        "Alcool (g/100 g)": 0,
        "Amidon (g/100 g)": 0,
        "Beta-Carotène (µg/100 g)": 0,
        "Calcium (mg/100 g)": 0,
        "Cendres (g/100 g)": 0,
        "Chlorure (mg/100 g)": 0,
        "Cholestérol (mg/100 g)": 0,
        "Cuivre (mg/100 g)": 0,
        "Eau (g/100 g)": 0,
        "Energie, N x facteur Jones, avec fibres (kJ/100 g)": 0,
        "Energie, N x facteur Jones, avec fibres (kcal/100 g)": 0,
        "Energie, Règlement UE N° 1169/2011 (kJ/100 g)": 0,
        "Energie, Règlement UE N° 1169/2011 (kcal/100 g)": 0,
        "Fer (mg/100 g)": 0,
        "Fibres alimentaires (g/100 g)": 0,
        "Fructose (g/100 g)": 0,
        "Galactose (g/100 g)": 0,
        "Glucides (g/100 g)": 0,
        "Glucose (g/100 g)": 0,
        "Iode (µg/100 g)": 0,
        "Lactose (g/100 g)": 0,
        "Lipides (g/100 g)": 0,
        "Magnésium (mg/100 g)": 0,
        "Maltose (g/100 g)": 0,
        "Manganèse (mg/100 g)": 0,
        "Phosphore (mg/100 g)": 0,
        "Polyols totaux (g/100 g)": 0,
        "Potassium (mg/100 g)": 0,
        "Protéines, N x 6.25 (g/100 g)": 0,
        "Protéines, N x facteur de Jones (g/100 g)": 0,
        "Rétinol (µg/100 g)": 0,
        "Saccharose (g/100 g)": 0,
        "Sel chlorure de sodium (g/100 g)": 0,
        "Sodium (mg/100 g)": 0,
        "Sucres (g/100 g)": 0,
        "Sélénium (µg/100 g)": 0,
        "Vitamine B1 ou Thiamine (mg/100 g)": 0,
        "Vitamine B2 ou Riboflavine (mg/100 g)": 0,
        "Vitamine B3 ou PP ou Niacine (mg/100 g)": 0,
        "Vitamine B5 ou Acide pantothénique (mg/100 g)": 0,
        "Vitamine B6 (mg/100 g)": 0,
        "Vitamine B9 ou Folates totaux (µg/100 g)": 0,
        "Vitamine B12 (µg/100 g)": 0,
        "Vitamine C (mg/100 g)": 0,
        "Vitamine D (µg/100 g)": 0,
        "Vitamine E (mg/100 g)": 0,
        "Vitamine K1 (µg/100 g)": 0,
        "Vitamine K2 (µg/100 g)": 0,
        "Zinc (mg/100 g)": 0,
    });

    return (
        <>
            <Title
                text="Calcul des ingesta"
            />
            <form
                onSubmit={addFood}
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Ajouter des aliments au calcul"
                />

                <div className="relative">
                    <InputText
                        type="text"
                        title="Aliment : "
                        name="food"
                        value={foodWithQuantity.food}
                        onChange={handleChange}
                    />

                    {showSearchResults && searchResults.length > 0 &&
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto z-10 shadow-lg">
                            {searchResults.map((food, index) => (
                                <div
                                    key={index}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                                    onClick={() => selectFood(food)}
                                >
                                    <div className="font-medium text-gray-900">
                                        {food.alim_nom_fr}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>

                <Input
                    title="Quantité (g) : "
                    name="quantity"
                    value={foodWithQuantity.quantity}
                    onChange={handleChange}
                />
                <ButtonGreen
                    text="Ajouter"
                    type="submit"
                    lucide={ListPlus}
                />

            </form>

            <div
                className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
            >
                <TitleTwo
                    text="Liste des aliments pour le calcul"
                />

                {foodList.length === 0 ?
                    <p className="text-(--grayColor) text-center py-4">
                        Aucun élément ajouté pour le moment
                    </p>
                    :
                    <div className="flex flex-col gap-1">
                        {foodList.map((food, index) => {
                            return (
                                <IngestaColapse
                                    key={index}
                                    food={food.alim_nom_fr}
                                    quantity={food.quantity}
                                    calories={adjustedValue(food["Energie, Règlement UE N° 1169/2011 (kcal/100 g)"], food.quantity)}
                                    protein={adjustedValue(food["Protéines, N x 6.25 (g/100 g)"], food.quantity)}
                                    fats={adjustedValue(food["Lipides (g/100 g)"], food.quantity)}
                                    carbohydrates={adjustedValue(food["Glucides (g/100 g)"], food.quantity)}
                                    onClick={() => removeFood(index)}
                                />
                            )
                        })}
                    </div>
                }
            </div>

            {foodList.length > 0 &&
                <IngestaResults
                    energy={totals["Energie, Règlement UE N° 1169/2011 (kcal/100 g)"]}
                    proteins={totals["Protéines, N x 6.25 (g/100 g)"]}
                    fats={totals["Lipides (g/100 g)"]}
                    ags={totals["AG saturés (g/100 g)"]}
                    agmi={totals["AG monoinsaturés (g/100 g)"]}
                    agpi={totals["AG polyinsaturés (g/100 g)"]}
                    cholesterol={totals["Cholestérol (mg/100 g)"]}
                    carbohydrates={totals["Glucides (g/100 g)"]}
                    sugar={totals["Sucres (g/100 g)"]}
                    fibers={totals["Fibres alimentaires (g/100 g)"]}
                    alcool={totals["Alcool (g/100 g)"]}
                    sodium={totals["Sodium (mg/100 g)"]}
                    potassium={totals["Potassium (mg/100 g)"]}
                    phosphore={totals["Phosphore (mg/100 g)"]}
                    fer={totals["Fer (mg/100 g)"]}
                    calcium={totals["Calcium (mg/100 g)"]}
                    vitD={totals["Vitamine D (µg/100 g)"]}
                />
            }
        </>
    )
}