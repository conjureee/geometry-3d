export const coneData = {

    id: "cone",
    name: "Stożek",

    description:
        "Stożek to bryła obrotowa powstająca przez obrót trójkąta prostokątnego wokół jednej z jego przyprostokątnych.",

    properties: {
        "Liczba podstaw": 1,
        "Powierzchnia krzywoliniowa": true
    },

    formulas: {
        "Objętość": "\\(V = \\frac{1}{3} \\pi r^2 h\\)",
        "Pole boczne": "\\(P_b = \\pi r l\\)",
        "Pole całkowite": "\\(P_c = \\pi r^2 + \\pi r l\\)"
    },

    dimensions: {
        "Promień": "r",
        "Wysokość": "h",
        "Tworząca": "l"
    },

    curiosities: [
        "Tworząca stożka nie jest tym samym co wysokość.",
        "Kąt przy wierzchołku przekroju osiowego stożka nazywa się kątem rozwarcia.",
        "Po odcięciu wierzchołka stożka otrzymujemy stożek ścięty."
    ]

}
