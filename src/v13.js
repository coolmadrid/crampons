/* ===== v8.4 : widgets longs sur téléphone (repli des stats, pages, rendu allégé) ===== */
(function(){var MOB=function(){try{return innerWidth<600||matchMedia('(pointer:coarse)').matches}catch(e){return innerWidth<600}},
FOLD={BUL:1,ST:1,MO:1,UNE:1,PIC:1,FOL:1,ACH:1,LIG:1,'LIG+':1,CAL:1,KO:1,XI:1,VEST:1},LIM=2200,PG=1500,done=false,tries=0;
function keep(el){return el.classList.contains('fchat')||el.classList.contains('tvtk')||el.classList.contains('totop')||el.classList.contains('goal')}
function fold(){var live=G.classList.contains('live'),grp=[];[].slice.call(G.children).forEach(function(el){var k=el.dataset&&el.dataset.k;if(!k)return;if(FOLD[k]||(k=='L'&&!live&&G.querySelector('[data-k="BUL"]')))grp.push(el)});
if(grp.length<2)return;var d=H('details','f13'),s=H('summary','',(G.querySelector('[data-k="BUL"]')?'📊 Notes, stats et presse':'📊 Détails')+' <small>('+grp.length+')</small>');d.appendChild(s);grp[0].before(d);grp.forEach(function(el){d.appendChild(el)})}
function pages(){var ch=[].slice.call(G.children),i0=-1;for(var i=0;i<ch.length;i++)if(ch[i].dataset&&ch[i].dataset.k){i0=i;break}if(i0<0)return;
var body=ch.slice(i0).filter(function(el){return !keep(el)});if(!body.length)return;var P=[[]],acc=0;
body.forEach(function(el){var h=el.offsetHeight||0;if(acc>0&&acc+h>PG&&!(el.dataset&&el.dataset.k=='p'&&h<120&&acc+h<PG*1.25)){P.push([]);acc=0}P[P.length-1].push(el);acc+=h});
if(P.length<2)return;var cur=0,nav=H('div','pg13'),pv=H('button','',"◂ Précédent"),lb=H('span',''),nx=H('button','',"Suite ▸");pv.type=nx.type='button';nav.appendChild(pv);nav.appendChild(lb);nav.appendChild(nx);
var last=body[body.length-1];last.after(nav);
function go(n,sc){cur=Math.max(0,Math.min(P.length-1,n));P.forEach(function(p,j){p.forEach(function(el){el.classList.toggle('h13',j!=cur)})});lb.textContent=(cur+1)+' / '+P.length;pv.disabled=cur==0;nx.textContent=cur==P.length-1?'Fin':'Suite ▸';nx.disabled=cur==P.length-1;if(sc)try{G.scrollIntoView({block:'start'})}catch(e){}}
pv.onclick=function(){go(cur-1,1)};nx.onclick=function(){go(cur+1,1)};go(0,0);G.classList.add('pg')}
function run(){if(done||!G)return;if(!MOB())return;if(G.classList.contains('cinp')||G.classList.contains('live')){if(++tries<40)setTimeout(run,1500);return}
if(G.scrollHeight<LIM)return;done=true;G.classList.add('g13');fold();if(G.scrollHeight>LIM)pages()}
setTimeout(run,800)})();
