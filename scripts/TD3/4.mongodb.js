use("nodenot_bd1");

db.Articles.aggregate([
  {
    $project: {
      Descriptif: 1,
      PrixHT: 1,
      TTC: {
        $round: [
          { $multiply: ["$PrixHT", { $add: [1, { $divide: ["$Tva.Taux", 100] }] }] },
          2
        ]
      }
    }
  }
]);


db.Articles.aggregate([
  {
    "$set": {
      "Tarif_TTC": {
        "$multiply": [
          "$PrixHT",
          { "$add": ["$Tva.TauxTVA", 1] }
        ]
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "Descriptif": 1,
      "PrixHT": 1,
      "Tva": 1,
      "Tarif_TTC": 1
    }
  }
]);