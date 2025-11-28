use("nodenot_bd1") ;

db.Commandes.find({
    DateCommande: {
        $gte: ISODate("2007-09-14T00:00:00Z"),
        $lt: ISODate("2007-09-15T00:00:00Z")
    }
});