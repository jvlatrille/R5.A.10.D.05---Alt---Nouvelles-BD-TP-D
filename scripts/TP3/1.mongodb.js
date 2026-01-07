use("nodenot_bd1");

db.Articles.aggregate([
  {
    // Équivalent du GROUP BY TVA.LibelleTVA
    $group: {
      _id: "$Tva.LibelleTVA",
      nombre: { $sum: 1 } // Équivalent du Count(Article.Reference)
    }
  },
  {
    // Équivalent du ORDER BY Count() desc
    $sort: { nombre: -1 }
  }
]);