// Set Global variables
let originAirport = '';
let destAirport = '';
let randAirportNum = '';
let todayDate = '';
let skyscannerServer = '';
const geoIPServer = `https://api.ipdata.co/?api-key=${ipLookupAPI}`;
let userIP = '';
let userLat = '';
let userLong = '';
// cors anywhere
const proxyurl = "https://frozen-tor-15479.herokuapp.com/";
let placeID = '';
let currentLocationSearch = '';
let currentLocationDetails = '';
let placeDetails = '';
let userLocationInfo = '';
let googleFlightLink = '';


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

// get the input of city
// set that city to the search string
let somewhereElse = '';
let geocodePlaceInfo = '';

// Get airport based on user input (city)
/// First, geocode from the input of the city name
/// Then take the lat and long of the output, set userLat and userLong to those
function coordFromGeoObj(obj) {
    userLat = obj["results"][0]["geometry"]["location"]["lat"];
    userLong = obj["results"][0]["geometry"]["location"]["lng"];
}

function geocodeGoogle(cityString) {
    todayDate = getTodayDate();
    somewhereElse = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityString}&key=AIzaSyAY5L9IA1K2WZ9aUuNFvkIiubOCmUtz7so`;
    fetch(somewhereElse)
        .then(r=>r.json())
        .then(coordFromGeoObj)
        .then(getCurrentSearchLocation)
        .then(getPlaceID)
}

// Sets the currentLocationSearch
function getCurrentSearchLocation(result) {
    currentLocationSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleAPIKey}&input=airport&inputtype=textquery&locationbias=point:${userLat},${userLong}`;
    return currentLocationSearch;
}

// Fetches from currentLocationSearch
function getPlaceID(response) {
    fetch(proxyurl + response)
        .then(r=>r.json()).then(r=>placeID = r["candidates"][0]["place_id"])
        .then(placeIDToDetails)
        .then(detailsURLToObject)
}

// Makes URL with placeID
function placeIDToDetails (r) {
    currentLocationDetails = `https://maps.googleapis.com/maps/api/place/details/json?key=${googleAPIKey}&place_id=${placeID}`;
    return placeID;
}

// Sets variable for user location data
function promiseRemove(promiseData) {
    userLocationInfo = promiseData;
}

// Fetches the final object and sends to promiseRemove for variable set
function detailsURLToObject() {
    placeDetails = fetch(proxyurl + currentLocationDetails).then(r=>r.json()).then(promiseRemove).then(()=>{
        originAirport = getIATACode(userLocationInfo);
        getRandomAirport();
        getQuotes();
    });
}

// Gets the user's IP address from their machine using ipdata.co API
// Passes object data to Google Maps, gets current location, gets nearest airport, returns airport data
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

// Runs getRandomInt to use as lookup for destAirports object. Sets variables for skyscannerServer URL
function getRandomAirport() {
    randAirportNum = getRandomInt(0, 49);
    destAirport = destAirports[randAirportNum]['iata'];
    skyscannerServer = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}-sky/${destAirport}-sky/${todayDate}`;

}

// Gets the airport name from the Google object. Removes unneeded characters from the string and compairs it
// against allAirports. Returns the IATA code for the airport
function getIATACode(googleObj) {
    let googleName = googleObj['result']['name'];
    googleName = googleName.split('-').join(' ');
    googleName = googleName.split('.').join('');
    for (let airport in allAirports) {
        if (googleName === allAirports[airport]['name']) {
            return allAirports[airport]['iata'];
        }
    }
}

// Checks for quotes. If no quotes avaliable, check another airport. Once found, sends to showFlightQuotes
function checkForQuotes(obj) {
    if (obj['Quotes'].length === 0) {
        getRandomAirport();
        getQuotes();
    } else if (obj['Quotes'].length > 0) {
        getGoogleFlightLink();
        showFlightQuotes(obj);
    } else {
        console.log('Unknown Error With Checking Quotes.')
    }
}

// Shows the flight quotes
function showFlightQuotes(obj) {
    const modal = document.querySelector('.content');
    modal.innerHTML = (`From: ${obj['Places']['0']['CityName']}<br>`);
    modal.innerHTML += (`To: ${obj['Places']['1']['CityName']}<br>`);
    for (quote of obj['Quotes']) { 
        modal.innerHTML += (`Minimum Price: $${quote['MinPrice']}<br>`);                 
    }
    modal.innerHTML += (`<a href=${googleFlightLink}>Book Flight</a>`);
}

function getGoogleFlightLink() {
    googleFlightLink = `https://www.google.com/flights?hl=en#flt=/m/013yq.${destAirport}.${todayDate};c:USD;e:1;sd:1;t:f;tt:o`;
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
}