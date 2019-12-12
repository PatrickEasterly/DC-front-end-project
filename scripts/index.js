// Set temp variables
const originAirport = `ATL`;

// Get random number to select destination airport from object (airportCodes) and dave to randAirportNum variable
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randAirportNum = getRandomInt(0, 50);

// Get todays date and save to todayDate variable
function getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd
}
const todayDate = getTodayDate();

// Check user IP 
const geoIPServer = `https://api.ipdata.co/?api-key=${ipLookupAPI}`;
const userIP = '';
function getUserIP() {
    fetch(geoIPServer)
        .then(r => r.json())
        .then(obj => {
            const userIP = obj.ip;
        })
    return userIP;
}

// Uses randAirportNum to get airport from airportCodes object
destAirport = airportCodes[randAirportNum]['iata'];

// Sets variable for request server with variable information
const skyscannerServer = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}-sky/${destAirport}-sky/${todayDate}`;

// Gets quotes from server and console.logs the object
function getQuotes() {
    fetch(skyscannerServer, {
        headers: {
            'x-rapidapi-key': `${skyscannerAPI}`
          },
    })
        .then(r => r.json())
        .then(obj => {
            console.log(obj);       // Console logs server response for testing
            // console.log(obj['Quotes']);
            // console.log(obj['Quotes']["0"]['MinPrice']);
        })
}

// Run
getQuotes();