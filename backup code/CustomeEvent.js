function updateCO2Data() {
    console.log('inside updateCO2Data')
    fetchMessage()
}

async function fetchMessage() {
    console.log('inside fetchMessage')
    setInterval(async () => {
        const request = await fetch('https://catfact.ninja/fact');
        const data = await request.json();
        console.log('API response:');
        console.table(data);

        const newCO2ValueArrived = new CustomEvent('newCO2ValueArrived', {
            cancelable: true,
            bubbles: true,
            detail: data
        })
        dispatchEvent(newCO2ValueArrived);
        
    }, 5000);
}

export { updateCO2Data };

