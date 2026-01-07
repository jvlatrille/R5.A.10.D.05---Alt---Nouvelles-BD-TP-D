use("nodenot_bd1");

db.Articles.aggregate([
  {
    $match: { Descriptif: /paquet/ }
  },
  {
    $group: {
      _id: null,
      prixMoyen: { $avg: "$PrixHT" }
    }
  },
  { $project: { _id: 0, prixMoyen: 1 } }
]);