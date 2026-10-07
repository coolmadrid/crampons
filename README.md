# Crampons · widget

Moteur du widget de la partie Crampons (jeu de rôle avec Claude). `w.js` est la version minifiée chargée par le widget via jsDelivr ; `src/` contient le code lisible.

Utilisation : `<div id=g></div><script>window.D={...}</script><script src="https://cdn.jsdelivr.net/gh/coolmadrid/crampons@COMMIT/w.js"></script>`

Construction : `node build.js` (assemble `src/style.css` et `src/moteur.js` dans `w.js`, sans dépendance).

v5 : planificateur de semaine `D.w` :
`w:{c:2, x:[5,10,"PHY"], g:[["Voir des proches","🏠",["Hélène","Farmor"],"sous-titre"]], t:[["DRI",2],["PHY",2]], tb:4, td:12, m:"Strasbourg (ext.) · dim. 26"}`
`c` créneaux de base, `x` jet pour un créneau en plus (bonus, DD, attribut), `g` catégories (nom, emoji, suggestions, sous-titre ; champ libre inclus), `t` attributs à entraîner (nom, coches, coches max = 4), `tb`/`td` bonus et DD de l'entraînement, `m` match (jouer ou simuler).
