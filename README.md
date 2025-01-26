# Nettoyage et préparation des données

Dans cette partie, nous allons vous présenter point par point l'ensemble des traitements qui ont été réalisés sur nos jeux de données.Premièrement, les jeux de données que nous avons transformé sont les suivants :
- Jeu de données des ghostbikes obtenus à l'aide d'une requête overpass (données qui seront utilisées en tant qu'accidents mortels dans le fichier des accidents de vélo),
- Jeu de données des accidents de vélo provenant du site data.gouv

## Jeu de données des ghostbikes

Pour donner du contexte à ce jeu de donénes, un ghostbike représente une stèle sous forme d'un vélo blanc en hommage aux victimes d'accidents de la route à vélo.

Comme précédemment expliqué, ce jeu de données provient d'une requête overpass qui nous renvoie un fichier geojson comportant l'ensemble des données des ghostbikes. Afin de le traiter facilement, nous avons ciblé les données à conserver. Celles-ci correspondent aux coordonnées géographiques (longitudes, latitudes) et à la date de l'accident. Puis, nous avons enregistré le nouveau fichier filtré au format csv. Pour finir, nous avons ajouté une variable statut à ce jeu de données permettant d'identifier que l'accident a été mortel.

## Jeu de données des accidents

Ce jeu de données publique est composé de l'ensemble des accidents de vélo recensé de 2005 à 2019 en France. Dans le cadre de notre analyse, nous avons commencé par filtrer les données selon le code INSEE de la commune de Grenoble (38185). En faisant cela, nous avons réduit le jeu de données afin d'améliorer les performances du traitement.