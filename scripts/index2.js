// search constants
let currentLocationSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleAPIKey}&input=airport&inputtype=textquery&locationbias=point:${userLat},${userLong}`;
let placeID = '';
let currentLocationDetails = '';
let placeDetails = '';
// cors anywhere
const proxyurl = "https://cors-anywhere.herokuapp.com/";


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
let goodEnough = '';
function promiseRemove(promiseData) {
    goodEnough = promiseData;
}

function tryTHIS() {
    placeDetails = fetch(proxyurl + currentLocationDetails).then(r=>r.json()).then(promiseRemove);
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


 let testOne;
 let testTwo;
 function defineOne() {
    testOne = currentLocationToPlaceID(sampleResponseFirstFetch);
 }
 function defineTwo() {
    currentLocationDetails = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAY5L9IA1K2WZ9aUuNFvkIiubOCmUtz7so&place_id=ChIJ7wzsxeFSwokRhvLXxTe087M"
 }

 /*

 Dear diary, 
 before you forget, here's the formula to get it working:

    defineTwo()
    tryTHIS()
    /////goodEnough is the answer you want

 Refactor it in the morning. 

 */