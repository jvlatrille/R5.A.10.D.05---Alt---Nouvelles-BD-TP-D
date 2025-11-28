use("nodenot_bd1");

db.Articles.aggregate([
    { 
        // D'abord épiceries
        $match: { Categorie: "Epicerie" } }, 
    {
        // On récup (récup) la valorisation 
        $project: {
            Reference: 1,
            Descriptif: 1,
            Valorisation: { $multiply: ["$CoutHT", "$QteStock"] }
        }
    },
    { 
        // On fait le match avec le résultat de la valorisation
        $match: { Valorisation: { $gt: 40 } } },
    { 
        // On en affiche 3
        $limit: 3 }
]);