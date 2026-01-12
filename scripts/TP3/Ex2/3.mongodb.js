// Ajoutez à chaque document de la collection Gymnases une clé contenant la liste 
// des sports pour lesquels des séances d’entrainement sont proposées. A cette fin, 
// cherchez sur Internet de l’information sur les opérateurs MongoDB qui permettent 
// d’ajouter un élément à un tableau, puis utilisez le bon opérateur.


use("nodenot_bd2");

db.Gymnases.aggregate([
    {
        $addFields: {
            "SportsProposes": {
                $setUnion: ["$Seances.Libelle", []]
            }
        }
    },
    {
        $out: { db: "bdEtu_jvlatrille", coll: "Gymnases" }
    }
]);
