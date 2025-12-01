use("nodenot_bd1");

// On cherche les articles qui ont un champ Tva (il existe), mais dont le libellé TVA n'est pas "Réduit".

db.Articles.find({
    Tva: { $exists: true },
    "Tva.LibelleTVA": { $ne: "Réduit" } // $ne = Not Equal
})