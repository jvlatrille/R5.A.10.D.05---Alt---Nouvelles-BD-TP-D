use('nodenot_bd2');

db.Sportifs.find({
    Age: { $lt: 30 },
    "Sports.Jouer.0": "Basket ball" 
}, { Nom: 1, Prenom: 1, Age: 1, "Sports.Jouer": 1 });