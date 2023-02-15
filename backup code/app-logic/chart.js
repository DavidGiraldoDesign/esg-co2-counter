//import Chart from 'chart.js/auto'

class PieChart extends Chart {
    constructor(canvasDOM, co2Velues) {
        super()
        this.co2Velues = co2Velues;
        this.data = {
            datasets: [{
                data: [this.co2Velues, 280350],
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: [
                    'rgba(244, 174, 60, 1)',
                    'rgb(0,0,0,0)'
                ],
                hoverOffset: 4
            }]
        }
        this.config = {
            type: 'pie',
            data: this.data,
        };
    }

    update(co2Velues) {
        this.co2Velues = co2Velues;
        console.log('Value in ChartUpDate' + this.co2Velues)
        //this.data.datasets[0].data[0] = this.co2Velues;
        //this.update();
    }

}

export default PieChart;