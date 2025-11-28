use("nodenot_bd1") ;
// Q9
db.Articles.aggregate([
    {
        // On récupére les longueurs des descriptions 
        $project: {
            Descriptif: 1,
            NbCaracteres: { $strLenCP: "$Descriptif" }
        }
    },
    {
        $match: {
            NbCaracteres: { $gt: 40 }
        }
    }
]);