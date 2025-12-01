use("nodenot_bd1");

// On cherche les articles qui ne sont NI de la catégorie "Epicerie", NI de la catégorie "Boulangerie".

db.Articles.find({
    $nor: [
        { Categorie: "Epicerie" },
        { Categorie: "Boulangerie" }
    ]
})