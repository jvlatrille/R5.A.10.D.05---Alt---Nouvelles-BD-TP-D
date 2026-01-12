// Afficher la moyenne d’âge des entraineurs de sexe féminin pour la ville de STAINS.

use('nodenot_bd2');

db.Gymnases.aggregate([
    // On sélectionne uniquement les gymnases de STAINS
    { $match: { Ville: "STAINS" } },

    // On "déroule" les séances pour accéder aux IDs des entraîneurs
    { $unwind: "$Seances" },

    // On regroupe par ID d'entraîneur pour éviter les doublons 
    { $group: { _id: "$Seances.IdSportifEntraineur" } },

    // On fait la jointure avec la collection Sportifs pour récupérer l'âge et le sexe
    {
        $lookup: {
            from: "Sportifs",
            localField: "_id",
            foreignField: "IdSportif",
            as: "InfosSportif"
        }
    },

    // Le lookup renvoie un tableau, on le met à plat
    { $unwind: "$InfosSportif" },

    // On ne garde que les femmes (Sexe F ou f)
    { $match: { "InfosSportif.Sexe": { $regex: /^F/i } } },

    // On calcule la moyenne des âges
    {
        $group: {
            _id: null,
            MoyenneAge: { $avg: "$InfosSportif.Age" }
        }
    }
]);