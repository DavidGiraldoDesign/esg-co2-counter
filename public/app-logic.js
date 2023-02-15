//import myObserver from "./observer";

console.log('working');
const TOTAL = 252000;
const GOAL = 252190;
let cleanAir = 252000;
let dirtyAir = 0;
const increment = 2;
const subdivisions = 12;
const URL = "https://counterdata-bde6s4lbma-uc.a.run.app/";
//const URL = "http://localhost:8080/counter";

//const messageDOM = document.querySelector('h1');
const ctx = document.getElementById('myPieChart');
const co2ValueDOM = document.querySelector('.co2-value');
const equiDiv = document.querySelector('.equivalency-example');

let newValue = 0;
let lastEquivalency = 0;
let previousEquivalency = 0;

const equivalencyList = [
    {
        fraction: 1,
        text: "Commuting to work by 🚲 bike.",
        src: "./assets/equi-bike.png"
    },
    {
        fraction: 2,
        text: "47 one way flights ✈️ London - Paris",
        src: "./assets/equi-paris.png"
    }, {
        fraction: 4,
        text: "16,128 cotton t-shirts 👕",
        src: "./assets/equi-shirt.png"
    }, {
        fraction: 6,
        text: "247,085 vegetarian meals 🥗",
        src: "./assets/equi-veggi.png",
    }, {
        fraction: 8,
        text: "2,746 years of watching TVs 📺",
        src: "./assets/equi-tv.png"
    }, {
        fraction: 10,
        text: "4.4 years using a car 🚗",
        src: "./assets/equi-car.png"
    }, {
        fraction: 12,
        text: "286 round flights ✈️ Los Angeles - London",
        src: "./assets/equi-london.png"
    },
];

//__________________________________________________________

const data = {
    datasets: [{
        data: [cleanAir, dirtyAir],
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: [
            'rgb(0,0,0,0)', 'rgba(244, 174, 60, 1)'
        ],
        hoverOffset: 4
    }]
};

const config = {
    type: 'pie',
    data: data,
    options: {
        //rotation: -0.5 * Math.PI
    }
};

const pieChart = new Chart(ctx, config);

//__________________________________________________________


function counter() {

    if (newValue < 252190) {
        newValue += (21000 / 4);
        console.log(`newValue = ${newValue}`);
        console.log(`cleanAir = ${cleanAir}`);
        console.log(`dirtyAir = ${dirtyAir}`);
    }

}

async function getData() {
    const request = await fetch(URL);
    const { counter } = await request.json();
    newValue = counter;
    console.log(`Fetch C02e: ${newValue}`)
    getEquivaleny(newValue);
    pieChart.data.datasets[0].data = substracting(newValue);
    pieChart.update();
}

function substracting(newData) {
    dirtyAir = newData;
    cleanAir = GOAL - dirtyAir;
    let values = [cleanAir, dirtyAir]
    return values
}

function getEquivaleny(value) {

    co2ValueDOM.textContent = `${value.toLocaleString()}`

    for (let i = 0; i < equivalencyList.length; i++) {
        previousEquivalency = lastEquivalency;
        let frac = equivalencyList[i].fraction;
        let fracTop = frac + increment;
        //console.log(`Frac: ${frac} - fracTop: ${fracTop}`)

        let bottomLimit = TOTAL * (frac / subdivisions);
        let topLimit = TOTAL * (fracTop / subdivisions);

        //console.log(`Bottom limit: ${bottomLimit} - Top limit: ${topLimit}`)

        if (value >= bottomLimit && value < topLimit) {
            //console.log(`Reach! Value ${value} is gratter than ${bottomLimit} but less than ${topLimit}`);
            //messageDOM.textContent = equivalencyList[i].text;

            equiDiv.querySelector('p').textContent = `${equivalencyList[i].text}`
            equiDiv.querySelector('img').setAttribute('src', `${equivalencyList[i].src}`)

            lastEquivalency = equivalencyList[i].fraction;
            //console.log(`lastEquivalency: ${lastEquivalency} - previousEquivalency ${previousEquivalency}`);
            return;
        }
        //previousEquivalency = equivalencyList[i].fraction;
    }
}
getData();
setInterval(() => {
    //counter();
    /*getEquivaleny(newValue);
    pieChart.data.datasets[0].data = substracting(newValue);
    pieChart.update();*/
    getData();
    //myObserver.notifyObservers({ lastEquivalency, previousEquivalency });
}, 300000);

//300000
//60 * 60 * 1000

