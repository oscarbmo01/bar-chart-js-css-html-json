// generate random values and modify the bar chart, triggered by a click event
function updateRandomBarChart() {
    let elementDivBarChart = document.getElementsByClassName('div-bar-chart');
    for (let i = 0; i < elementDivBarChart.length; i++) {
        const minutesOfStudy = Math.floor(Math.random() * 301);
        const minutesOfStudyInPixels = Math.round(minutesOfStudy*(50/60));
        const red = Math.floor(Math.random() * 255).toString(16);
        const green = Math.floor(Math.random() * 255).toString(16);
        const blue = Math.floor(Math.random() * 255).toString(16);
        const colorHex = `#${red}${green}${blue}`;
        updateElementBarChart(elementDivBarChart[i], minutesOfStudyInPixels, minutesOfStudy, colorHex)
    }
};

// update bar chart with values in json format, triggered by submit event
function updateBarChartJson(event) {
    event.preventDefault(); // method cancels, to the event will not occur
    const textAreaPayload = document.getElementById('textarea-payload').value;
    let payload = null;
    try {
        payload = JSON.parse(textAreaPayload);
    } catch (error) {
        alert("JSON format not accepted!");
        return false;
    }

    let i = 0;
    for(let element in payload) {
        let elementDivBarChart = document.getElementsByClassName('div-bar-chart')[i];
        const minutesOfStudy = payload[element].value;
        const minutesOfStudyInPixels = Math.round(minutesOfStudy * (50/60));
        updateElementBarChart(elementDivBarChart, minutesOfStudyInPixels, minutesOfStudy, payload[element].color);
        i++;
    }
}

// modify DOM bar chart
function updateElementBarChart(elementDivBarChart, minutesOfStudyInPixels, minutesOfStudy, color) {
    elementDivBarChart.style.height = `${minutesOfStudyInPixels}px`;
    elementDivBarChart.firstChild.innerText = `${minutesOfStudy}min`;
    elementDivBarChart.style.transition = '2s';
    elementDivBarChart.style.backgroundColor = color;
}

// get element buttom, add a function to the dispatch event
let butmValRandom = document.getElementById('butm-val-random');
butmValRandom.onclick = updateRandomBarChart;
updateRandomBarChart();

// get element input submit, add a function to the dispatch event
let formSetValJson = document.getElementById('form-set-val-json');
formSetValJson.addEventListener('submit', updateBarChartJson);