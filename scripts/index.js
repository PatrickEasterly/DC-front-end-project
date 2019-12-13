// Set Global variables
let originAirport = `ATL`;
let destAirport = '';
let randAirportNum = '';
let todayDate = '';
let skyscannerServer = '';
const geoIPServer = `https://api.ipdata.co/?api-key=${ipLookupAPI}`;
let userIP = '';

// Get random number to select destination airport from object (destAirports) and save to randAirportNum variable
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get todays date and save to todayDate variable
function getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd
}

// Gets the user's IP address from their machine using ipdata.co API
function getUserIP() {
    fetch(geoIPServer)
        .then(r => r.json())
        .then(obj => {
            userIP = obj.ip;
        })
    return userIP;
}

// Runs getRandomInt to use as lookup for destAirports object. Sets variables for skyscannerServer URL
function getRandomAirport() {
    randAirportNum = -1
    randAirportNum = getRandomInt(0, 50);
    destAirport = destAirports[randAirportNum]['iata'];
    skyscannerServer = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}-sky/${destAirport}-sky/${todayDate}`;

}

// Gets the airport name from the Google object. Removes unneeded characters from the string and compairs it
// against allAirports. Returns the IATA code for the airport
function getIATACode(googleReturn) {
    let googleName = googleReturn['result']['name'];
    googleName = googleName.split('-').join(' ');

    for (let airport in allAirports) {
        if (googleName === allAirports[airport]['name']) {
            return allAirports[airport]['iata'];
        }
    }
}

// Checks for quotes. If no quotes avaliable, check another airport. Once found, sends to showFlightQuotes
function checkForQuotes(obj) {
    if (obj['Quotes'].length === 0) {
        // console.log('No flights avaliable. Getting new airport.')
        getRandomAirport();
        if (randAirportNum === -1) {
            randAirportNum = 7;
        } else {
            // pass
        }
        getQuotes();
    } else if (obj['Quotes'].length > 0) {
        showFlightQuotes(obj);
    } else {
        console.log('Unknown Error.')
    }
}

// Shows the flight quotes
function showFlightQuotes(obj) {
    console.log(obj);
    console.log(`From: ${obj['Places']['0']['CityName']}`)
    console.log(`To: ${obj['Places']['1']['CityName']}`)
    for (quote of obj['Quotes']) {
        console.log(quote);
        console.log(`Minimum Price: $${quote['MinPrice']}`);
        const airlineNumber = quote['OutboundLeg']['CarrierIds']['0'];
        // console.log(`Airline: $${obj['Carriers'][airlineNumber]['Name']}`);
        console.log(`Direct Flight?: ${quote['Direct']}`);
    }
}

// Gets quotes from server and sends object to checkForQuotes
function getQuotes() {
    fetch(skyscannerServer, {
        headers: {
            'x-rapidapi-key': `${skyscannerAPI}`
          },
    })
        .then(r => r.json())
        .then(checkForQuotes)
}

// Main function to run
function main() {
    todayDate = getTodayDate();
    // originAirport = getIATACode(googleReturn);
    getRandomAirport();
    getQuotes();
}

// Run
main();