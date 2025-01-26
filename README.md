# Nettoyage et préparation des données

Dans cette partie, nous allons vous présenter point par point l'ensemble des traitements qui ont été réalisés sur nos jeux de données.Premièrement, les jeux de données que nous avons transformé sont les suivants :
- Jeu de données des ghostbikes obtenus à l'aide d'une requête overpass (données qui seront utilisées en tant qu'accidents mortels dans le fichier des accidents de vélo),
- Jeu de données des accidents de vélo provenant du site data.gouv.

## Jeu de données des ghostbikes

Pour donner du contexte à ce jeu de données, un ghostbike représente une stèle sous forme d'un vélo blanc en hommage aux victimes d'accidents de la route à vélo.

Comme précédemment expliqué, ce jeu de données provient d'une requête overpass qui nous renvoie un fichier geojson comportant l'ensemble des données des ghostbikes. Afin de le traiter facilement, nous avons ciblé les données à conserver. Celles-ci correspondent aux coordonnées géographiques (longitudes, latitudes) et à la date de l'accident. Puis, nous avons enregistré le nouveau fichier filtré au format csv. Pour finir, nous avons ajouté une variable statut à ce jeu de données permettant d'identifier que l'accident a été mortel.

## Jeu de données des accidents

Ce jeu de données publique est composé de l'ensemble des accidents de vélo recensé de 2005 à 2019 en France. Dans le cadre de notre analyse, nous avons commencé par filtrer les données selon le code INSEE de la commune de Grenoble (38185). En faisant cela, nous avons réduit le jeu de données afin d'améliorer les performances du traitement. Pour la commune de Grenoble, ce jeu de données est composé de 337 accidents entre 2005 et 2019. En analysant plus précisemment le jeu de données, celui-ci est composé de 39 variables ayant toutes des caractéristiques particulières. Quelques variables possèdent des valeurs manquantes. Aucun traitement ne sera réalisé sur ces données manquantes car ce sont des variables catégorielles et les données seront conservé malgré les données manquantes car, au vue du peu de données que nous avons, chaque observation est très importante pour évaluer des accidents.
Ensuite, nous avons remplacé le séparateur des décimales "," par des "." afin de rendre les données numériques traitable par la machine. Ce remplacement de valeurs a été réalisé sur les longitudes et les latitudes.

Puis, nous avons décidé de créer deux variables permettant de piloter la qualité des données. La création de variables pour mesurer la qualité des données est une étape importante car nous avons basé nos analyses sur deux axes, l'axe général des accidents et l'axe géographique. En revanche, nous avons remarqué que beaucoup de données étaient composées de dates et de coordonnées géographiques erronnées. Il est donc nécéssaire, pour filtrer les données pertinentes ou non, d'avoir accès à des variables de qualité. Nous avons donc crée un statut pour les heures et les cordonnées "latitude" et "longitude". Après analyses :
- Pour les données horaires, nous avons 241 accidents avec des heures cohérentes et 96 avec des heures incohérentes,
- Pour les données géographiques, nous avons seulement 64 accidents avec des coordonnées cohérentes, tandis que nous en avons 273 avec des coordonnées incohérentes.
Nous pouvons voir que l'analyse de l'axe géographique sera plus pauvre en quantité de données.

Après avoir réalisé l'ensemble des étapes précédentes, nous avons décidé remplacé les données d'échelles des variables identifiées comme les plus importantes par leur valeur réelle à l'aide du fichier "accidents-velos-schema.json" qui représente les métadonnées. En faisant cela, les résultats du tableau de bord seront plus lisibles et compréhensibles par les lecteurs/utilisateurs.

Pour finir, ce processus, nous avons ajouté au jeu de données de base, les données des ghostbikes précédemment identifées et préparées. Nous avons donc, finalement, 339 accidents car nous avons ajouté 2 ghostbikes.