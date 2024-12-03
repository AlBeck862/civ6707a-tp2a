# Guide d'utilisateur pour la visualisation des déplacements

### Lien vers l'outil de visualisation

https://editor.p5js.org/Freudon/sketches/AjZtj4tSD


## 1. Importation des données

Un fois que le lien vers l'outil est ouvert, il faut premièrement activer le code en appuyant sur la touche de démarrage dans p5js:

<img width="262" alt="image" src="https://github.com/user-attachments/assets/a1b42ee3-613a-46f5-a678-05a8cb692fa7">


Il est maintenant possible d'importer les données OD de notre choix. Deux option s'offrent à nous pour importer les données.

**1.1 Importation d'un fichier local** <br>

Il est possible d'importer les données OD d'un fichier local en sélectionnant le bouton "Choisir un fichier" situé sur l'écran.

<img width="415" alt="image" src="https://github.com/user-attachments/assets/92e15bb3-4526-4716-99fd-1e0d21317130">


Une fonction ouvrira les fichier locaux de l'ordinateur nous laissant sélectionner le fichier tabulaire de données désiré. Une fois sélectionné, le nom du fichier choisi sera affiché à droite du bouton "Choisir un fichier" pour confirmer que le ficher est adéquat.

**1.2 Importation à partir d'un lien Github** <br>

La deuxième option d'importation de données est à partir d'un lien Github qui mène directement à destination du fichier de données désiré. Pour cela il suffit de coller l'addresse du lien vers les données dans la case avec l'inscription "Lien vers le fichier", et ensuite appuyer sur le boutton "Charger les données" tel affiché ci-dessous:

<img width="415" alt="image" src="https://github.com/user-attachments/assets/3e4777c5-6dca-4424-96c8-b40db7294dd9">


Dans le cas de notre projet, le lien Github utilisé pour accéder aux données OD de base est le suivant:
https://raw.githubusercontent.com/AlBeck862/civ6707a-tp2a/refs/heads/main/OD_complet.csv

Il est important de noter que le lien Github doit être sous format raw.

**À NOTER** <br>

Il est important de s'assurer que le type de fichier de données sélectionné correspond à celui dont le code peut lire. L'outils de visualisation peut lire seulement les fichiers de type CSV ou SSV et ce type doit être spécifier dans la première ligne du code affiché ci-dessous:

<img width="485" alt="image" src="https://github.com/user-attachments/assets/a9751fa4-5d96-4c36-81a1-c41fb7fc0278">


## 2. Utilisation des différentes fonctionnalités de l'outil

La section suivante décrit les différentes fonctionnalités présentes pour personnaliser la visualisation des déplacements importés à l'étape précédente.

**2.1 Visualisation aléatoire** <br>

Le boutton "Génération aléatoire" permet de mélanger aléatoirement les données OD importés avant de les visualiser. Si ce boutton n'est pas appuyé avant la le départ de la visualisation, les déplacement seront affiché dans l'ordre original du fichier importé, ce qui n'est pas toujours idéal pour représenter adéquatement l'étendue des données.

<img width="465" alt="image" src="https://github.com/user-attachments/assets/98c8e2c1-172f-4ca6-b70a-0b8dc092fd99">


**2.2 Facteur de vitesse** <br>

Le facteur de vitesse permet de contrôler la vitesse de déplacement des particules sur l'écran. Celle-ci fonctionne en multipliant le facteur de vitesse sélectionné aux valeurs de vitesses prédéfinies en fonction du mode de déplacement attribué à la particule (Auto-conducteur, Marche Vélo, Transport en commun, etc.).

<img width="458" alt="image" src="https://github.com/user-attachments/assets/f3040994-f536-4c82-98bd-5006e798bc9c">


**2.3 Nombre de particules** <br>

Il est possible de choisir le nombre de particules à visualiser en même temps sur la carte. Il suffit d'inscrire le nombre de particule souhaité dans la case appropriée illustrée ci dessous:

<img width="458" alt="image" src="https://github.com/user-attachments/assets/269f5073-7ce2-45d3-96e0-2f249f06d5c2">


## 3. Démarrage de la visualisation

Une fois que les étapes 1 et 2 ont été complétées, appuyez sur le boutton "Nbre Particules" pour démarrer la visualisation. En fonction du nombre de particules choisies, le temps de chargement des routes peut varier (généralement de quelques secondes). Les déplacements débutent lorsque toutes les routes sont chargées.

<img width="458" alt="image" src="https://github.com/user-attachments/assets/9ee08f57-82d7-4077-8fe0-18d727af68b2">
