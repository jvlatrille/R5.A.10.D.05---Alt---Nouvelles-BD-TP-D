use("nodenot_bd1");

db.Articles.aggregate([
  {
    $lookup: {
      from: "Commandes",
      localField: "_id",
      foreignField: "LignesDeCommande.Article",
      as: "Apparitions"
    }
  },
  {
    $match: {
      "Apparitions": { $size: 0 } 
    }
  },
  {
    $project: {
      Reference: 1,
      Descriptif: 1,
      _id: 0
    }
  }
]);