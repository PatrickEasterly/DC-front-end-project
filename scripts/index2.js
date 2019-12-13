// search constants

// let placeID = '';
// let currentLocationDetails = '';
// let placeDetails = '';
// cors anywhere
// const proxyurl = "https://cors-anywhere.herokuapp.com/";


// sets the currentLocationSearch
// function getCurrentSearchLocation(result) {
//     currentLocationSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleAPIKey}&input=airport&inputtype=textquery&locationbias=point:${userLat},${userLong}`;
//     return currentLocationSearch;
// }

// "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAY5L9IA1K2WZ9aUuNFvkIiubOCmUtz7so&input=airport&inputtype=textquery&locationbias=point:33.8336,-84.3797"

// // Fetches from currentLocationSearch
// function getPlaceID(response) {
//     fetch(proxyurl + response).then(r=>r.json()).then(r=>placeID = r["candidates"][0]["place_id"]);
// }


// currentLocationSearch = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${googleAPIKey}&input=airport&inputtype=textquery&locationbias=point:${userLat},${userLong}`;


/// append that ^ to getUserIP as .then

function placeIDToDetails (placeID) {
    currentLocationDetails = `https://maps.googleapis.com/maps/api/place/details/json?key=${googleAPIKey}&place_id=${placeID}`;
    console.log(currentLocationDetails);
}
/// append that ^ to getUserIP as .then

// let goodEnough = '';

// function promiseRemove(promiseData) {
//     goodEnough = promiseData;
//     var cityNameForBentley = goodEnough["result"]["address_components"][2]["long_name"];
// }


// function detailsURLToObject() {
//     placeDetails = fetch(proxyurl + currentLocationDetails).then(r=>r.json()).then(promiseRemove);
// }



//  function defineTwo() {
//     currentLocationDetails = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAY5L9IA1K2WZ9aUuNFvkIiubOCmUtz7so&place_id=ChIJ7wzsxeFSwokRhvLXxTe087M"
//  }

/*

1. getSearchLocation()
"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyAY5L9IA1K2WZ9aUuNFvkIiubOCmUtz7so&input=airport&inputtype=textquery&locationbias=point:33.8336,-84.3797"

2. getPlaceID(currentLocationSearch)
"ChIJAVkD4S_99IgRSLCSGO-jF0E"

3. placeIDToDetails(placeID)
"https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAY5L9IA1K2WZ9aUuNFvkIiubOCmUtz7so&place_id=ChIJAVkD4S_99IgRSLCSGO-jF0E"

4. detailsURLToObject()
5. goodEnough is the object you want

*/