// Affichez pour chaque sportif concerné le nom et le prénom de son sportif conseiller.

use('nodenot_bd2');

db.Sportifs.aggregate([
    {
        $match: { IdSportifConseiller: { $exists: true } }
    },

    {
        $lookup: {
            from: "Sportifs",
            localField: "IdSportifConseiller",
            foreignField: "IdSportif",
            as: "InfoConseiller"
        }
    },

    {
        $unwind: "$InfoConseiller"
    },
    {
        $project: {
            _id: 0,
            NomSportif: "$Nom",
            PrenomSportif: "$Prenom",
            NomConseiller: "$InfoConseiller.Nom",
            PrenomConseiller: "$InfoConseiller.Prenom"
        }
    }
]);