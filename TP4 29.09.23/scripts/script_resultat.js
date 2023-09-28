//import { prénomsRares22Depuis2000 } from "../data/Dpt22depuis2000nouv.js";

let mainContentDiv;
let chartCanvas;
const maleNames = Array();
const femalNames = Array();
let topFiveMaleArray;
let topFiveFemaleArray;


/*

DONNER A RECUPERER ET A TRAIER

GENRE : 1 MALE
ANNEE : 2000 -> 2021

TODO :

Recuperer tous les prénoms d'hommes, puis en faire un top 5, puis stocker le nombre de naissance
qu'il y a eu tous les ans pour ces 5 prénoms et afficher sur le charts

*/

window.addEventListener("DOMContentLoaded", init);
const labelsDepuis2000 = [];

function init() {
    mainContentDiv = document.getElementById("mainContentDivId");

    createArray(); //créer le tableau avec toutes les années
    calculateRareName(); //calculer les 5 prénoms les plus populaire chez les hommes depuis 2000
    createChart(); //créer le chart selon les valeurs calculées

};

function createArray() {
    for (let i = 2000; i <= 2024; i++) {
        labelsDepuis2000.push(i)
    };
    console.log(labelsDepuis2000);
};


const prénomsRares22Depuis2000 = [{
        "genre": 1,
        "département": 22,
        "nombre": 4,
        "année": 2006,
        "prénom": "AARON"
    },
    {
        "genre": 1,
        "département": 22,
        "nombre": 12,
        "année": 2007,
        "prénom": "AARON"
    },
    {
        "genre": 1,
        "département": 22,
        "nombre": 18,
        "année": 2008,
        "prénom": "AARON"
    }
]


/*

Explication de la fonction 

Cette fonction loadData semble être écrite en JavaScript et semble traiter des données de prénoms rares depuis l'année 2000. Voici une explication détaillée de ce que fait cette fonction :

    Elle commence par filtrer un tableau prénomsRares22Depuis2000 pour ne conserver que les éléments où la propriété genre a une valeur de 1 (ce qui suggère que ce sont des prénoms masculins rares).

    Ensuite, elle utilise la méthode .forEach() pour parcourir chaque élément du tableau résultant du filtre. La fonction de rappel fournie à .forEach() prend trois arguments : item (l'élément actuel du tableau), index (l'indice de l'élément actuel), et arr (le tableau complet).

    À l'intérieur de la boucle .forEach(), la fonction cherche un prénom masculin correspondant dans un autre tableau appelé maleNames. Pour cela, elle utilise la méthode .findIndex() pour trouver l'indice d'un élément du tableau maleNames où la propriété prénom correspond au prénom de l'élément actuel de prénomsRares22Depuis2000.

    Si un prénom masculin correspondant est trouvé dans maleNames (c'est-à-dire si id est supérieur à -1), la fonction met à jour les données de ce prénom masculin en augmentant son total et en ajoutant une entrée dans le tableau répartition.

    Si le prénom masculin n'est pas trouvé dans maleNames (c'est-à-dire si id est -1), la fonction ajoute un nouvel objet avec le prénom, le total et une entrée dans le tableau répartition au tableau maleNames.

    Après avoir traité tous les éléments de prénomsRares22Depuis2000, la fonction trie le tableau maleNames en fonction de la propriété total de chaque objet, du plus petit total au plus grand.

    Enfin, la fonction affiche les cinq prénoms masculins les plus populaires (ceux avec les totaux les plus élevés) à l'aide d'une boucle for.

En résumé, cette fonction prend une liste de prénoms rares masculins depuis l'année 2000, agrège les données en calculant le total des occurrences de chaque prénom masculin, et affiche les cinq prénoms masculins les plus populaires avec leurs totaux correspondants.
*/

function calculateRareName() {
    prénomsRares22Depuis2000.filter(function(item) {
            return (item.genre === 1)
        })
        .forEach(function(item, index, arr) {
            let id = maleNames.findIndex(function(elt) { return elt.prénom === item.prénom });
            if (id > -1) {
                maleNames[id].total += item.nombre;
                maleNames[id].répartition.push({ "année": item.année, "nombre": item.nombre });
            } else {
                maleNames.push({ "prénom": item.prénom, "total": item.nombre, "répartition": [{ "année": item.année, "nombre": item.nombre }] });
            }
        })


    maleNames.sort(function(a, b) {
        return (a.total - b.total);
    })

    console.log("Top Five Male : ")
    const length = maleNames.length
    for (let i = 1; i < 6; i++) {
        console.log(maleNames[length - i].prénom + " : " + maleNames[length - i].total)
    }
};

//DO THE MATH AND VOILA

function createChart() {
    chartCanvas = document.createElement("canvas");
    chartCanvas.setAttribute("id", "chartCanvasId");
    mainContentDiv.appendChild(chartCanvas);

    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: labelsDepuis2000,
            datasets: [{
                label: 'topOneName',
                backgroundColor: "#F55D3E",
                data: [12, 59, 5, 56, 58, 12, 59, 87, 45],
            }, {
                label: 'topTwoName',
                backgroundColor: "#878E88",
                data: [12, 59, 5, 56, 58, 12, 59, 85, 23],
            }, {
                label: 'topThreeName',
                backgroundColor: "#F7CB15",
                data: [12, 59, 5, 56, 58, 12, 59, 65, 51],
            }, {
                label: 'topFourName',
                backgroundColor: "#76BED0",
                data: [12, 59, 5, 56, 58, 12, 59, 12, 74],
            }, {
                label: 'topFiveName',
                backgroundColor: "#87C38F",
                data: [12, 59, 5, 56, 58, 12, 59, 12, 74],
            }],
        },
        options: {
            tooltips: {
                displayColors: true,
                callbacks: {
                    mode: 'x',
                },
            },
            scales: {
                x: {
                    stacked: true,
                    gridLines: {
                        display: false,
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                    },
                    type: 'linear',
                }
            },
            responsive: true,
            maintainAspectRatio: true,
        }
    });

}

/* SOURCES
- https: //stackoverflow.com/questions/72664130/chartjs-invalid-scale-configuration-for-scale-xaxes
- https: //www.chartjs.org/docs/3.9.1/getting-started/v3-migration.html#_3-x-migration-guide
- https://www.geeksforgeeks.org/how-to-implement-stacked-bar-chart-using-chartjs/
- https://www.chartjs.org/docs/latest/samples/bar/stacked-groups.html
*/