# Job Tracker — Front-end

> 🚧 **Projet en cours de développement.** Ce dépôt contient le front-end de l'application. Le back-end, fonctionnellement complet et testé, est développé dans un dépôt séparé : [backend-job-tracker](https://github.com/MathieuBourasseau/backend-job-tracker).

Application de suivi de candidatures (recherche d'emploi/alternance), pensée pour remplacer un suivi manuel type Excel. Projet personnel de portfolio, développé pour démontrer une maîtrise de React/TypeScript sur un projet complet consommant une API REST authentifiée : gestion de l'auth (JWT), formulaires, CRUD, état dérivé de données serveur.

## Stack technique

- **React 19** / **TypeScript**
- **Vite**
- **Tailwind CSS**

## Fonctionnalités prévues

- Connexion / inscription, avec stockage du token JWT et routes protégées
- Liste des candidatures avec code couleur selon le statut (à faire, en cours, à relancer, refus)
- Création d'une candidature
- Vue détail et modification (entretien obtenu, raison de refus, dates de relance)
- Suppression d'une candidature

## Lien avec le back-end

Ce front consomme l'API REST exposée par [backend-job-tracker](https://github.com/MathieuBourasseau/backend-job-tracker) (Java 25 / Spring Boot / PostgreSQL). Toutes les routes liées aux candidatures sont protégées par authentification JWT (header `Authorization: Bearer <token>`).

| Méthode | Route | Auth requise | Description |
|---|---|---|---|
| `POST` | `/api/users` | Non | Créer un compte utilisateur |
| `POST` | `/api/auth/login` | Non | Se connecter, renvoie un token JWT |
| `POST` | `/api/applications` | Oui | Créer une candidature |
| `GET` | `/api/applications` | Oui | Lister les candidatures de l'utilisateur connecté |
| `GET` | `/api/applications/{applicationId}` | Oui | Récupérer une candidature |
| `PUT` | `/api/applications/{applicationId}` | Oui | Modifier une candidature |
| `DELETE` | `/api/applications/{applicationId}` | Oui | Supprimer une candidature |
| `POST` | `/api/statuses` | Oui | Ajouter un nouveau statut à une candidature |

Détail complet des DTOs et du modèle de données : voir le README du back-end.

## Lancer le projet en local

**Prérequis** : Node.js, et le [back-end](https://github.com/MathieuBourasseau/backend-job-tracker) lancé en local (par défaut sur `http://localhost:8080`).

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Copier `.env.example` en `.env.local` et adapter `VITE_API_URL` si besoin :
   ```bash
   cp .env.example .env.local
   ```
3. Lancer le serveur de dev :
   ```bash
   npm run dev
   ```

## Roadmap

1. ~~Mise en place du projet (Vite, TypeScript, Tailwind, structure)~~
2. Authentification (login / inscription, gestion du token, routes protégées)
3. Liste des candidatures avec code couleur
4. Création d'une candidature
5. Vue détail / modification
6. Suppression
7. Déploiement (Render pour le back, Vercel pour le front)
