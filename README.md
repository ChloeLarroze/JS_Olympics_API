# JS_Olympics_API Readme


## Introduction 
tree & context
description 
objectives / problematic 

<div align="center">
    <img src="./.pics/JO_eiffel.jpg" alt="Beach-volley Paris 2024" width="400px"/>
    <p><em>Figure 1 : Beach-volley Paris 2024</em></p>
</div>

<!-- --- -->

## Installation et prérequis

### Prérequis (Node.js, npm, compte Clever Cloud)
### Installation des dépendances
### Configuration de l'environnement
### Lancement de l'application
### Déploiement sur Clever Cloud

<!-- --- -->

## QuickStart 
instruction on how to start the app/api 

<!-- --- -->

## Dataset utilisé 
JO, xplain context, tables, nbr of rows, etc if time, lil analysis
justify why the use of that specific data, what we wanna do w/ it
### Description des fichiers sources CSV
### Modèles de données JSON générés
### Schémas des entités principales (Athlètes, Événements, Médailles)
relation btw entities if necessary / scheme ? 

<!-- --- -->

## API 
JSON, methods, details
### Endpoints
#### Athlètes (/athletes)
GET /athletes - Liste tous les athlètes
GET /athletes/:id - Détails d'un athlète
PUT /athletes/:id - Mettre à jour un athlète (favori)
POST /athletes - Créer un athlète
GET /athletes/search?q=... - Recherche d'athlètes

#### Événements (/events)
GET /events - Liste tous les événements
GET /events/:id - Détails d'un événement
PUT /events/:id - Mettre à jour un événement (favori)
POST /events - Créer un événement
GET /events/search?q=... - Recherche d'événements

#### Médailles (/medals)
GET /medals - Classement des médailles par pays
GET /medals/:country - Médailles d'un pays spécifique

#### Recherche globale (/search)
GET /search?q=... - Recherche across toutes les données

### Configuration
#### Variables d'environnement
#### Configuration de la base de données
#### Configuration des CORS
#### Gestion des erreurs

<!-- --- -->

## Tests
### Structure des tests
### Exécution des tests
### Couverture de code


<!-- --- -->

## Déploiement
### Configuration Clever Cloud
### Variables d'environnement de production
### Pipeline de déploiement continu
### Monitoring et logs

<!-- --- -->
## Exemples d'Utilisation
link btw our context and the material produced 
### Requêtes API examples (avec curl et examples JSON)
### Réponses API examples
### Cas d'utilisation courants


<!-- 
description: "NEST JS API deployment project based on Paris 2024 Olympics dataset @ Mines St-Étienne"
author: "Alice Francé, Chloé Larroze"
 -->