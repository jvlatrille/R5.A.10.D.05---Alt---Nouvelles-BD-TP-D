use("nodenot_bd1");

db.Articles.aggregate([
  {
    $match: {
      Descriptif: { $regex: "paquet", $options: "i" }
    }
  },
  {
    $group: {
      _id: null,
      prixMoyen: { $avg: "$PrixHT" }
    }
  }
]);