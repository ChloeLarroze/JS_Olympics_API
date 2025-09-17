# JS_Olympics_API Readme


## Introduction 


En 2024, la France a accueilli l’un des plus grands événements sportifs mondiaux : les Jeux Olympiques d’été de Paris. Pendant plusieurs semaines, des milliers d’athlètes venus des quatre coins du globe se sont affrontés dans plus de 300 épreuves, réparties sur des dizaines de disciplines sportives. Cet événement a également permis  de générer une quantité massive de données : identités des athlètes, pays représentés, performances réalisées, épreuves disputées, palmarès de médailles, etc. Si ces données sont publiquement disponibles, elles sont souvent fragmentées, difficiles à interroger et peu centralisées sous un format accessible pour des développeurs, analystes ou journalistes sportifs qui souhaiteraient les réutiliser.  

Dans ce contexte, le Comité d’Organisation des Jeux de Paris 2024 a exprimé un besoin : **concevoir une API centralisée regroupant les données clés des JO** afin de faciliter leur consultation et leur exploitation dans d’autres projets (sites web, applications mobiles, visualisations de données, etc.).

Nous essaierons ainsi de répondre à la problématique suivante: 
> Comment centraliser et rendre accessibles les données massives des Jeux Olympiques de Paris 2024 de manière simple, rapide et structurée ?


<div align="center">
    <img src="./.pics/JO_eiffel.jpg" alt="Beach-volley Paris 2024" width="400px"/>
    <p><em>Figure 1 : Beach-volley Paris 2024</em></p>
</div>

<!-- --- -->

### Arborescence du projet & contexte
Ce projet a été réalisé dans le cadre d’un TP visant à concevoir une API REST en Node.js avec le framework NestJS. Cette dernière permet d’accéder aux données sous forme JSON et d’effectuer des requêtes sur chacune des entités à travers des endpoints REST.  
L’objectif est de manipuler des données issues des Jeux Olympiques d’été de Paris 2024 afin de s’initier à la création d’endpoints, à la structuration d’un projet backend et à la manipulation de fichiers de données.

```bash
├── data
│   ├── csv-2-json.py
│   ├── csv2jsao.py
│   ├── dataset_csv
│   │   ├── athletes.csv
│   │   ├── events.csv
│   │   ├── medals.csv
│   └── dataset_json
│       ├── athletes.json
│       ├── events.json
│       └── medals.json
├── node_modules
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── app.module.ts
│   ├── Athlete
│   │   ├── athlete.controller.ts
│   │   ├── athlete.module.ts
│   │   ├── athlete.service.ts
│   │   ├── Athlete.ts
│   │   ├── favorite.controller.ts
│   │   ├── favorite.module.ts
│   │   └── favorite.service.ts
│   ├── Events
│   │   ├── events.controller.ts
│   │   ├── events.module.ts
│   │   ├── events.service.ts
│   │   └── Events.ts
│   ├── main.ts
│   └── Medailles
│       ├── Medaille.ts
│       ├── medailles.controller.ts
│       ├── medailles.module.ts
│       └── medailles.service.ts
├── test
│   ├── athlete.e2e-spec.ts
│   ├── events.e2e-spec.ts.bak
│   └── medailles.e2e-spec.ts
└── tsconfig.json
```


## Quickstart

### Prérequis
Avant de commencer, assurez-vous d’avoir :

- Node.js (v18 ou plus récent)
- npm (livré avec Node.js)
- Un compte Clever Cloud pour le déploiement
- (Optionnel) NestJS CLI installé globalement : 
```bash
npm install -g @nestjs/cli
```

Cloner le repo puis installer les dépendances du projet
```bash
git clone https://github.com/ChloeLarroze/JS_Olympics_API.git
cd JS_Olympics_API
npm install
```
### Lancement de l'application

En local: 
```bash
npm run start:dev
```

Pour un build et un démarrage en production :
```bash
npm run build
npm run start:prod
```

### Déploiement sur Clever Cloud
TODO


Une fois l'API lancée, on pourra trouver les endpoints principaux :
- `/athletes`
- `/events`
- `/medailles`

<!-- --- -->


## Dataset utilisé 
Le dataset utilisé provient de [Paris 2024 Olympic Summer Games Dataset](https://www.kaggle.com/datasets/piterfm/paris-2024-olympic-summer-games).
Il fournit des informations complètes sur les Jeux Olympiques d’été 2024 : athlètes, disciplines, événements, pays participants, et médailles. 

Nous utiliserons notamment les tables: 
| Fichier        | Description                                                          |
|----------------|----------------------------------------------------------------------|
| `athletes.csv` | Informations personnelles sur les athlètes (nom, âge, pays, sport, etc.) |
| `events.csv`   | Détails sur les épreuves (sport, date, lieu, participants, etc.)         |
| `medals.csv`   | Détenteurs de médailles (athlète, pays, épreuve, type de médaille)        |

### Modèles de données JSON générés


<!-- --- -->

## API 
JSON, methods, details

<div align="center">
    <img src="./.pics/schema.png" alt="Beach-volley Paris 2024" width="400px"/>
    <p><em>Figure 2 : Schéma API</em></p>
</div>

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