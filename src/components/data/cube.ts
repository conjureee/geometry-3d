export const cubeData = {

    id: "cube",
    name: "Sześcian",

    description:
        "Sześcian to graniastosłup prawidłowy o sześciu ścianach kwadratowych.",

    properties: {
        "Liczba ścian": 6,
        "Liczba krawędzi": 12,
        "Liczba wierzchołków": 8
    },

    formulas: {
        "Objętość": "\\(V = a^3\\)",
        "Pole całkowite": "\\(P_c = 6a^2\\)",
        "Przekątna": "\\(D = a\\sqrt{3}\\)"
    },

    dimensions: {
        "Krawędź": "a"
    },

    curiosities: [
        "Sześcian ma 6 identycznych ścian (kwadratów), 12 krawędzi o tej samej długości i 8 wierzchołków.",
        "Kąt pomiędzy ścianami o wspólnej krawędzi wynosi dokładnie 90°.",
        "Sześcian jest bryłą platońską."
    ]

}