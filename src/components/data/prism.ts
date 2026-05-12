export const prismData = {

    id: "prism",
    name: "Graniastosłup",

    description:
        "Graniastosłup to wielościan, który ma dwie równoległe i przystające podstawy oraz ściany boczne będące równoległobokami.",

    properties: {
        "Liczba ścian": "n + 2",
        "Liczba krawędzi": "3n",
        "Liczba wierzchołków": "2n"
    },

    formulas: {
        "Objętość": "\\(V = P_p H\\)",
        "Pole boczne": "\\(P_b = n a H\\)",
        "Pole całkowite": "\\(P_c = 2P_p + n a H\\)"
    },

    dimensions: {
        "Bok podstawy": "a",
        "Liczba boków podstawy": "n",
        "Pole podstawy": "P_p",
        "Wysokość": "H"
    },

    curiosities: [
        "Jeśli podstawą graniastosłupa jest wielokąt foremny, to graniastosłup jest prawidłowy.",
        "W graniastosłupie prostym ściany boczne są prostokątami.",
        "Przekrój równoległy do podstawy jest figurą przystającą do podstawy."
    ]

}
