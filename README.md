#G2G RN (Got To Go Right Now)

##Screenshot:

##Problem Solved:
For anyone who either can't think of or doesn't care about the destination of a trip. The app takes in consideration of price and shows you a flight leaving that day to a random destination along with giving you a link to a site where you can purchase the tickets.

##How It Works:
- Four APIs work together in JavaScript. Using the Google Maps API, the user's location is found and the closest airport is located. Then using the Google Places API, more information is gathered about that place. Skyscanner provides flight information, such as the price, date, and final destination.

- When clicked, "Leave Right Now " button pulls up a popup box with all their flight information and a link to Google Flights that is similar to a Modal, however Bootstrap is not used in the application. If the user would like a different destination, they simple close out the box and click "Leave Right Now" again for another random destination.

- The UI is simple and easy to use. The are only one main page button and the popup page has the option to close the box or go to a link. The animation brings livens up the page without overwhelming the user and the color scheme and picture are meant to replicate flying through a blue sky.

##APIs Used:
- IP LookUp: https://ipdata.co
- Skyscanner: https://partners.skyscanner.net/affiliates/travel-apis
- Google Maps: https://developers.google.com/maps/documentation
- Google Places: https://developers.google.com/places/web-service/intro

##New Features That Could Be Added:
- An option to choose what airline they would like to use. Some people may have a preference or perhaps that have a rewards program though an airline that could make the cheapest price available even lower.
- Another button called "Leave From Somewhere Else" if the user wants to leave from a different destination than where they are currently.
- Allow people to set a maximum price for the flight that is provided.

##Team:
- Bentley Herron
- Patrick Easterly
- Veronica Kemp