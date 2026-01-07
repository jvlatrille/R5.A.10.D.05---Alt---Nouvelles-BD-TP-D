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
      _id:0,
      "LibelleTVA": "$_id",
      "nombre": "$nombre"
    }
  },
  { $sort: { "nombre": -1 } }
]);