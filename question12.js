// On sélectionne la base de données
db = db.getSiblingDB('bdEtu_jvlatrille');

// On crée un curseur qui contient tous les documents de la collection Articles en ne sélectionnant que les champs Reference et PrixHT
cursor = db.Articles.find({}, { Reference: 1, PrixHT: 1 });

// Tant qu'il reste un document dans le curseur
while (cursor.hasNext()) {
    // On récupère le document suivant et on l'affiche au format JSON
    printjson(cursor.next());
}
