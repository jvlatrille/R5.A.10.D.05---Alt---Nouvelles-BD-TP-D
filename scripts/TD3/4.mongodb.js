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
