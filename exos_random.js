const Personnes = [
    {
        name: "Tom Hanks",
        born: new Date("1956-07-09"),
        status: ["actor"],
        acted_in: [
            {
                movie: { title: "Cloud Atlas", released: 2012 },
            }
        ],
    },
    {
        name: "Hugo Weaving",
        born: new Date("1960-04-04"),
        status: ["actor"],
        acted_in: [
            {
                movie: { title: "The Matrix", released: 1999 },
            }
        ],
    },
    {
        name: "Lana Wachowski",
        born: new Date("1965-06-21"),
        status: ["director", "writer"],
        acted_in: [
            {
                movie: { title: "The Matrix", released: 1999 },
            },
            {
                movie: { title: "Cloud Atlas", released: 2012 },
            }
        ],
    }
];
