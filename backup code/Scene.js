/*import { updateCO2Data } from "./CustomeEvent.js";
import serverCommunication from './app-logic/server-communication.js';

class ConsolePrinter {
    update(data) {
        console.log(data);
    }
}

const consolePrinter = new ConsolePrinter();
serverCommunication.subscribe(consolePrinter);


//_----------------

let obj = {}

//updateCO2Data();

const main = document.querySelector('main');

main.addEventListener('newCO2ValueArrived', e => {

    console.log('inside main event')
    console.log(e.detail);
})*/
let canvas;
function setup() {
    canvas = createCanvas(800, 480);
    let div = document.querySelector('#p5-canvas-container');
    canvas.parent(div);
}

function draw() {
    background(246, 242, 235);
    fill(0);
    ellipse(pmouseX, pmouseY, 50,50);

}