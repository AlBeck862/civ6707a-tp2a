# README – CIV6707A – Compte-rendu du projet
Un projet d’augmentation et de visualisation de données origine-destination.

## Objectifs
Dans un premier temps, ce projet vise l’augmentation des données d’une enquête origine-destination (OD) de la région métropolitaine de Montréal. Les données réelles suivent une distribution multivariée complexe. De nouvelles données interpolées sont à créer, reproduisant, et donc s’intégrant à, la distribution de base. L’interpolation à multiples variables est à compléter à l’aide d’un modèle d’intelligence artificielle.

Dans un deuxième temps, ce projet vise la visualisation des données interpolées sur une carte interactive de la région métropolitaine de Montréal en format d’application web. La carte doit permettre l’agrandissement et le rétrécissement du champ de vision (_zoom-in/zoom-out_), ainsi que la visualisation de quartiers ou de secteurs en particulier. La génération de déplacements interpolés est à faire et à tracer à la guise de l’utilisateur dans l’un de deux modes. Dans le mode « unitaire », un seul déplacement est généré et visualisé. Dans le mode « autonome », un échantillon de déplacements sont générés et visualisés collectivement.

## Outils
**p5.js (Javascript)** : la visualisation des déplacements est programmée à l’aide du module Javascript p5.js.

**Deck.gl (Python & Javascript)** : la visualisation des déplacements a été tentée à l’aide du module Python et Javascript deck.gl (_outil abandonné_).

**Python** : le modèle d’intelligence artificielle servant de générateur de données interpolées est programmé en Python.

**HTML** : l’interface entre le code de visualisation en Javascript est programmée en HTML.

**Intelligence artificielle générative** : les modèles d’intelligence artificielle générative commerciaux _Claude_ et _ChatGPT_ sont utilisés comme aides à la programmation.

**OpenStreetMap (OSM)** : la carte à l’arrière-plan de l’application web est tirée de son intégration à la plateforme cartographique à données ouvertes OpenStreetMap.

**Open Source Routing Machine (OSRM)** : les déplacements pourront être visualisés sur la carte animée grâce au chemin tiré du planificateur de trajets à données ouvertes Open Source Routing Machine (outil futur).

**GitHub** : le code, les données, et la documentation ont été téléversés sur la plateforme en ligne GitHub. 

## Méthodologie et cheminement
**Planification du projet.** Avant de débuter notre travail, nous avons créé un plan général des composantes ainsi que des étapes du projet. Celui-ci se divise en trois composantes. La première composante est la génération de données, le deuxième composante est la visualisation, et la troisième composante est l’intégration des systèmes de génération et de visualisation.

**Compréhension des données.** Afin de mieux comprendre les données OD, nous avons créé des visualisations de base nous permettant de plus facilement aborder l’interpolation de ces données à l’aide de l’intelligence artificielle.

**Augmentation des données.** Nous avons procédé à une analyse des stratégies d’augmentation de données à l’aide de l’intelligence artificielle (IA). Nous avons considéré plusieurs modèles, mais avons finalement décidé de mettre à l’épreuve un modèle GAN (_Generative Adversarial Network_). Ce type de modèle entraîne, en fait, deux sous-modèles compétitifs. Le premier est génératif et crée de nouvelles données. Le second est discriminatif et évalue l’authenticité des données générées. Les deux sous-modèles tentent de se déjouer en succession, créant donc des nouvelles données imitant de plus en plus les données réelles. Toutefois, c’était un grand défi de créer un modèle de ce type qui fonctionne adéquatement. La complexité principale découle de la nature des données OD utilisées pour entraîner le modèle. En effet, un fichier de données OD contient des paramètres numériques (par exemple, un nombre d’automobiles) ainsi que des paramètres catégoriques (par exemple, le type de déplacement). Alors qu’il existe des méthodes permettant de traiter les deux types de paramètres par un même modèle, la tâche est particulièrement complexe. Nous avons tenté d’utiliser la méthode du _one-hot encoding_. En ce moment, nos résultats ne respectent toutefois pas la distribution de base souhaitée.

**Visualisation.** À l’origine, nous avons tenté deux méthodes de visualisation différentes. La première méthode est l’usage du module Python/Javascript deck.gl. Celui-ci offre un bon nombre d’outils préprogrammés permettant d’afficher des données cartographiques, certaines étant même animées. Alors que cette solution semblait idéale, des difficultés techniques à répétition nous empêchait de la mettre à l’œuvre. Au début, nous voulions utiliser les modules Python de deck.gl afin de plus facilement intégrer le modèle d’intelligence artificielle à la visualisation. Nous avons ainsi tenté d’animer un _TripsLayer_ de deck.gl. Toutefois, Python n’est pas conçu à la base pour la visualisation animée dans le cadre d’une application web. La seule manière d’y parvenir aurait été un _Jupyter Notebook_, un environnement de code interactif Python. Malheureusement, les versions plus récentes de deck.gl ne sont plus compatibles avec _Jupyter Notebook_. Nous avons donc abandonnée l’idée, préférant nous tourner vers la version Javascript de deck.gl, puisqu’elle intègre l’animation en format web à sa base. Encore une fois, malgré de nombreux essais, nous n’avons jamais réussi à faire fonctionner le module deck.gl. Ici, il s’agirait plutôt d’un manque d’expérience avec le langage Javascript. En parallèle, toutefois, nous travaillions sur la visualisation à l’aide de p5.js. Cette méthode portait déjà fruit : en attendant la complétion du modèle d’intelligence artificielle, nous pouvions visualiser des données réelles sur une carte fixe. Nous avons donc décidé de nous concentrer pleinement sur p5.js et d’abandonner deck.gl. Par la suite, nous avons réussi à intégrer l’importation de données par fichiers (format _CSV_) ainsi que par lien direct _GitHub_. Il est donc possible de téléverser des données pré-générées issues du modèle d’intelligence artificielle pour la visualisation dans l’application web. Toutefois, il n’est toujours pas possible de générer de nouvelles données à l’instant d’une demande de l’utilisateur : les données sont plutôt tirées d’une banque fixe. Il y aurait donc une limite théorique au nombre de nouveaux déplacements pouvant être visualisés. Ensuite, nous avons réussi à ajouter une carte interactive à l’application web en y intégrant _OpenStreetMap_. Il est donc possible de déplacer la carte ainsi que d’agrandir et de rétrécir le champ de vision. Cette modification fait diverger l’application en deux fichiers principaux. Le premier contient le code p5.js Javascript avec la logique programmée de l’application. Le deuxième contient du code HTML, créant une interface visuelle et interactive entre le code Javascript et l’utilisateur.

**Développement futur.** Nous tentons présentement d’afficher la chronométrie des déplacements à l’affiche. Nous espérons ensuite pouvoir lier le modèle d’intelligence artificielle (Python) à l’application web (p5.js Javascript) à l’aide d’un serveur, permettant donc à l’utilisateur d’accéder en temps réel à la génération de nouvelles données. Nous planifions aussi d’intégrer l’_Open Street Routing Machine_ à l’application web afin de visualiser les déplacements issus des données origine-destination générées par le modèle d’intelligence artificielle. 

## Description du code (documentation)
**Modèle d’intelligence artificielle (Python).** À venir

**[Application web] (https://github.com/AlBeck862/civ6707a-tp2a/blob/main/code_p5.md) (p5.js Javascript).** 

## Contributions
À venir
