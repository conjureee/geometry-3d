export const sphereData = {

    id: "sphere",
    name: "Kula",

    description:
        "Kula to bryła obrotowa powstająca przez obrót półokręgu wokół jego średnicy.",

    properties: {
        "Powierzchnia": "Krzywoliniowa (Niepłaska)",
        "Liczba krawędzi": 0,
        "Liczba wierzchołków": 0
    },

    formulas: {
        "Objętość": "\\(V = \\frac{4}{3}\\pi r^3\\)",
        "Pole powierzchni": "\\(P = 4\\pi r^2\\)"
    },

    dimensions: {
        "Promień": "r"
    },

    curiosities: [
        "Przekrój kuli dowolną płaszczyzną jest kołem.",
        "Powierzchnia kuli nazywana jest sferą.",
        "Średnica kuli jest największą możliwą cięciwą kuli."
    ]

}
