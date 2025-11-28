use("nodenot_bd1") ;

db.Commandes.find({ 
    "LignesDeCommande.3": { $exists: true } 
});