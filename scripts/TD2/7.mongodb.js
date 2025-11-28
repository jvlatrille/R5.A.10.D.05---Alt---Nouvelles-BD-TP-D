use("nodenot_bd1") ;

db.Commandes.aggregate([
    {
        // On récup les dates
        $project: {
            doc: "$$ROOT",
            mois: { $month: "$DateCommande" },
            jourSemaine: { $dayOfWeek: "$DateCommande" }
        }
    },
    {
        // On trie
        $match: {
            mois: 9,
            jourSemaine: 2 
        }
    }
]);