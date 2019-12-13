// Set Global variables
let originAirport = `ATL`;
let destAirport = '';
let randAirportNum = '';
let todayDate = '';
let skyscannerServer = '';
const geoIPServer = `https://api.ipdata.co/?api-key=${ipLookupAPI}`;
let userIP = '';
let userLat = '';
let userLong = '';
// cors anywhere
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let placeID = '';
let currentLocationSearch = '';
let currentLocationDetails = '';
let placeDetails = '';



// Get random number to select destination airport from object (airportCodes) and dave to randAirportNum variable
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get todays date and save to todayDate variable
function getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd
}

///     Searches for nearest airport by location, returns city name/airport name
// End result object
let objectForBentley = '';

// sets the currentLocationSearch
function getCurrentSearchLocation(result) {
    currentLocationSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleAPIKey}&input=airport&inputtype=textquery&locationbias=point:${userLat},${userLong}`;
    console.log(currentLocationSearch);
    return currentLocationSearch;
}

// Fetches from currentLocationSearch
function getPlaceID(response) {
    fetch(proxyurl + response)
        .then(r=>r.json()).then(r=>placeID = r["candidates"][0]["place_id"])
        .then(placeIDToDetails)
        .then(detailsURLToObject)
}
// makes URL with placeID
function placeIDToDetails (r) {
    currentLocationDetails = `https://maps.googleapis.com/maps/api/place/details/json?key=${googleAPIKey}&place_id=${placeID}`;
    console.log(currentLocationDetails);
    return placeID;
}

function promiseRemove(promiseData) {
    objectForBentley = promiseData;

}

function detailsURLToObject() {
    placeDetails = fetch(proxyurl + currentLocationDetails).then(r=>r.json()).then(promiseRemove);
}

// Gets the user's IP address from their machine using ipdata.co API
function getUserIP() {
    fetch(geoIPServer)
        .then(r => r.json())
        .then(obj => {
            userLat = obj.latitude;
            userLong = obj.longitude;
            userIP = obj.ip;
        })
        .then(getCurrentSearchLocation)
        .then(getPlaceID)

        
    return userIP;
}

///

// Runs getRandomInt to use as lookup for airportCodes object. Sets variables for skyscannerServer URL
function getRandomAirport() {
    randAirportNum = getRandomInt(0, 50);
    destAirport = airportCodes[randAirportNum]['iata'];
    skyscannerServer = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}-sky/${destAirport}-sky/${todayDate}`;

}

// Checks for quotes. If no quotes avaliable, check another airport
function checkForQuotes(obj) {
    if (obj['Quotes'].length === 0) {
        console.log('No flights avaliable. Getting new airport.')
        getRandomAirport();
        getQuotes();
    } else if (obj['Quotes'].length > 0) {
        showFlightQuotes(obj);
    } else {
        console.log('Unknown Error.')
    }
}

// Shows the flight quotes
function showFlightQuotes(obj) {
    // console.log(obj);
    console.log(`From: ${obj['Places']['0']['CityName']}`)
    console.log(`To: ${obj['Places']['1']['CityName']}`)
    for (quote of obj['Quotes']) {
        // console.log(quote);
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
    getUserIP();
    todayDate = getTodayDate();
    getRandomAirport();
    getQuotes();
}

// Run
main();