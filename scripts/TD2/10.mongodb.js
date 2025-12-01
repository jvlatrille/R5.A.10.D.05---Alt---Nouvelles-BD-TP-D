use("nodenot_bd1");

db.Articles.find({ 
    Categorie: "Epicerie",
    $where: "this.CoutHT * this.QteStock > 40"
}).limit(3);