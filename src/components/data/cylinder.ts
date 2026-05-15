export const cylinderData = {

    id: "cylinder",
    name: "Walec",

    description:
        "Walec to bryła obrotowa powstała przez obrót prostokąta wokół jednego z jego boków.",

    properties: {
        "Liczba podstaw": 2,
        "Powierzchnia boczna": "Krzywoliniowa (Niepłaska)",
    },

    formulas: {
        "Objętość": "\\(V = \\pi r^2 h\\)",
        "Pole boczne": "\\(P_b = 2\\pi r h\\)",
        "Pole całkowite": "\\(P_c = 2\\pi r^2 + 2\\pi r h\\)"
    },

    dimensions: {
        "Promień": "r",
        "Wysokość": "h"
    },

    curiosities: [
        "Walec powstaje przez obrót prostokąta wokół jednego z jego boków o 360°.",
        "Walec ma dwie takie same podstawy w kształcie koła oraz jedną powierzchnię boczną, która po rozcięciu tworzy prostokąt.",
        "Jeśli podstawą walca jest elipsa, bryłę nazywamy walcem eliptycznym."
    ]

}
