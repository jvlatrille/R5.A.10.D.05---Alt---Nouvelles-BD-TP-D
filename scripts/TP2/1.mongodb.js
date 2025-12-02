use('nodenot_bd2');

db.Sportifs.find(
    { Age: { $gt: 35, $lt: 45 } },
    { IdSportif: 1, Nom: 1, Prenom: 1, _id: 0 }
);

db.Sportifs.find(
    { 
        $and: [
            { Age: { $gte: 35 } },
            { Age: { $lte: 45 } }
        ]
    },
    { IdSportif: 1, Nom: 1, Prenom: 1, _id: 0 }
);