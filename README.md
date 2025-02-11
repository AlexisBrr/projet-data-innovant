# Notice explicative des différents tableaux de bord

Tout d'abord il est important de noter qu'il existe 3 tableaux de bord (TDB) distincts. Un tableau de bord est destiné aux cyclistes grenoblois, le second est destiné aux politiques locales de la commune de Grenoble et le dernier est à destination des acteurs de la base de données nationales des accidents.

Ce document prendra la forme d'une notice explicative de ces différents TDB en expliquant l'ensemble des opérations et manipulations réalisées pour les créer. Ce document est à destination des usagers souhaitant reprendre ou mieux comprendre le projet. Le fichier sera structuré en étapes.

Les fichiers de données utilisés dans ces tableaux de bord sont :
- accidentvelo_nettoye.csv (fichier obtenu après netoyage des données à l'aide du fichier python de nettoyage situé dans la branche nommé "Notebook-nettoyage du répertoire GitHub)
- OSMpistesGrenoble.csv
- points_noirs-38185.geojson

## Etape 1 - Télécharger Tableau Desktop (étape à passer si vous avez déjà l'application)

Se référer au site suivant pour télécharger Tableau Desktop : https://www.tableau.com/fr-fr/support/releases

## Etape 2 - Importer les données dans Tableau Desktop

Une fois l'ensemble des jeux de données réunis, la première étape est d'importer les données dans l'application. Pour ce faire, dans la partie de l'écran nommée **"Connexion"**, choisissez les extensions de fichier adaptées à ceux à importer. Soit :
- accidentvelo_nettoye.csv --> "A un fichier"/"Fichier texte"/*"Selectionner le fichier"*
- OSMpistesGrenoble.csv --> "A un fichier"/"Fichier texte"/*"Selectionner le fichier"*
- points_noirs-38185.geojson --> "A un fichier"/"Fichier de données spatiales"/*"Selectionner le fichier"*

## Etape 3 - Créer des colonnes calculées

Les jeux de données sont déjà préparés à être directmeent importer sans nettoyage et préparation. En revanche, pour le fichier accidentvelo_nettoye.csv, nous avons décidé de créer des colonnes calculées permettant de récupérer des plages horaires. Pour ce faire :
1. *Sélectionner* le fichier accidentvelo_nettoye.csv dans l'onglet **"Source de données"**
2. *Clique droit* sur un des champs du jeu de données, puis sélectionner **"Créer un champ calculé"** (une fenêtre s'ouvre)
3. *Nommer* cette colonne "Heures formatées", puis entrer le code suivant : **MAKETIME(INT(LEFT([Heure:Minute], 2)), INT(MID([Heure:Minute], 4, 2)), 0)**
4. *Cliquer* sur **OK**
5. *Clique droit* à nouveau sur un des champs du jeu de données, puis sélectionner **"Créer un champ calculé"** (une fenêtre s'ouvre)
6. *Nommer* cette colonne "Plage horaire", puis entrer le code suivant : **STR(DATEPART('hour', [Heures formatées])) + ":00 - " + STR(DATEPART('hour', [Heures formatées]) + 1) + ":00"**
7. *Cliquer* sur **OK**

## Etape 4 - Créer les visualisations

### 4.1. Pour les usagers

#### 4.1.1. Carte des différentes zones cyclables de la ville de Grenoble avec code couleur allant du rouge (déconseillée) au vert (conseillée)

Dans cette visualisation, le jeu de données utilisé est : OSMpistesGrenoble.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En colonnes, *placer* le champ **X** (longitude) et en lignes, *placer* le champs **Y** (latitude)
3. *Aller* dans "Montre-moi" et sélectionner **"Cartes de symboles"**
4. *Renommer* le champ **Ame D** en **"Type d'infrasructure"**
5. *Placer* le champ **Type d'infrastructure** dans les filtres et *sélectionner* "Afficher le filtre" pour qu'il aparaisse sur la page
6. *Glisser* le champ **Type d'infrastructure** dans les couleurs
7. *Glisser* le champs **"Revet D"** dans l'infobulle
8. *Modifier* le code couleur pour l'accessibilité de la visualisation

#### 4.1.2. Nombre d'accidents en fonction de la plage horaire cohérente de la journée

Dans cette visualisation, le jeu de données utilisé est : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En colonnes, *placer* le champ **"Plage horaire"** et en lignes, *placer* le champs **"Num acc"** en l'agrégeant comme ceci : Total (distinct)
3. *Aller* dans "Montre-moi" et sélectionner **"Barres horizontales"**
4. *Renommer*  le champ **Com** en **Commune**
5. *Placer* le champ *Commune* dans les filtres en sélectionnant seulement : **38185**
6. *Placer* le champ **"Statut Heure"** dans les filtres en sélectionnant seulement : **Cohérente** (cf. wiki pour comprendre l'histoire des heures cohérentes)
7. *Modifier* le code couleur pour l'accessibilité de la visualisation

#### 4.1.3. Nombre d'accidents en fonction du jour de la semaine

Dans cette visualisation, le jeu de données utilisé est : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En colonnes, *placer* le champ **Jour** et en lignes, *placer* le champs **"Num acc"** en l'agrégeant comme ceci : Total (distinct)
3. *Aller* dans "Montre-moi" et sélectionner **"Barres horizontales"**
5. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
6. *Modifier* le code couleur pour l'accessibilité de la visualisation

### 4.2. Pour les politiques locales

#### 4.2.1. Carte du croisement entre les plaintes des usagers et les accidents à vélo survenus pour la commune de Grenoble

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv et points_noirs-38185.geojson. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Sélectionner* la source : **points_noirs-38185.geojson**
3. En colonnes, *placer* le champ **"Longitude (générée)"** et en lignes, *placer* le champs **"Latitude (générée)"**
4. *Aller* dans "Montre-moi" et sélectionner **"Barres horizontales"**
5. *Placer* le champ *"Statut Coord"* dans les filtres en sélectionnant seulement : **Cohérentes**
6. *Glisser* le champs **Géométrie** dans les détails
7. *Appliquer* la couleur rouge pour ces points (plaintes des utilisateurs)
8. *Sélectionner* la source : **accidentvelo_nettoye.csv**
9. *Glisser* les champs **Longitude** et **Latitude** sur la carte dans la couche de la carte
10. Dans cette nouvelle couche de carte, **glisser** dans l'infobulle les champs suivants : Trajet, Sexe, Surf, Lum, Gravité et Atm
11. Dans les détails, *glisser* le champs **"Num acc"** en l'agrégeant comme ceci : Total
12. *Modifier* le code couleur pour l'accessibilité de la visualisation

#### 4.2.2. Nombre de personnes accidentées en fonction de la gravité des accidents

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En colonnes, *placer* le champ **"Num acc"** en l'agrégeant comme ceci : Total et en lignes, *placer* le champs **Gravité**
3. *Aller* dans "Montre-moi" et sélectionner **"Graphiques à puces"**
4. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
5. Dans les détails, *glisser* le champs **"Num acc"** en l'agrégeant comme ceci : Total (distinct)
6. *Modifier* le code couleur pour l'accessibilité de la visualisation

#### 4.2.3. Nombre d'accident(s) en fonction du type d'intersection

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Renommer* le champ **Int** en **Intersection**
3. En colonnes, *placer* le champ **"Num acc"** en l'agrégeant comme ceci : Total (distinct) et en lignes, *placer* le champs **Intersection**
4. *Aller* dans "Montre-moi" et sélectionner **"Barres horizontales"**
5. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
6. *Modifier* le code couleur pour l'accessibilité de la visualisation

### 4.3. Pour les acteurs de la base de données nationale des accidents

#### 4.3.1. Diagramme circulaire de la proportion de bonnes/mauvaises données pour les cordonnées 

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Choisir* le repère : **Secteurs**
3. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
4. *Glisser* le champ **"Statut Coord"** dans les couleurs
5. *Glisser* le champ **"Num acc"** en l'agrégeant comme ceci : Total (distinct) et Pourcentage du total dans l'angle
6. Dans l'étiquette, *glisser* les champs **"Num acc"** en l'agrégeant comme ceci : Total (distinct), **"Num acc"** en l'agrégeant comme ceci : Total (distinct) et Pourcentage du total et **"Statut Coord"**
7. *Modifier* le code couleur pour l'accessibilité de la visualisation

#### 4.3.2. Liste des coordonnées non cohérentes

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En lignes, *placer* les champs **Latitude** et **Longitude**
3. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
4. *Placer* le champ **"Statut Coord"** dans les filtres en sélectionnant seulement : **Non cohérentes**
5. Dans l'étiquette, *glisser* le champ **"Num acc"** en l'agrégeant comme ceci : Total (distinct)

#### 4.3.3. Diagramme circulaire de la proportion de bonnes/mauvaises données pour les données horaires

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Choisir* le repère : **Secteurs**
3. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
4. *Glisser* le champ **"Statut Heure"** dans les couleurs
5. *Glisser* le champ **"Num acc"** en l'agrégeant comme ceci : Total (distinct) et Pourcentage du total dans l'angle
6. Dans l'étiquette, *glisser* les champs **"Num acc"** en l'agrégeant comme ceci : Total (distinct), **"Num acc"** en l'agrégeant comme ceci : Total (distinct) et Pourcentage du total et **"Statut Heure"**
7. *Modifier* le code couleur pour l'accessibilité de la visualisation

#### 4.3.4. Lise des données horaires non cohérentes

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En lignes, *placer* le champ **Heure:Minute**
3. *Placer* le champ **Commune** dans les filtres en sélectionnant seulement : **38185**
4. *Placer* le champ **"Statut Heure"** dans les filtres en sélectionnant seulement : **Non cohérente**
5. Dans l'étiquette, *glisser* le champ **"Num acc"** en l'agrégeant comme ceci : Total (distinct)

#### 4.3.5. Evolution du nombre d'accident(s) recensé(s) en fonction des années

Dans cette visualisation, les jeux de données utilisé son : accidentvelo_nettoye.csv. Voici les étapes pour créer la visualisation :
1. *Ouvrir* une nouvelle feuille de calcul à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. En colonnes, *placer* le champ **"Date"** en ne prenant que l'année et en lignes, *placer* le champs **"Num acc"** en l'agrégeant comme ceci : Total (distinct)
3. *Aller* dans "Montre-moi" et sélectionner **"Lignes (continues)"**
4. *Placer* le champ **Commune** dans les filtres et afficher les filtres pour qu'ils aparaissent sur la page
5. *Glisser* le champ **Commune** dans les couleurs
6. *Modifier* le code couleur pour l'accessibilité de la visualisation

## Etape 5 - Créer les TDB

### 5.1. Pour les usagers

1. *Ouvrir* un nouveau tableau de bord à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Glisser-déposer* les feuilles de calculs associées à ce tableau de bord et mettre en forme la page du TDB

### 5.2. Pour les politiques locales

1. *Ouvrir* un nouveau tableau de bord à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Glisser-déposer* les feuilles de calculs associées à ce tableau de bord et mettre en forme la page du TDB

### 5.3. Pour les acteurs de la base de données nationale des accidents

1. *Ouvrir* un nouveau tableau de bord à l'aide du **"+"** situé à côté de l'onglet "Source de données"
2. *Glisser-déposer* les feuilles de calculs associées à ce tableau de bord et mettre en forme la page du TDB

## Etape 6 - Publier les TDB sur Tableau Public

Pour pouvoir publier les tableaux de bord, il est nécessaire de créer des extraits des sources de données. Pour ce faire, il suffit de *retourner* dans l'onglet **"Source de données"** et *sélectionner* **Extrait** (bouton situé en haut à droite) pour chacune des sources. Les sources de données seront dupliquées au format .hyper.

Maintenant, il faut retourner sur la page des tableaux de bord et *cliquer* sur "Serveur"/"Tableau Public"/"Enregistrer dans Tableau Public sous.../*"nommer le fichier"*

## Etape 7 - Mettre à jour les données si actualisation des jeux de données

Si les jeu de données sont voués à évoluer et à se mettre à jour. Il suffit de télécharger la dernière version des jeux de données et d'actualiser les extraits de données. Les changements se répliqueront sur les tableaux de bord.

***-------> Pour en savoir plus concernant le contexte et le but de ce projet, se référer au wiki présent sur ce répertoire GitHub<-------***
