export const cuboidData = {

    id: "cuboid",
    name: "Prostopadłościan",

    description:
        "Prostopadłościan to graniastosłup prosty, którego wszystkie sześć ścian jest prostokątami.",

    properties: {
        "Liczba ścian": 6,
        "Liczba krawędzi": 12,
        "Liczba wierzchołków": 8
    },

    formulas: {
        "Objętość": "\\(V = a b c\\)",
        "Pole całkowite": "\\(P_c = 2(ab + bc + ac)\\)",
        "Przekątna": "\\(D = \\sqrt{a^2 + b^2 + c^2}\\)"
    },

    dimensions: {
        "Długość": "a",
        "Szerokość": "b",
        "Wysokość": "h"
    },

    curiosities: [
        "Każdy prostopadłościan posiada 6 ścian, 8 wierzchołków oraz 12 krawędzi.",
        "Przekątne prostopadłościanu mają taką samą długość i przecinają się w środku bryły.",
        "Ściany prostopadłościanu są parami równoległe i prostopadłe."
    ]

}
