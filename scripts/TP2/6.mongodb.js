use('nodenot_bd2');

db.Gymnases.find({
    $and: [
        { OrigineNom: { $regex: /^P/ } }, // Commence par P
        { OrigineNom: { $regex: /écrivain/i } }  // Contient "écrivain"
    ]
}, { NomGymnase: 1, Ville: 1, OrigineNom: 1 });