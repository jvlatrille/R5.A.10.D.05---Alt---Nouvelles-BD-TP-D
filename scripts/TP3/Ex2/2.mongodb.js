// Affichez par id d’entraineur le nombre de séances journalières de Handball qu’il assure.

use('nodenot_bd2');

db.Gymnases.aggregate([
    {
        $unwind: "$Seances"
    },
    {
        $match: {
            "Seances.Libelle": { $regex: /^Hand ?ball$/i }
        }
    },
    {
        $group: {
            _id: {
                Entraineur: "$Seances.IdSportifEntraineur",
                Jour: "$Seances.Jour"
            },
            NombreSeances: { $sum: 1 }
        }
    },
]);