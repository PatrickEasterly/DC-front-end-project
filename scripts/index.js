// Sets variables for query
const originAirport = `SFO`;
const destAirport = `JFK`;
const date = `2019-12-24`;

// Request server
const skyscannerServer = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${originAirport}-sky/${destAirport}-sky/${date}`;


// Gets quotes from server and console.logs the object
function getQuotes() {
    fetch(skyscannerServer, {
        headers: {
            'x-rapidapi-key': `${skyscannerAPI}`
          },
    })
        .then(r => r.json())
        .then(out => {
            console.log(out);       // Console logs server response for testing
        })
}

// Run
getQuotes();