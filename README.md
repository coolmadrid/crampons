# Crampons · widget

Moteur du widget de la partie Crampons (jeu de rôle avec Claude). `w.js` est la version minifiée chargée par le widget via jsDelivr ; `src/` contient le code lisible.

Utilisation : `<div id=g></div><script>window.D={...}</script><script src="https://cdn.jsdelivr.net/gh/coolmadrid/crampons@COMMIT/w.js"></script>`

Construction : `node build.js` (assemble `src/style.css` et `src/moteur.js` dans `w.js`, sans dépendance).

v5 : planificateur de semaine `D.w` :
`w:{c:2, x:[5,10,"PHY"], g:[["Voir des proches","🏠",["Hélène","Farmor"],"sous-titre"]], t:[["DRI",2],["PHY",2]], tb:4, td:12, m:"Strasbourg (ext.) · dim. 26"}`
`c` créneaux de base, `x` jet pour un créneau en plus (bonus, DD, attribut), `g` catégories (nom, emoji, suggestions, sous-titre ; champ libre inclus), `t` attributs à entraîner (nom, coches, coches max = 4), `tb`/`td` bonus et DD de l'entraînement, `m` match (jouer ou simuler).

v6.2 : fiches des personnages complétées (109 fiches, 80 alias). Recherche tolérante : accents, majuscules, titres (Mme, M., Maître, le, l'), prénom ou nom seul (« Fabrice Guérin », « Guerin », « Le journaliste turc »). Fiche avec ligne de stats quand elles sont connues. La jauge de `P` s'applique aussi sous un autre nom du même personnage (`P:{Théo:100}` vaut pour « Théo Garnier »). Ajouter un personnage : une ligne dans `PJ` (`'Nom':['emoji','rôle','MBTI','note poste','stats']`), un alias dans `AL`.
