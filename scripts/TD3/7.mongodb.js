use("nodenot_bd1");

db.Commandes.aggregate([
  {
    $match: { Numero: 1101 }
  },
  {
    $unwind: "$LignesDeCommande" 
  },
  {
    $lookup: {
      from: "Articles",
      localField: "LignesDeCommande.Article",
      foreignField: "_id",
      as: "InfoArticle"
    }
  },
  {
    $unwind: "$InfoArticle"
  },
  {
    $group: {
      _id: "$Numero",
      MontantTotal: { 
        $sum: { $multiply: ["$LignesDeCommande.Quantite", "$InfoArticle.PrixHT"] } 
      }
    }
  }
]);