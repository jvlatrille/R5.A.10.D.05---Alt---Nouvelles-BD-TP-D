use("nodenot_bd1");

db.Articles.aggregate([
  {
    $match: {
      Categorie: "Epicerie",
      PrixHT: { $gte: 2.0, $lte: 5.0 }
    }
  },
  {
    $group: {
      _id: null,
      prixMax: { $max: "$PrixHT" },
      prixMin: { $min: "$PrixHT" },
      prixMoyen: { $avg: "$PrixHT" }
    }
  }
]);