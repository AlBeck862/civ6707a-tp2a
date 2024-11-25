# Visualisation des données à l'aide de p5.js et de Open Source Routing Machine (OSRM)

https://editor.p5js.org/Freudon/sketches/AjZtj4tSD

## 0. Setup

**0.1 Définition des particules** <br>

```
let fileType = 'ssv' // NE PAS OUBLIER DE CHANGER LE TYPE DE FICHIER (SSV pour ;)

let table; 

// User input variables
let randomize = false;      
let randomizeButton;        
let particleInput;          
let dataInputButton;        
let dataInputLink;          
let dataFileLoaded = false; // Track whether data file is loaded


// Other variables
let filteredRows = [];    // Array of selected data table rows
let particles = [];       // Array of particles (vehicles)
let currentIndex = 0;     
let completedCount = 0;   
let currentMode = '';     
let currentMotif = '';    
let currentModeColor;     
let totalParticles = 0;
let routesReady = 0;
let allRoutesReady = false;
let speedFactorInput;
let speedFactor = 1;


const mtmNad83 = "+proj=tmerc +lat_0=0 +lon_0=-73.5 +k=0.9999 +x_0=304800 +y_0=0 +datum=NAD83 +units=m +no_defs";
const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

let leafletMap;
```
**0.2 Mise en place de la carte** <br>
```
function setupMap() {
  leafletMap = L.map('mapid').setView([45.5088, -73.5878], 11); // Center on Montreal
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);
}
```


## 1. Génération des particules

**1.1 Définition des particules** <br>
Cette étape permet de créer la classe des particules. On y ajoute des paramètres comme les coordonnées, le mode, l'âge et l'heure.
```
class Particle {
  constructor(x_origin, y_origin, x_dest, y_dest, mode, age, heure) {
    this.routeReady = false;
    this.x_origin = x_origin;
    this.y_origin = y_origin;
    this.x_dest = x_dest;
    this.y_dest = y_dest;
    this.progress = 0;
    this.speed = 0;


    // Convert MTM NAD83 to WGS84
    const originWGS84 = proj4(mtmNad83, wgs84, [x_origin, y_origin]);
    const destWGS84 = proj4(mtmNad83, wgs84, [x_dest, y_dest]);

    // Map to Leaflet points
    this.startLatLng = L.latLng(originWGS84[1], originWGS84[0]);
    this.endLatLng = L.latLng(destWGS84[1], destWGS84[0]);

    this.routeCoordinates = [];
    this.currentPositionIndex = 0;

    // Create a Leaflet marker
    this.marker = L.circleMarker(this.startLatLng, {
      radius: 5,
      color: this.getColorFromMode(mode),
      fillOpacity: 0.9,
    }).addTo(leafletMap);

    this.fetchRouteAndInitialize(mode);
    
    this.marker.bindPopup(
      `Mode: ${mode}<br>Heure: ${heure}<br> Age: ${age}<br>From: (${originWGS84[1].toFixed(4)}, ${originWGS84[0].toFixed(4)})<br>To: (${destWGS84[1].toFixed(4)}, ${destWGS84[0].toFixed(4)})`
    );
    
    this.marker.on('mouseover', () => {
    this.marker.openPopup();
});
  }
  
async fetchRouteAndInitialize(mode) {
    console.log("Fetching route...");
    const route = await fetchRoute(this.startLatLng, this.endLatLng);
    if (route) {
        this.routeCoordinates = route.map(coord => L.latLng(coord[1], coord[0]));
        console.log(`Route loaded for particle: ${this.routeCoordinates.length} points`);

        this.speed = Math.max(0.01, this.getSpeedFromMode(mode));

        this.routeReady = true; // Mark the route as ready
        console.log("Route ready for particle.");
    } else {
        console.error("Route could not be fetched for this particle");
        this.routeReady = true; // Mark as ready to avoid blocking
    }

    // Increment routesReady and check if all routes are ready
    routesReady++;
    if (routesReady === totalParticles) {
        allRoutesReady = true; // All routes are now ready
        console.log("All routes loaded. Starting particles.");
    }
}

  getSpeedFromMode(mode) {
    const speedMap = {
      AC: 2 * speedFactor,
      AJ: 2 * speedFactor,
      AP: 2 * speedFactor,
      KR: 1.8 * speedFactor,
      MV: 1 * speedFactor,
      PR: 1.8 * speedFactor,
      TC: 1.5 * speedFactor,
    };
    return speedMap[mode] || 2;
  }

  getColorFromMode(mode) {
    const modeColors = {
      AC: '#FF5733',
      AJ: '#33FF57',
      AP: '#3357FF',
      KR: '#FFFF33',
      MV: '#FF33FF',
      PR: '#FF8533',
      TC: '#33FFFF',
    };
    return modeColors[mode] || '#888888';
  }

update() {
    if (!this.routeReady) {
        console.log("Route not ready for particle, skipping update...");
        return;
    }

    if (this.routeCoordinates.length > 0 && this.currentPositionIndex < this.routeCoordinates.length - 1) {
        const step = this.speed; // Adjust step size if needed
        this.currentPositionIndex += step;

        // Ensure the index does not exceed the array bounds
        const index = Math.min(Math.floor(this.currentPositionIndex), this.routeCoordinates.length - 1);
        const nextIndex = Math.min(index + 1, this.routeCoordinates.length - 1);

        const currentCoord = this.routeCoordinates[index];
        const nextCoord = this.routeCoordinates[nextIndex];

        const t = Math.min(this.currentPositionIndex - index, 1); // Ensure t is between 0 and 1
        const lat = lerp(currentCoord.lat, nextCoord.lat, t);
        const lng = lerp(currentCoord.lng, nextCoord.lng, t);

        this.marker.setLatLng(L.latLng(lat, lng));
    } else if (this.currentPositionIndex >= this.routeCoordinates.length - 1) {
        this.marker.setLatLng(this.routeCoordinates[this.routeCoordinates.length - 1]); // Ensure the marker reaches the endpoint
    }
}

  isFinished() {
    return this.currentPositionIndex >= this.routeCoordinates.length - 1;
  }
}
```
**1.2 Création des particules** <br>

```
function setParticles() {
    let numParticles = int(particleInput.value());
    if (numParticles > 0) {
        totalParticles = numParticles; // Update the total number of particles
        routesReady = 0; // Reset the ready counter
        allRoutesReady = false; // Reset the flag

        for (let i = 0; i < numParticles; i++) {
            createNextParticle();
        }
    }
}

```
## Importation des données
