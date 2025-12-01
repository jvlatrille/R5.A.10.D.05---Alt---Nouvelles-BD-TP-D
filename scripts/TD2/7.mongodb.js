use("nodenot_bd1") ;

let mois = {$month: "$DateCommande"};
let jour = {$dayOfWeek: "$DateCommande"};

db.getCollection("Commandes").find({
    $and: [
        {expr: {$eq: [mois, 9]}},
        {expr: {$in: [jour, 2]}}
    ]
});