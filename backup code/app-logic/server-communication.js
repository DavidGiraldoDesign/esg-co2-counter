class ServerCommunication {
    static instance = null;
    URL = "https://counterdata-bde6s4lbma-uc.a.run.app/";

    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }
    //Add a method to fetch the fist time
    //Add a method to fetch every hour
    async firstFetchData() {
        const response = await fetch(this.URL);
        const data = await response.json();
        console.log('Notify Frist Fetch' + data.counter);
        this.notifyObservers(data.counter);
    }

    updateData() {
        /*setInterval(async () => {
            const response = await fetch(this.URL);
            const data = await response.json();
            console.log('Notifying')
            this.notifyObservers(data.counter);
        }, ((1000 * 60) * 60))*/

        let counter = 0;
        setInterval(() => {
            counter += 10321;
            this.notifyObservers(counter);
        }, 500)
    }

    notifyObservers(data) {
        this.observers.forEach((observer) => {
            observer.update(data);
        });
    }

    static getInstance() {
        return this.instance || (this.instance = new ServerCommunication());
    }

}
const serverCommunication = ServerCommunication.getInstance();
export default serverCommunication;

//export default ServerCommunication.getInstance();
