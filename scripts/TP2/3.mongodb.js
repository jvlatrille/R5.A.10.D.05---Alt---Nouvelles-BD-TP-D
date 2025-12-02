use('nodenot_bd2');

db.Sportifs.find({
    // Un tableau doit avec tout les sports
    "Sports.Jouer": { 
        $all: [ "Tennis", "Football", "Volley ball" ] 
    },
    // On retire le champs conseiller
    IdSportifConseiller: { $exists: false }
}).count();