use("nodenot_bd1") ;


db.Articles.find({ Descriptif: { $regex: /^.{41,}$/ } })
   .forEach( article => {
       print(article.Descriptif + " (" + article.Descriptif.length + " caractères)");
   });