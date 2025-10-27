# 🍍 Dietetic Lab

**Dietetic Lab** est une **Progressive Web App (PWA)** destinée aux **professionnels de la nutrition**, notamment les **diététiciens**.  
Elle regroupe plusieurs outils permettant de réaliser rapidement différents calculs nutritionnels et évaluations cliniques, aussi bien sur **ordinateur** que sur **téléphone**.

---

## 📋 Sommaire

- [Description](#-description)
- [Fonctionnalités](#-fonctionnalités)
- [Stack technique](#-stack-technique)
- [Tests et intégration continue](#-tests-et-intégration-continue)
- [Roadmap](#-roadmap)
- [Avertissement](#-avertissement)
- [Contact](#-contact)

---

## 🧠 Description

**Dietetic Lab** est un outil numérique conçu pour **faciliter le travail des professionnels de la nutrition, et principalement les diététiciens**.  
Elle permet d'effectuer différents calculs et évaluations essentiels à la pratique clinique : **IMC**, **DEJ**, **diagnostic de dénutrition**, **risque de syndrome de renutrition inappropriée (SRI)** et **calcul des ingesta** à partir de la **table Ciqual 2020**.

### Objectifs

- Offrir une interface claire, rapide et accessible partout.
- Gagner du temps lors des évaluations nutritionnelles.
- Centraliser plusieurs outils utiles au même endroit.

### Utilisation avec ou sans compte

- **Sans compte** : accès à tous les outils de calcul.
- **Avec compte** : possibilité de **créer sa propre base alimentaire personnalisée** afin de l'utiliser dans l'outil de calcul des ingesta, d’envoyer un message à la développeuse ou de garder un historique des calculs faits (fonctionnalité en cours de développement).

---

## ⚙️ Fonctionnalités

### 🔹 Calcul de l’IMC (Indice de Masse Corporelle)
Outil de calcul de l'Indice de Masse Corporelle pour un adulte.


### 🔹 Calcul de la DEJ (Dépense Énergétique Journalière)
Outil de calcul de la Dépense Énergétique Journalière pour un adulte avec la formule de Black et al. ou de Harris et Benedict


### 🔹 Diagnostic de dénutrition
Outil d'aide au dépistage de la dénutrition selon les critères diagnostics de la Haute Autorité de Santé (HAS). Il permet de dépister la dénutrition ainsi que son niveau de sévérité. 


### 🔹 Évaluation du risque de SRI (Syndrome de Renutrition Inappropriée)  
Outil d'aide à l'évaluation du risque de Syndrome de Renutrition Inappropriée, selon les critères de la SFNCM.


### 🔹 Calcul des ingesta
Outil permettant le calcul d'ingesta. L'utilisateur sélectionne un ou plusieurs aliments de la **base Ciqual 2020**, leur associe une quantité, et obtient automatiquement la **valeur calorique et nutritionnelle** de chaque aliment ainsi que le total de la liste créée.


### 🔹 En cours de développement  : Calcul des paramètres d'insulinothérapie fonctionnelle
Outil permettant le calcul des paramètres théoriques d'insulinothérapie fonctionnelle (unités d'insuline par portion de glucides, compensation, resucrage).

---

## 🛠️ Stack technique

| Domaine | Technologie |
|----------|--------------|
| **Frontend** | TypeScript, Next.js, TailwindCSS, DaisyUI |
| **Backend** | Python, Django |
| **Base de données** | PostgreSQL (hébergée sur [Neon](https://neon.tech)) |
| **Hébergement** | Frontend & backend déployés sur [Vercel](https://vercel.com) |
| **Analyse d’usage** | [PostHog](https://posthog.com) |
| **CI/CD** | GitHub Actions (tests unitaires automatisés) |

---

## 🧪 Tests et intégration continue

Des **tests unitaires** sont mis en place pour assurer la fiabilité des outils.
Ils sont exécutés automatiquement via **GitHub Actions** lors de chaque push ou pull request.

---

## 🚀 Roadmap

- [ ] Mise en place de l'accès à l'historique des calculs faits par l'utilisateur connecté
- [ ] Création d'un outil de calcul des paramètres théoriques d’insulinothérapie fonctionnelle
- [ ] Création d'un outil de calcul du NAP
- [ ] Amélioration de l’interface mobile

---

## ⚠️ Avertissement

> Dietetic Lab est un outil d’aide au calcul **à visée informative et professionnelle**.
> Elle **ne remplace pas une prise en charge nutritionnelle par un diététicien** et ne fournit **aucun conseil nutritionnel personnalisé**.

---

## 📬 Contact

👩‍💻 Développeuse : Edwige  
🌐 Application : https://dietetic-lab.vercel.app/  
🐙 GitHub : https://github.com/Edwige08  

---

🩵 *Développé avec passion pour simplifier la pratique diététique.*