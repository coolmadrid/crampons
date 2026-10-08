// Construit w.js à partir de src/ : node build.js
const fs=require('fs');
const css=(fs.readFileSync('src/style.css','utf8')+fs.readFileSync('src/v7.css','utf8')+fs.readFileSync('src/v8.css','utf8')+fs.readFileSync('src/v9.css','utf8')+fs.readFileSync('src/v10.css','utf8')+fs.readFileSync('src/v11.css','utf8')).replace(/\/\*[\s\S]*?\*\//g,'').replace(/\n+/g,'').trim();
const js=fs.readFileSync('src/moteur.js','utf8').replace('/*BLOCS*/',()=>fs.readFileSync('src/blocs.js','utf8').trim()+'\n'+fs.readFileSync('src/tel.js','utf8').trim()+'\n'+fs.readFileSync('src/v9.js','utf8').trim()+'\n'+fs.readFileSync('src/v10.js','utf8').trim()+'\n'+fs.readFileSync('src/v11.js','utf8').trim()).trim();
fs.writeFileSync('w.js','(function(){if(document.getElementById("crs"))return;var s=document.createElement("style");s.id="crs";s.textContent='+JSON.stringify(css)+';document.head.appendChild(s)})();'+js+'\n');
console.log('w.js',fs.statSync('w.js').size,'octets');
