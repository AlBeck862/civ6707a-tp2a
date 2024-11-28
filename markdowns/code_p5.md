# Visualisation des données à l'aide de p5.js et de Open Source Routing Machine (OSRM)

https://editor.p5js.org/Freudon/sketches/AjZtj4tSD

## 0. Setup

**0.1 Définition des particules** <br>
Cette section définit les particules et leurs variables qui seront affichées sur l'écran. Notez qu'il est important pour l'utilisateur d'écrire le bon type de fichier utilisé dans la première ligne de code qui suit, cela permettra au code d'aller chercher adéquatement les informations nécessaires du fichier de données générées.
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

**0.3 Initialisation des boutons** <br>
La section de code qui suit définit les boutons affichées sur l'interface. Chacun de ces boutons sont liés à une fonction différente étant tous définies dans les étapes à suivre.
```
function setup() {
  noCanvas();
  setupMap(); // Initializes the Leaflet map
  frameRate(30);
  
   // Reference to the speed factor input
  speedFactorInput = select('#speedFactorInput');
  speedFactorInput.input(updateSpeedFactor);
  
// Reference to buttons in HTML instead of creating new ones
  randomizeButton = select('#randomizeButton');
  randomizeButton.mousePressed(toggleRandomization);

  particleInput = select('#particleInput');
  
  let submitButton = select('#submitButton');
  submitButton.mousePressed(setParticles);
  
  dataInputButton = select('#dataInputButton');
  dataInputButton.changed(loadFileButton);
  
  dataInputLink = select('#dataInputLink');
  
  let linkFetchButton = select('#linkFetchButton');
  linkFetchButton.mousePressed(getDataFromLink);

}
```

## 1. Génération des particules

**1.1 Définition des particules** <br>
Cette étape permet de créer la classe des particules. On y ajoute des paramètres comme les coordonnées, le mode, l'âge et l'heure. On y retrouve aussi la fonction "update" qui enclenche le mouvement des particules sur la carte.
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
**1.2 Création du compteur des particules** <br>

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

**1.3 Création de la fonction pour modifier la vitesse** <br>
Cette étape définit la fonction reliée au boutton d'interface permettant de choisir le facteur de vitesse utilisé, ce facteur de vitesse choisi est alors multiplié aux vitesses prédéfinies en fonction du mode.
```
function updateSpeedFactor() {
  speedFactor = float(speedFactorInput.value());
  console.log("Facteur de vitesse updated:", speedFactor); // Optional, log the updated value
}

```

**1.4 Création de la fonction pour obtenir des déplacements aléatoires** <br>
La fonction suivante est celle attribuée au boutton "Génération aléatoire" qui mélange aléatoirement les déplacements des données OD avant de les visualiser.
```
function startMovement() {
  currentIndex = 0;
  completedCount = 0;

  if (randomize) {
    filteredRows = shuffle(filteredRows);
  }
}
```

**1.5 Création et génération des particules** <br>
Cette fonction crée les particules des déplacement en leur attribuant leur coordonnées de départ et d'arrivée ainsi que certaines données qualitatives tel le mode utilisé, le groupe d'age de l'individus et l'heure de départ.
```
async function createNextParticle() {
    if (currentIndex < filteredRows.length) {
        const row = filteredRows[currentIndex];
        const x_origin = row.getNum('D_ORIXCOOR');
        const y_origin = row.getNum('D_ORIYCOOR');
        const x_dest = row.getNum('D_DESTXCOOR');
        const y_dest = row.getNum('D_DESTYCOOR');
        const mode = row.getString('D_MODE');
        const age = row.getString('P_GRAGE');
        const heure = row.getString('D_HREDE');

        // Create the particle
        const particle = new Particle(x_origin, y_origin, x_dest, y_dest, mode, age,heure);
        currentIndex++;

        // Wait until the route is ready
        while (!particle.routeReady) {
            await new Promise(resolve => setTimeout(resolve, 10)); // Check every 10ms
        }

        // Add the particle to the array only when ready
        particles.push(particle);
    }
}
```
**1.6 Affichage des particules sur la carte** <br>
La fonction suivante affiche les particules qui se déplacent sur la carte.
```
function draw() {
    if (!allRoutesReady) {
        console.log("Waiting for all routes to load...");
        return; // Do nothing until all routes are ready
    }

    if (dataFileLoaded) {
        particles.forEach((particle, index) => {
            if (particle.routeReady) {
                particle.update();
                if (particle.isFinished()) {
                    leafletMap.removeLayer(particle.marker);
                    particles.splice(index, 1); 
                }
            }
        });
    }
}
```

## 2 Importation des données
