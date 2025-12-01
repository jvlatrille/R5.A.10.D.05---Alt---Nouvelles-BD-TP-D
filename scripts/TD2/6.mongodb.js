use("nodenot_bd1") ;

db.Commandes.find({"$and" : [
    {
        "DateCommande" : {
            "$gte" : ISODate("2007-09-14T00:00:00.000+0000")
        }
    },
    {
        "DateCommande" : {
            "$lt" : ISODate("2007-09-15T00:00:00.000+0000")
        }
    }
]})