use('nodenot_bd2');

db.Gymnases.find({
    Ville: "STAINS",
    Seances: {
        $elemMatch: {
            Jour: { $regex: /^dimanche$/i }, // Contient "dimanche" 
            Libelle: { $regex: /ball/i }     // Contient "ball"
        }
    }
}, { NomGymnase: 1, Ville: 1, "Seances.$": 1 });