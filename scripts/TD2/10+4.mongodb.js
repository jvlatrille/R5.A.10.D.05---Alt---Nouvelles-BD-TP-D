use("nodenot_bd1");

// On cherche les articles où la marge est faible : le Prix de Vente (PrixHT) est inférieur à 1.1 fois le Coût (CoutHT) (donc moins de 10% de marge).

db.Articles.find({
    $where: "this.PrixHT < (this.CoutHT * 1.1)"
})