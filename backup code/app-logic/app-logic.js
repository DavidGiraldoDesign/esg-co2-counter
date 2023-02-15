// Import the ServerCommunication and ConsolePrinter classes
import serverCommunication from "./server-communication.js";
import ConsolePrinter from "./console-printer.js";
import Equivalency from "./equivalency.js";
import Chart from "./chart.min.js"

//import PieChart from "./chart.js";
const ctx = document.getElementById('myPieChart');
const co2ValueDOM = document.querySelector('.co2-value');
const equiDiv = document.querySelector('.equivalency-example');

//______________________________________
const TOP_VALUE = 280350;
let cleanAir = 280350;
let dirtyAir = 0;

const equivalencyList = [
  {
    fraction: 0,
    text: "Commuting to work by 🚲 bike.",
    src: "./assets/equivalency.png"
  },
  {
    fraction: 23000,
    text: "26 one way flights ✈️ London - Paris",
    src: "./assets/equivalency.png"
  }, {
    fraction: 69000,
    text: "13,248 cotton t-shirts 👕",
    src: "./assets/equivalency.png"
  }, {
    fraction: 115000,
    text: "225,525 veggi dinners 🥗",
    src: "./assets/equivalency.png"
  }, {
    fraction: 161000,
    text: "2,631 TVs 📺 turned on for one year",
    src: "./assets/equivalency.png"
  }, {
    fraction: 207000,
    text: "44 years using a car 🚗",
    src: "./assets/equivalency.png"
  }, {
    fraction: 253000,
    text: "288 round flights  ✈️ from LA to London",
    src: "./assets/equivalency.png"
  }
  , {
    fraction: 300000,
    text: "-",
    src: "./assets/equivalency.png"
  }
]

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
/*
pieChart.data.datasets[0].data[2] = 50; // Would update the first dataset's value of 'March' to be 50
pieChart.update(); // Calling update now animates the position of March from 90 to 50.

*/

class App {

  constructor() {
    this.serverCommunication = serverCommunication;
    this.consolePrinter = new ConsolePrinter();
    this.equivalency = new Equivalency();
    /*pieChart.update = (co2Data) => {
      console.log("Update into piChart: " + co2Data);
      this.data.datasets[0].data[0] = co2Data;
    }*/

    console.log('App');
    // Subscribe the console printer to the server communication
    this.serverCommunication.subscribe(this.consolePrinter);
    this.serverCommunication.subscribe(this);

    //this.serverCommunication.firstFetchData();
  }

  data() {
    this.serverCommunication.updateData();
  }

  update(newData) {
    console.log('newData: ' + newData)
    pieChart.data.datasets[0].data = this.substracting(newData);
    pieChart.update();

    co2ValueDOM.textContent = `${newData.toLocaleString()}`

    equivalencyList.forEach((equi, index) => {
      if (index + 1 < equivalencyList.length) { // less or equal to 7
        if (newData >= equi.fraction && newData < equivalencyList[index + 1].fraction) {
          equiDiv.querySelector('p').textContent = `${equi.text}`
          equiDiv.querySelector('img').setAttribute('src', `${equi.src}`)
          return;
        }
      } else if (index + 1 === equivalencyList.length + 1) {
        equiDiv.querySelector('p').textContent = `${equi.text}`
        equiDiv.querySelector('img').setAttribute('src', `${equi.src}`)
        return;
      }
    })
  }

  substracting(newData) {
    dirtyAir = newData;
    cleanAir = 280350 - dirtyAir;
    let values = [cleanAir, dirtyAir]
    return values
  }
}

// Create a new instance of the App class and start the app
//type="application/javascript"
const app = new App();
app.data();
