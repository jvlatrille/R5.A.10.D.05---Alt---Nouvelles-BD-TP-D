use("nodenot_bd1");

// On cherche les articles qui appartiennent à une catégorie faisant partie d'une liste précise (ex: soit "Céréales", soit "Boissons").

db.Articles.find({
    Categorie: { $in: ["Céréales", "Boissons"] }
})