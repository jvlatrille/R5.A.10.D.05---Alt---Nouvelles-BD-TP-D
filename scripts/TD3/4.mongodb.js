use("nodenot_bd1");

db.Articles.aggregate([
  {
    "$set": {
      "Tarif_TTC": {
        "$round": [
          {
            "$multiply": [
              "$PrixHT",
              { "$add": ["$Tva.TauxTVA", 1] }
            ]
          },
          2
        ]
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "Descriptif": 1,
      "PrixHT": 1,
      "Tarif_TTC": 1
    }
  }
]);