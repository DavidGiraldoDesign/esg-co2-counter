const ctx = document.getElementById('myPieChart');

const data = {
    datasets: [{
        data: [1, 99],
        borderColor:'rgba(0,0,0,0)',
        backgroundColor: [
            'rgba(244, 174, 60, 1)',
            'rgb(0,0,0,0)'
        ],
        hoverOffset: 4
    }]
};

const config = {
    type: 'pie',
    data: data,
};

new Chart(ctx, config);