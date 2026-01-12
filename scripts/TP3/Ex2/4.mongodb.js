// Affichez le nom des entraineurs de la ville de STAINS.

use('nodenot_bd2');

db.Gymnases.aggregate([
    // On sélectionne les gymnases de STAINS
    { $match: { Ville: "STAINS" } },

    // On sépare les séances pour avoir une ligne par séance
    { $unwind: "$Seances" },

    // On récupère les IDs uniques des entraineurs
    {
        $group: {
            _id: "$Seances.IdSportifEntraineur",
            // AJOUT OBLIGATOIRE ICI : On sauvegarde la ville pour l'étape d'après
            Ville: { $first: "$Ville" }
        }
    },

    // On fait la jointure avec la collection Sportifs pour avoir les noms
    {
        $lookup: {
            from: "Sportifs",
            localField: "_id",
            foreignField: "IdSportif",
            as: "InfosEntraineur"
        }
    },

    { $unwind: "$InfosEntraineur" },
    {
        $project: {
            _id: 0,
            Nom: "$InfosEntraineur.Nom",
            Prenom: "$InfosEntraineur.Prenom",
            Ville: 1
        }
    }
]);