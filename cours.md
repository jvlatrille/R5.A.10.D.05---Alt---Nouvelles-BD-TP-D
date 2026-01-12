# Fiche de révision – Nouveaux paradigmes de bases de données

## 1. Des BD relationnelles aux BD non relationnelles

### 1.1 Rappels sur les principes des BD relationnelles

- **Modèle relationnel**
  - Données sous forme de **tables** (relations) = lignes (tuples) × colonnes (attributs).
  - Un **schéma** décrit la structure (nom de la table, attributs, types).
- **Clés**
  - **Clé primaire** : identifie de manière **unique** chaque ligne (unicité + non-null).
  - **Clé étrangère** : référence une clé primaire d’une autre table → lien entre tables.
- **Contraintes d’intégrité**
  - **Intégrité de domaine** : type, intervalle de valeurs (check).
  - **Intégrité de clé** : unicité, non-null.
  - **Intégrité référentielle** : une clé étrangère doit toujours référencer une ligne existante.
- **Langage de manipulation**
  - **SQL** : `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`, etc.
  - Basé sur l’algèbre relationnelle (projection, sélection, jointure, etc.).
- **Transactions**
  - Propriétés **ACID** :
    - **A**tomicité : tout ou rien.
    - **C**ohérence : l’état reste valide (contraintes respectées).
    - **I**solation : les transactions ne se voient pas entre elles avant validation.
    - **D**urabilité : une fois validée, une transaction est persistée.

---

### 1.2 Compléments sur les formes normales

But : réduire les **redondances** et les **anomalies** (insertion, mise à jour, suppression).

- **1FN (première forme normale)**
  - Chaque attribut est **atomique** (pas de listes, pas d’attributs composés).
  - Pas de colonnes répétées (éviter `tel1`, `tel2`, …).
- **2FN**
  - Être en 1FN **et** :
  - Tout attribut non clé dépend de la **clé entière** (pas d’**anomalies de dépendance partielle** avec clé composée).
- **3FN**
  - Être en 2FN **et** :
  - Pas de **dépendances transitives** : un attribut non-clé ne dépend pas d’un autre attribut non-clé.
- **BCNF (forme normale de Boyce-Codd)**
  - Pour toute dépendance fonctionnelle X → Y, **X doit être une super-clé**.
- Objectif global :
  - Éviter la redondance.
  - Simplifier les **mises à jour**, les suppressions, les insertions.

**Exemple concret (anomalies et normalisation)**

Table `CommandeClient` non normalisée :

| NumCmd | DateCmd    | Client  | VilleClient | CodePostal | Produit   | Qte |
|--------|-----------|---------|-------------|-----------|----------|-----|
| 1      | 2025-01-10| Dupont  | Pau         | 64000     | Pomme    | 10  |
| 2      | 2025-01-11| Dupont  | Pau         | 64000     | Poire    | 5   |

- Redondance de `VilleClient` et `CodePostal` pour le même client.
- Si on corrige le code postal du client, il faut le corriger **sur toutes les lignes**.

Normalisation (3FN) :

- Table `Client(NumClient, Nom, Ville, CodePostal)`
- Table `Commande(NumCmd, DateCmd, NumClient)`
- Table `LigneCommande(NumCmd, Produit, Qte)`

SQL typique pour retrouver les lignes de commande avec le client :

```sql
SELECT c.Nom, co.NumCmd, lc.Produit, lc.Qte
FROM Client c
JOIN Commande co ON c.NumClient = co.NumClient
JOIN LigneCommande lc ON co.NumCmd = lc.NumCmd;
```

---

### 1.3 Les nouveaux besoins en systèmes d’information

- **Explosion du volume** : big data (données massives, hétérogènes, en temps réel).
- **Variété des données**
  - Données **semi-structurées** (JSON, XML).
  - Données **non structurées** (texte, images, logs, réseaux sociaux, capteurs…).
- **Vélocité**
  - Flux continus (IoT, clics web, streaming).
  - Besoin de **temps réel** ou quasi temps réel.
- **Scalabilité**
  - Besoin de monter en charge facilement (**scale-out** : ajouter des machines).
- **Évolution rapide du schéma**
  - Modèles métiers qui changent souvent → besoin de **schéma flexible**.

---

### 1.4 Limites des SGBD relationnels dans le monde du Big Data

- **Scalabilité verticale** (scale-up) : on grossit une seule machine (limité/coûteux).
- **Schéma rigide**
  - Toute évolution nécessite des migrations de schéma lourdes (`ALTER TABLE …`).
- **Coût des jointures**
  - Jointures complexes et coûteuses sur des **volumes énormes**.
- **Temps de réponse**
  - Difficile de garantir des temps de réponse très faibles pour :
    - Très grands volumes,
    - Très haut débit d’écriture/lecture.
- **Lien avec CAP**
  - En distribué, difficile de garder **forte cohérence** + **disponibilité** + **tolérance aux pannes** à la fois.
  - Les SGBDR classiques sont très **cohérents**, mais pas toujours adaptés au mode distribué massif.

---

### 1.5 Fondamentaux des bases de données non relationnelles (NoSQL)

- **Objectifs principaux**
  - Répondre aux besoins de **scalabilité**, **disponibilité**, **flexibilité** de schéma.
- **Caractéristiques générales**
  - **Schéma flexible** (schema-less ou schema-light).
  - **Distribution** native (données réparties sur plusieurs nœuds).
  - Modèles de données variés :
    - **clé–valeur**, **colonnes**, **documents**, **graphes**.
- **CAP / BASE**
  - Approche **BASE** :
    - **Basically Available** (fortement disponible),
    - **Soft state** (état intermédiaire possible),
    - **Eventual consistency** (cohérence **éventuelle**).
- **Compromis**
  - On sacrifie souvent un peu de **cohérence immédiate** pour :
    - De meilleures performances,
    - Une meilleure tolérance aux pannes.

---

## 2. Typologie des principaux SGBD non relationnels

### 2.1 Le modèle clé–valeur comme principe partagé

- Principe commun : accéder à une valeur via une **clé**.
- Très performant, simple, souvent **en mémoire** ou **distribué**.
- Exemple : Redis, Riak, Dynamo.

---

### 2.2 Les SGBD orientés colonnes

- Stockage par **colonnes** (familles de colonnes) et non par lignes.
- Avantages :
  - Très efficace pour les **agrégations** sur une colonne (analytique, data warehouse).
  - Très bonne **compression** (valeurs similaires par colonne).
- Exemples : Cassandra, HBase.
- Utilisation typique :
  - Séries temporelles, logs, indicateurs métriques.

---

### 2.3 Les SGBD orientés documents

- Stockent des **documents** (souvent JSON ou BSON) avec une structure imbriquée.
- Chaque document peut avoir des champs différents → **schéma flexible**.
- Possibilité d’**imbriquer** des sous-documents plutôt que de faire des jointures.
- Exemples : MongoDB, CouchDB.
- Utilisation typique :
  - Données applicatives, profils utilisateurs, contenus web, catalogues produits.

**Exemple JSON simple (profil utilisateur)**

```json
{
  "_id": "u123",
  "nom": "Dupont",
  "email": "dupont@example.com",
  "adresses": [
    { "type": "domicile", "ville": "Pau", "cp": "64000" },
    { "type": "travail", "ville": "Tarbes", "cp": "65000" }
  ]
}
```

---

### 2.4 Les SGBD orientés graphes

- Modèle : **nœuds** (entités) + **arêtes** (relations) + propriétés.
- Idéal pour :
  - Données très **relationnelles** : réseaux sociaux, recommandations, routes, etc.
- Avantage :
  - Parcours de graphes (voisins, chemins) **très efficaces**.
- Exemples : Neo4j, OrientDB, JanusGraph.

---

### 2.5 Synthèse et bilan

- **Clé–valeur** : très simple, ultra rapide, bon pour cache/session.
- **Colonnes** : analytique, séries temporelles, gros volumes en écriture.
- **Documents** : données semi-structurées, proche du modèle objet, souple.
- **Graphes** : relations complexes et fortement connectées.
- Message clé : on choisit le type de SGBD **selon le cas d’usage**.

---

## 3. Principes de mise en œuvre du SGBD MongoDB

### 3.1 Principes généraux de fonctionnement

- Organisation :
  - **Base de données** → **collections** → **documents**.
- Document :
  - Objet de type JSON/BSON, avec des champs et éventuellement des sous-documents/tableaux.
- Caractéristiques :
  - Schéma **souple** (les documents d’une même collection n’ont pas forcément les mêmes champs).
  - **Sharding** (partitionnement horizontal) pour la scalabilité.
  - **Replica set** pour la haute disponibilité (réplication de données).

---

### 3.2 Focus sur le format JSON et BSON

- **JSON** (JavaScript Object Notation) :
  - Format texte, humainement lisible.
  - Types simples : string, number, bool, null, objet, tableau.
- **BSON** (Binary JSON) :
  - Version binaire utilisée par MongoDB.
  - Permet des types supplémentaires :
    - Date, ObjectId, BinData, etc.
  - Plus efficace pour le stockage et la transmission.
- MongoDB **parle** BSON en interne, mais beaucoup d’interfaces montrent du JSON.

**Exemples JSON (types de base)**

```json
{ "nom": "Article A", "prix": 9.99, "disponible": true }
```

```json
{ "dateCommande": "2025-11-21T08:30:00Z", "lignes": ["l1", "l2"] }
```

---

### 3.3 Principes de modélisation d’une BD orientée documents

- Deux approches principales :
  - **Imbrication (embedding)** :
    - Mettre les données liées dans le **même document** (par ex. adresse dans un document utilisateur).
    - Avantage : lecture en une seule opération.
    - Inconvénient : peut grossir fortement un document.
  - **Références** :
    - Garder plusieurs collections et stocker des **id** (un peu comme des clés étrangères).
    - Avantage : **factorisation**, moins de duplication.
    - Inconvénient : nécessite souvent **plusieurs requêtes** ou `$lookup` pour tout récupérer.
- Règles générales :
  - Données souvent **consultées ensemble** → imbrication.
  - Données **partagées** par beaucoup d’entités → référence.

---

### 3.4 Opérations de base (CRUD) sur une BD orientée documents

- **Create**
  - `insertOne(document)` / `insertMany([...])`
- **Read**
  - `find(filter, projection)` : renvoie un curseur.
  - `findOne(filter)`
  - Filtres avec opérateurs : `$gt`, `$lt`, `$in`, `$or`, `$and`, etc.
- **Update**
  - `updateOne(filter, {$set: {...}})`
  - `updateMany(...)`
  - Opérateurs : `$set`, `$inc`, `$push`, `$pull`, etc.
- **Delete**
  - `deleteOne(filter)`
  - `deleteMany(filter)`

**Exemples concrets CRUD MongoDB (collection Articles)**

```js
// CREATE : insérer un article
db.Articles.insertOne({
  Ref: "K21",
  Descriptif: "Müesli complet (paquet)",
  PrixHT: 2.5,
  Categorie: "Epicerie",
  Tva: { LibelleTVA: "Réduit", TauxTVA: 5.0 }
});

// READ : trouver les articles d'épicerie
db.Articles.find({ Categorie: "Epicerie" });

// READ + projection : descriptif et prix seulement
db.Articles.find(
  { Categorie: "Epicerie" },
  { _id: 0, Descriptif: 1, PrixHT: 1 }
);

// UPDATE : augmenter le prix de 10% pour un article
db.Articles.updateOne(
  { Ref: "K21" },
  { $mul: { PrixHT: 1.10 } }
);

// DELETE : supprimer les articles sans stock
db.Articles.deleteMany({ QteStock: 0 });
```

---

## 4. Recherche avancée et agrégation des données avec MongoDB

### 4.1 Cas d’étude choisi pour la mise en œuvre de MongoDB

- Exemple typique vu en TD :
  - Base avec **articles**, **commandes**, **lignes de commande**, **clients**, etc.
- Objectifs :
  - Montrer comment **modéliser** ces données en documents.
  - Voir comment :
    - récupérer les commandes,
    - calculer des totaux,
    - grouper par catégorie ou taux de TVA.

---

### 4.2 Écriture de requêtes complexes avec MongoDB

- Utilisation d’opérateurs avancés :
  - Sur champs simples : `$regex`, `$exists`, `$type`, etc.
  - Sur tableaux : `$elemMatch`, index de tableau (`"Lignes.0"`), `$size`, etc.
- Utilisation de **`$expr`** :
  - Permet de mettre des **expressions** dans le filtre en utilisant la valeur de champs.
  - Exemple : comparer deux champs d’un même document.
- Combinaisons logiques :
  - `$and`, `$or`, `$nor`, `$not`.

---

### 4.3 Agrégation de données avec le pipeline MongoDB

- Le pipeline est une **suite d’étapes** (`stages`) appliquées à un flux de documents.
- Principales étapes :
  - `$match` : filtrer (comme un `WHERE`).
  - `$project` : sélectionner/recalculer des champs (comme un `SELECT` avec expressions).
  - `$group` : regrouper les documents par une clé `_id` (comme `GROUP BY`).
  - `$sort` : trier.
  - `$limit`, `$skip` : limiter / ignorer des résultats.
  - `$lookup` : pseudo-jointure entre collections.
  - `$unwind` : “exploser” un tableau en plusieurs documents.
- Exemple classique :
  - Filtrer des articles, calculer une moyenne/prix total, grouper par catégorie, trier les résultats.

**Exemple concret d’agrégation : prix moyen par catégorie**

```js
db.Articles.aggregate([
  { $match: { Categorie: { $ne: null } } },
  { $group: {
      _id: "$Categorie",
      prixMoyen: { $avg: "$PrixHT" },
      nbArticles: { $sum: 1 }
    }
  },
  { $sort: { prixMoyen: -1 } }
]);
```

**Exemple avec tableau + $unwind : total d’une commande**

Supposons une collection `Commandes` :

```json
{
  "NumCmd": 1101,
  "LignesDeCommande": [
    { "Ref": "K21", "Qte": 2, "PrixUnitaire": 2.5 },
    { "Ref": "P11", "Qte": 1, "PrixUnitaire": 3.42 }
  ]
}
```

Pipeline pour calculer le montant total de chaque commande :

```js
db.Commandes.aggregate([
  { $unwind: "$LignesDeCommande" },
  { $project: {
      NumCmd: 1,
      sousTotal: {
        $multiply: [
          "$LignesDeCommande.Qte",
          "$LignesDeCommande.PrixUnitaire"
        ]
      }
    }
  },
  { $group: {
      _id: "$NumCmd",
      montantTotal: { $sum: "$sousTotal" }
    }
  }
]);
```

---

### 4.4 Agrégation de données avec MapReduce

- Modèle inspiré du monde Hadoop.
- Deux fonctions principales :
  - **map** : transforme chaque document en une ou plusieurs paires `(clé, valeur)`.
  - **reduce** : regroupe les valeurs par clé pour produire un résultat agrégé.
- Utilisé historiquement pour certains calculs complexes, mais :
  - Moins mis en avant aujourd’hui.
  - Le pipeline d’agrégation est souvent préféré (plus expressif, performant).

---

### 4.5 Gestion des index

- Objectif : **accélérer** les recherches.
- Index simples ou composés :
  - Sur un champ (ex. `Descriptif`).
  - Sur plusieurs champs (ex. `{Categorie: 1, PrixHT: -1}`).
- Types :
  - Index **ascendant/descendant**.
  - **Unique**.
  - **Texte**.
  - **Géospatial** (2dsphere, 2d).
- Effets :
  - Améliore les performances de lecture.
  - Peut **coûter** en écriture (mise à jour des index).
  - Nécessite de bien choisir les champs à indexer.

---

### 4.6 "Mais aussi" (plein texte, SIG, programmation d’applications)

- **Requêtes plein texte**
  - Index texte sur un ou plusieurs champs.
  - Recherche par mots-clés, pertinence, score, etc.
- **Requêtes orientées SIG (géospatiales)**
  - Index géo (`2dsphere`) sur des points/polygones.
  - Requêtes type :
    - `$near`, `$geoWithin`, `$geoIntersects`.
- **Programmation d’applications**
  - Drivers MongoDB pour de nombreux langages (Node.js, Java, Python, etc.).
  - Intégration avec :
    - frameworks web,
    - microservices,
    - systèmes de streaming.