// Affichez par id d’entraineur le nombre de séances journalières de Handball qu’il assure.

use('nodenot_bd2');

db.Gymnases.aggregate([
    {
        $unwind: "$Seances" // On décompose le tableau des séances
    },
    {
        $match: {
            "Seances.Libelle": { $regex: /^Hand ?ball$/i } // On récupére les séances de handball
        }
    },
    {
        $group: {
            _id: "$Seances.IdSportifEntraineur", // Par id d'entraineur
            NombreSeances: { $sum: 1 }
        }
    }
]);