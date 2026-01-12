// Calculez le nombre de gymnases de chaque ville.

use('nodenot_bd2');

db.Gymnases.aggregate([
    {
        $group: {
            _id: "$Ville",              // On regroupe par le nom de la ville
            NombreGymnases: { $sum: 1 } // Chaque gymnase est compté 1 fois
        }
    }
]);