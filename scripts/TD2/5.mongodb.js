use("nodenot_bd1");

db.Commandes.find({},
    {"mois" :
        {"$month":"$DateCommande"},
        "_id":0.0
    }
)