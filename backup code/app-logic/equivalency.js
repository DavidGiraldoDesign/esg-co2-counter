class Equivalency {
    equivalencyList = [
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
    ]

    getEquivalency(newCO2Value, TOP_VALUE) {
        console.log('--------------------------------')
        console.log(newCO2Value)
        this.equivalencyList.forEach((equi, index) => {
            if (index + 1 < this.equivalencyList.length) {
                console.log('index:')
                console.log(index);
                console.log('index + 1:')
                console.log(index + 1);
                if (newCO2Value >= equi.fraction && newCO2Value < this.equivalencyList[index + 1].fraction) {
                    console.log(equi.text);
                    console.log(this.equivalencyList[index]);
                    let msn = this.equivalencyList[index]
                    return {nsm : 0};
                }
                return {mns: 0}
            }
        })
    }
}

export default Equivalency;

/*

if (newCO2Value < TOP_VALUE) {
            for (let index = 0; index < this.equivalencyList.length; index++) {
                let bottom = TOP_VALUE / this.equivalencyList[index].fraction;

                let top
                if (index + 1 === this.equivalencyList.length) {
                    top = TOP_VALUE;
                } else {
                    top = TOP_VALUE / this.equivalencyList[index + 1].fraction
                }

                if (newCO2Value > bottom && newCO2Value < top) {
                    console.log('Inside the range');
                    console.log('newCO2Value > bottom && newCO2Value < to' + newCO2Value)
                    return this.equivalencyList[index]
                } else {
                    return {
                        text: "Commuting to work by bike.",
                        src: "./assets/equivalency.png"
                    }
                }
            }
        }
*/