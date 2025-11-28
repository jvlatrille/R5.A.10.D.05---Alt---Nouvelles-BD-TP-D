use("nodenot_bd1") ;

db.Commandes.aggregate([
    {
        $project: {
            doc: "$$ROOT",
            mois: { $month: "$DateCommande" },
            jourSemaine: { $dayOfWeek: "$DateCommande" }
        }
    },
    {
        $match: {
            mois: 9,
            jourSemaine: 2 
        }
    }
]);