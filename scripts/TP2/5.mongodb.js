use('nodenot_bd2');

db.Sportifs.find({
        "Sports.Entrainer.0": { $exists: true },
        $or: [
            { "Sports.Arbitrer": { $exists: false } },
            { "Sports.Arbitrer": { $size: 0 } }
        ]
    }, { Nom: 1, Prenom: 1, _id: 0 });