use("nodenot_bd1") ;
// Q9
db.Articles.aggregate([
    {
        $project: {
            Descriptif: 1,
            NbCaracteres: { $strLenCP: "$Descriptif" } // Récupére la longueur
        }
    },
    {
        $match: {
            NbCaracteres: { $gt: 40 }
        }
    }
]);