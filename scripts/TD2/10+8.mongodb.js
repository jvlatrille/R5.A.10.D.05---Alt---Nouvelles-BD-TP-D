use("nodenot_bd1");

// On cherche les articles dont la quantité en stock est un multiple de 10 (10, 20, 30...).

db.Articles.find({
    QteStock: { $mod: [10, 0] }
})