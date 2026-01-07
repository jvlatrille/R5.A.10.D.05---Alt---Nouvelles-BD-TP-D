use("nodenot_bd1");

db.getCollection("Articles").aggregate([
  {
    $group: {
      _id: "$Tva.LibelleTVA",
      "nombre": { $sum: 1 }
    }
  },
  {
    $project: {
      "LibelleTVA": "$_id",
      "nombre": "$nombre"
    }
  },
  { $sort: { "nombre": -1 } }
]);