export const pyramidData = {

    id: "pyramid",
    name: "Ostrosłup",

    description:
        "Ostrosłup to wielościan mający jedną podstawę oraz ściany boczne w kształcie trójkątów zbiegających się w jednym wierzchołku.",

    properties: {
        "Liczba podstaw": 1,
        "Powierzchnia krzywoliniowa": false
    },

    formulas: {
        "Objętość": "\\(V = \\frac{1}{3} P_p H\\)",
        "Pole całkowite": "\\(P_c = P_p + P_b\\)"
    },

    dimensions: {
        "Pole podstawy": "P_p",
        "Pole boczne": "P_b",
        "Wysokość": "H"
    },

    curiosities: [
        "Ostrosłup ma tylko jedną podstawę, a wszystkie ściany boczne są trójkątami.",
        "W ostrosłupie prawidłowym podstawą jest wielokąt foremny.",
        "Wysokość ostrosłupa opuszczona jest na środek okręgu wpisanego w podstawę."
    ]

}
