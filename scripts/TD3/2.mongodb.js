use("nodenot_bd1") ;

db.getCollection("Articles").aggregate([
  {
    $match: { "Tva.TauxTVA": { $gt: 0.5 } }
  },
  {
    $group: {
      _id: "$Tva.LibelleTVA",
      nombre: { $sum: 1 }
    }
  },
  {
    $project: {
      LibelleTVA: "$_id",
      nombre: "$nombre"
    }
  },
  { $sort: { "nombre": -1 } }
]);