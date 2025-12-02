use('nodenot_bd2');

db.Gymnases.find(
    { Ville: "STAINS" },
    { Seances: { $slice: -1 } }
)