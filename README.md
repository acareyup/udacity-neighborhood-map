## Getting Started
This is the **Udacity Neighborhood Map Project**. It's intended to put together a website from various APIs. This includes making function calls to Google Maps and other location-based services like Foursquare. 
Included is a list of some places in Istanbul.
The app allows you to filter the list down as you type.

##Installation
- Clone this repo in your local ```git clone https://github.com/acareyup/udacity-neighborhood-map.git```
- Now into your folder project in the terminal exec ```npm install``` to install all dependencies
- After install all dependencies just execute ```npm start``` on the terminal to launching the App in the browser.
- You can run the build for testing the service worker or any other reason following these steps
```
npm run build
```
- you can serve it with Node [serve](https://github.com/zeit/serve).  If you do not have it installed you can install it with:
```
npm install -g serve
```
and then run
```
serve -s build
```
- In this case the site will be hosted at [http://localhost:5000](http://localhost:5000)

## Features
1. Click on any marker to see the location details fetched from the [FourSquare APIs](https://developer.foursquare.com/).
2. Search through availaible locations.
3. Get information on locations from the search or through marker click

## Technology
- ReactJs
- HTML
- CSS
- Foursquare API
- Google Maps API
