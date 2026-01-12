// Affichez pour chaque sportif concerné le nom et le prénom de son sportif conseiller.

use('nodenot_bd2');

db.Sportifs.find({ IdSportifConseiller: { $exists: true } }).forEach(function (sportif) {

    // Pour chaque sportif, on cherche son conseiller (findOne renvoie un seul document)
    var conseiller = db.Sportifs.findOne({ IdSportif: sportif.IdSportifConseiller });

    // Si on a trouvé le conseiller, on affiche les deux noms
    if (conseiller) {
        print("Sportif : " + sportif.Nom + " " + sportif.Prenom +
            " | Conseiller : " + conseiller.Nom + " " + conseiller.Prenom);
    }
});