/* ===== v8.4 : widgets longs sur téléphone (repli des stats, rendu allégé) ===== */
(function(){var MOB=function(){try{return innerWidth<600||matchMedia('(pointer:coarse)').matches}catch(e){return innerWidth<600}},
FOLD={BUL:1,ST:1,MO:1,UNE:1,PIC:1,FOL:1,ACH:1,LIG:1,'LIG+':1,CAL:1,KO:1,XI:1,VEST:1},LIM=2200,done=false;
function fold(){if(done||!MOB()||!G)return;var h=G.scrollHeight;if(h<LIM)return;done=true;G.classList.add('g13');
var live=G.classList.contains('live'),grp=[];[].slice.call(G.children).forEach(function(el){var k=el.dataset&&el.dataset.k;if(!k)return;if(FOLD[k]||(k=='L'&&!live&&G.querySelector('[data-k="BUL"]')))grp.push(el)});
if(grp.length<2)return;var d=H('details','f13'),s=H('summary','',(G.querySelector('[data-k="BUL"]')?'📊 Notes, stats et presse':'📊 Détails')+' <small>('+grp.length+')</small>');d.appendChild(s);grp[0].before(d);grp.forEach(function(el){d.appendChild(el)});
d.addEventListener('toggle',function(){try{dispatchEvent(new Event('resize'))}catch(e){}})}
setTimeout(fold,700);setTimeout(fold,2000)})();
