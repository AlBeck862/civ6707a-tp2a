# README – CIV6707A – Résumé du projet
Un projet d’augmentation et de visualisation de données origine-destination.

## Objectifs
Dans un premier temps, ce projet vise l’augmentation des données d’une enquête origine-destination (OD) de la région métropolitaine de Montréal. Les données réelles suivent une distribution multivariée complexe. De nouvelles données interpolées sont à créer, reproduisant, et donc s’intégrant à, la distribution de base. L’interpolation à multiples variables est à compléter à l’aide d’un modèle d’intelligence artificielle.

Dans un deuxième temps, ce projet vise la visualisation des données interpolées sur une carte interactive de la région métropolitaine de Montréal en format d’application web. La carte doit permettre l’agrandissement et le rétrécissement du champ de vision (_zoom-in/zoom-out_), ainsi que la visualisation de quartiers ou de secteurs en particulier. La génération de déplacements interpolés est à faire et à tracer à la guise de l’utilisateur dans l’un de deux modes. Dans le mode « unitaire », un seul déplacement est généré et visualisé. Dans le mode « autonome », un échantillon de déplacements sont générés et visualisés collectivement.

## Plan du projet
Un plan graphique du projet est disponible **[ici](https://github.com/AlBeck862/civ6707a-tp2a/blob/main/plan-du-projet-final.png)**.

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
Cette section s'agit d'un résumé. Veuillez naviguer vers les autres documents _markdown_ pour la documentation intégrale.

**Planification du projet.** Avant de débuter notre travail, nous avons créé un plan général des composantes ainsi que des étapes du projet. Celui-ci se divise en trois composantes. La première composante est la génération de données, le deuxième composante est la visualisation, et la troisième composante est l’intégration des systèmes de génération et de visualisation.

**Compréhension des données.** Afin de mieux comprendre les données OD, nous avons créé des visualisations de base nous permettant de plus facilement aborder l’interpolation de ces données à l’aide de l’intelligence artificielle.

**Augmentation des données.** Nous avons procédé à une analyse des stratégies d’augmentation de données à l’aide de l’intelligence artificielle (IA). Nous avons considéré plusieurs modèles, mais avons finalement décidé de mettre à l’épreuve un modèle GAN (_Generative Adversarial Network_). Ce type de modèle entraîne, en fait, deux sous-modèles compétitifs. Le premier est génératif et crée de nouvelles données. Le second est discriminatif et évalue l’authenticité des données générées. Les deux sous-modèles tentent de se déjouer en succession, créant donc des nouvelles données imitant de plus en plus les données réelles. Toutefois, c’était un grand défi de créer un modèle de ce type qui fonctionne adéquatement. La complexité principale découle de la nature des données OD utilisées pour entraîner le modèle. En effet, un fichier de données OD contient des paramètres numériques (par exemple, un nombre d’automobiles) ainsi que des paramètres catégoriques (par exemple, le type de déplacement). Alors qu’il existe des méthodes permettant de traiter les deux types de paramètres par un même modèle, la tâche est particulièrement complexe. Nous avons tenté d’utiliser la méthode du _one-hot encoding_. En ce moment, nos résultats ne respectent toutefois pas la distribution de base souhaitée.

**Visualisation.** À l’origine, nous avons tenté deux méthodes de visualisation différentes. La première méthode est l’usage du module Python/Javascript deck.gl. Celui-ci offre un bon nombre d’outils préprogrammés permettant d’afficher des données cartographiques, certaines étant même animées. Alors que cette solution semblait idéale, des difficultés techniques à répétition nous empêchait de la mettre à l’œuvre. Au début, nous voulions utiliser les modules Python de deck.gl afin de plus facilement intégrer le modèle d’intelligence artificielle à la visualisation. Nous avons ainsi tenté d’animer un _TripsLayer_ de deck.gl. Toutefois, Python n’est pas conçu à la base pour la visualisation animée dans le cadre d’une application web. La seule manière d’y parvenir aurait été un _Jupyter Notebook_, un environnement de code interactif Python. Malheureusement, les versions plus récentes de deck.gl ne sont plus compatibles avec _Jupyter Notebook_. Nous avons donc abandonnée l’idée, préférant nous tourner vers la version Javascript de deck.gl, puisqu’elle intègre l’animation en format web à sa base. Encore une fois, malgré de nombreux essais, nous n’avons jamais réussi à faire fonctionner le module deck.gl. Ici, il s’agirait plutôt d’un manque d’expérience avec le langage Javascript. En parallèle, toutefois, nous travaillions sur la visualisation à l’aide de p5.js. Cette méthode portait déjà fruit : en attendant la complétion du modèle d’intelligence artificielle, nous pouvions visualiser des données réelles sur une carte fixe. Nous avons donc décidé de nous concentrer pleinement sur p5.js et d’abandonner deck.gl. Par la suite, nous avons réussi à intégrer l’importation de données par fichiers (format _CSV_) ainsi que par lien direct _GitHub_. Il est donc possible de téléverser des données pré-générées issues du modèle d’intelligence artificielle pour la visualisation dans l’application web. Toutefois, il n’est toujours pas possible de générer de nouvelles données à l’instant d’une demande de l’utilisateur : les données sont plutôt tirées d’une banque fixe. Il y aurait donc une limite théorique au nombre de nouveaux déplacements pouvant être visualisés. Ensuite, nous avons réussi à ajouter une carte interactive à l’application web en y intégrant _OpenStreetMap_. Il est donc possible de déplacer la carte ainsi que d’agrandir et de rétrécir le champ de vision. Cette modification fait diverger l’application en deux fichiers principaux. Le premier contient le code p5.js Javascript avec la logique programmée de l’application. Le deuxième contient du code HTML, créant une interface visuelle et interactive entre le code Javascript et l’utilisateur. Une intégration de l’_Open Street Routing Machine_ à l’application web permet de visualiser les déplacements issus des données origine-destination générées par le modèle d’intelligence artificielle.

<a name="dev-futur"></a>
**Développement futur.** L'application de visualisation pourrait être développée davantage en ajoutant une connexion directe vers le modèle d’intelligence artificielle. Un serveur opérerait le générateur de données en _backend_, permettant à l'utilisateur de faire des requêtes sur-demande au générateur depuis l'application (le _frontend_). Une fois le modèle d'intelligence artificielle perfectionné, il serait possible de lui faire une demande en mode unitaire ou en mode autonome. L'application pourrait aussi afficher davantage d'informations pertinentes dépendant du mode choisi. Par exemple, un déplacement unitaire pourrait afficher le temps du déplacement à l'aide d'un chronomètre.

## Guide de l'usager
Cliquez **[ici](https://github.com/AlBeck862/civ6707a-tp2a/blob/main/pdf/rapport-reseau-neuroness-loic.pdf)** pour lire le rapport de création du générateur de données de type GAN de Loïc.

Cliquez **ici (à venir)** pour lire le rapport de création du générateur de données de Tannaz.

Cliquez **[ici](https://github.com/AlBeck862/civ6707a-tp2a/blob/main/markdowns/guide_visualisation.md)** pour lire le tutoriel d'utilisation de l'application web.

## Description du code (documentation)
**Modèle d’intelligence artificielle (Python).**

Cliquez **[ici](https://github.com/AlBeck862/civ6707a-tp2a/tree/main/GAN-loic)** pour lire la documentation du code du générateur de données de type GAN de Loïc.

Cliquez **ici (à venir)** pour lire la documentation du code du générateur de données de Tannaz.

**Application web (p5.js Javascript).**

Cliquez **[ici](https://github.com/AlBeck862/civ6707a-tp2a/blob/main/visualisation/code_p5.md)** pour lire la documentation du code de l'application web.

## Limitations et actions correctives
**Génération.** Le générateur ne crée toujours pas des données respectant les distributions des données origine-destination réelles. Il faudrait donc optimiser le modèle choisi ou entièrement changer d'approche. De plus, seules les données origine-destination de l'arrondissement d'Ahuntsic-Cartierville ont été utilisées pour entraîner le modèle. Le modèle ne pourrait donc générer qu'uniquement de nouvelles données pour cet arrondissement, même s'il fonctionnait parfaitement. Il faudrait entraîner le modèle à l'aide d'un répertoire de données plus vaste, et tenter de généraliser les motifs à l'ensemble de la ville ou même de la province en entier.

**Visualisation.** Les données origine-destinations fournies ne contiennent pas d'information concernant l'heure d'arrivée des déplacements. Il est donc difficile, voire impossible, de déterminer une vitesse de déplacement peu importe le mode de transport. En ayant accès à cette information, les déplacements affichés seraient plus réalistes. Les différents modes pourraient aussi être traités différemment par le système. En ce moment, un déplacement en transport en commun sera traité de la même manière qu'un déplacement en automobile, peu importe les tracés d'autobus ou les lignes de métros disponibles. Ce problème découle de l'usage et l'application de OSRM. De plus, en général, le code p5.js est fragile. Il serait idéal de le mettre à jour afin de mieux gérer les erreurs potentielles. L'interface pourrait aussi être retravaillée, lui donnant une allure plus soignée et professionnelle.

**Intégration.** [Tel que discuté ci-haut](#dev-futur), un lien entre l'application web et le générateur de données pourrait être établi à l'aide d'un serveur, permettant à un utilisateur de générer des données sur-demande. Présentement, le générateur doit produire des données qui sont, par la suite, exportées en format CSV. Ce fichier CSV est ensuite téléversé à l'application de visualisation.

## Contributions
Tous les membres ont lu _The Nature of Code_ et ont contribué à la documentation.<br>
Loïc Miara : recherche au sujet du/développement du modèle d'intelligence artificielle<br>
Tannaz Jahaniaghdam : recherche au sujet du/développement du modèle d'intelligence artificielle<br>
Frédéric Cournoyer : développement de l'application de visualisation<br>
Anthony Pek : développement de l'application de visualisation<br>
Alexander Becker : développement de l'application de visualisation<br>
