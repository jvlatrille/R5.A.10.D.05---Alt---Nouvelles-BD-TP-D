use("nodenot_bd1");

// On cherche les commandes qui ont au moins une ligne de commande avec une quantité strictement supérieure à 50.

db.Commandes.find({
    LignesDeCommande: { 
        $elemMatch: { Quantite: { $gt: 50 } } 
    }
})