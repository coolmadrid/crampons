// Construit w.js à partir de src/ : node build.js
const fs=require('fs');
const css=fs.readFileSync('src/style.css','utf8').replace(/\n+/g,'').trim();
const js=fs.readFileSync('src/moteur.js','utf8').trim();
fs.writeFileSync('w.js','(function(){if(document.getElementById("crs"))return;var s=document.createElement("style");s.id="crs";s.textContent='+JSON.stringify(css)+';document.head.appendChild(s)})();'+js+'\n');
console.log('w.js',fs.statSync('w.js').size,'octets');
