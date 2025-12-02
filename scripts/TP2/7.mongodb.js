use('nodenot_bd2');

db.Gymnases.find({
    "Seances.IdSportifEntraineur": 149
}).count();