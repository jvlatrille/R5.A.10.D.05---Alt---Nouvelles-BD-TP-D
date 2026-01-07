use("nodenot_bd1");

db.Commandes.aggregate([
  { $unwind: "$LignesDeCommande" },
  {
    $group: {
      _id: "$LignesDeCommande.Article",
      NbFoisCommande: { $sum: 1 },
      TotalQuantite: { $sum: "$LignesDeCommande.Quantite" }
    }
  },
  {
    $lookup: {
      from: "Articles",
      localField: "_id",
      foreignField: "_id",
      as: "Details"
    }
  },
  { $unwind: "$Details" },
  {
    $project: {
      _id: 0,
      Reference: "$Details.Reference",
      Descriptif: "$Details.Descriptif",
      NbFoisCommande: 1,
      TotalQuantite: 1
    }
  }
]);