use("nodenot_bd1");

db.Articles.aggregate([
  {
    $match: { "Tva.TauxTVA": { $gt: 0.05 } }
  },
  {
    $group: {
      _id: "$Tva.LibelleTVA",
      nombre: { $sum: 1 }
    }
  },
  { $sort: { nombre: -1 } }
]);