use("nodenot_bd1");

db.getCollection("Articles").find(
    {
        "Categorie" : "Epicerie",
        $expr:{$gt:[{$multiply:["$CoutHT","$QteStock"]},40]}
    }).limit(3);