export const tetrahedronData = {

    id: "tetrahedron",
    name: "Czworościan",

    description:
        "Czworościan to wielościan o czterech trójkątnych ścianach, czyli najprostszy ostrosłup.",

    properties: {
        "Liczba ścian": 4,
        "Liczba krawędzi": 6,
        "Liczba wierzchołków": 4
    },

    formulas: {
        "Objętość": "\\(V = \\frac{a^3 \\sqrt{2}}{12}\\)",
        "Wysokość": "\\(H = \\frac{a\\sqrt{6}}{3}\\)",
        "Pole całkowite": "\\(P_c = a^2 \\sqrt{3}\\)"
    },

    dimensions: {
        "Krawędź": "a"
    },

    curiosities: [
        "Czworościan ma najmniejszą liczbę ścian spośród wszystkich wielościanów foremnych.",
        "Wszystkie ściany, krawędzie i kąty są identyczne.",
        "Łącząc środki ścian czworościanu, otrzymujemy mniejszy czworościan."
    ]

}
