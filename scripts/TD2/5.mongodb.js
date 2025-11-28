use("nodenot_bd1") ;

db.Commandes.aggregate([
    { 
        $project: { 
            _id: 0,
            Mois: { $month: "$DateCommande" }
        } 
    }
]);