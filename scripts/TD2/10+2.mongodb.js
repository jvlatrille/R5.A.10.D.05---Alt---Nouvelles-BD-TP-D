use("nodenot_bd1");

// On cherche les articles contenant le mot "pain" (ou "Pain", "PAIN") dans le descriptif, peu importe les majuscules/minuscules.

db.Articles.find({
    Descriptif: { 
        $regex: "pain", 
        $options: 'i' // 'i' pour 'insensitive' (insensible aux majuscules/minuscules)
    }
})