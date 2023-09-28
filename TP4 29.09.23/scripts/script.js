let mainContentDiv;
let chartCanvas;

window.addEventListener("DOMContentLoaded", init);


function init() {

    mainContentDiv = document.getElementById("mainContentDivId");
    chartCanvas = document.createElement("canvas");
    chartCanvas.setAttribute("id", "chartCanvasId");
    mainContentDiv.appendChild(chartCanvas);

    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}