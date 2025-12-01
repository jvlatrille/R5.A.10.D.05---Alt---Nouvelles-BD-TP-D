use("nodenot_bd1");

// On cherche les articles :
//      Soit de catégorie "Epicerie" avec un stock < 5
//      Soit n'importe quelle catégorie mais avec un prix > 50 C'est une logique mixte.

db.Articles.find({
    $or: [
        { Categorie: "Epicerie", QteStock: { $lt: 5 } }, // Condition A
        { PrixHT: { $gt: 50 } }                          // Condition B
    ]
})