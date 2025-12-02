use('nodenot_bd2');

db.Sportifs.find({
    $or: [
        { "Sports.Jouer": "Badmington" },
        { "Sports.Jouer": "Football" }
    ]
}).count();