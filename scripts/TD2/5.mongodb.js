use("nodenot_bd1") ;

db.Commandes.find({}, { DateCommande: 1, _id: 0 }).forEach( doc => {
    // getMonth() renvoie 0 pour Janvier, donc on fait +1
    print("Mois : " + (doc.DateCommande.getMonth() + 1));
});