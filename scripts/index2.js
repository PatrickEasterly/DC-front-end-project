// search constants
let currentLocationSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleAPIKey}&input=airport&inputtype=textquery&locationbias=point:${userLat},${userLong}`;
let placeID = '';
let currentLocationDetails = '';
let placeDetails = '';


// placeID from JSON response
function currentLocationToPlaceID (response) {
    placeID = response["candidates"][0]["place_id"];
    return placeID;
}
/// append that ^ to getUserIP as .then

function placeIDToDetails (placeID) {
    currentLocationDetails = `https://maps.googleapis.com/maps/api/place/details/json?key=${googleAPIKey}&place_id=${placeID}`;
    console.log(currentLocationDetails);
}
/// append that ^ to getUserIP as .then
function tryTHIS() {
    placeDetails = fetch(currentLocationDetails).then(r=>r.json());
}

// let fart = currentLocationToPlaceID(sampleResponseFirstFetch)

let sampleResponseFirstFetch = {
    "candidates": [
       {
          "place_id": "ChIJ7wzsxeFSwokRhvLXxTe087M"
       }
    ],
    "status": "OK"
 }