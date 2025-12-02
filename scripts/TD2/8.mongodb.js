use("nodenot_bd1") ;

db.Commandes.find({ 
    $expr: { $gte: [{$size: "$LignesDeCommande"}, 4] }
}).count();