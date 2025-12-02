use('nodenot_bd2');

db.Sportifs.find({
    "Sports.Jouer": { $size: 5 }},
    { Nom: 1, "Sports.Jouer": 1 
})
