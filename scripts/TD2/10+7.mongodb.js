use("nodenot_bd1");

// On cherche les commandes qui ne contiennent exactement que 2 articles différents (le tableau LignesDeCommande a une taille de 2).

db.Commandes.find({
    LignesDeCommande: { $size: 2 }
})