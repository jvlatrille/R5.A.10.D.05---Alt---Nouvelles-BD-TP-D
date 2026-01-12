// Donnez par jour d’ouverture les horaires des premières et dernières séances organisées dans chaque gymnase de STAINS.

use('nodenot_bd2');

db.Gymnases.aggregate([
    // On cible les gymnases de STAINS
    { $match: { Ville: "STAINS" } },

    // On décompose le tableau des séances
    { $unwind: "$Seances" },

    // On regroupe par Gymnase et par Jour
    {
        $group: {
            _id: {
                Gymnase: "$NomGymnase",
                Jour: "$Seances.Jour"
            },
            // On cherche l'heure de début la plus tôt et la plus tard
            PremiereSeance: { $min: "$Seances.Horaire" },
            DerniereSeance: { $max: "$Seances.Horaire" }
        }
    },

    // Un tri pour rendre le résultat lisible
    {
        $sort: { "_id.Gymnase": 1, "_id.Jour": 1 }
    },

    {
        $project: {
            _id: 0,
            Gymnase: "$_id.Gymnase",
            Jour: "$_id.Jour",
            Debut: "$PremiereSeance",
            Fin: "$DerniereSeance"
        }
    }
]);