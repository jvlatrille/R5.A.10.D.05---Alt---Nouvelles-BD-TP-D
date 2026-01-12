// Ajoutez à chaque document de la collection Gymnases une clé contenant la liste 
// des sports pour lesquels des séances d’entrainement sont proposées. A cette fin, 
// cherchez sur Internet de l’information sur les opérateurs MongoDB qui permettent 
// d’ajouter un élément à un tableau, puis utilisez le bon opérateur.

use("nodenot_bd2");

// On parcourt chaque gymnase un par un
db.Gymnases.find().forEach(function (gym) {

    // Si le gymnase a des séances
    if (gym.Seances) {

        // On prépare la liste des sports (ex: ["Basket ball", "Volley ball"])
        var lesSports = gym.Seances.map(function (s) { return s.Libelle; });

        // On met à jour CE gymnase précis
        db.Gymnases.update(
            { _id: gym._id }, // On cible le gymnase par son ID
            {
                $addToSet: { // $addToSet ajoute les éléments SANS doublons
                    SportsProposes: { $each: lesSports } // $each permet d'ajouter toute la liste d'un coup
                }
            }
        );
    }
});