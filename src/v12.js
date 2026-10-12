/* ===== v8 · 1. match en temps réel : mode "live" ===== */
FIN.push(function(){if(!window.__crlive)return;
var MIN=function(s){var m=/(\d+)(?:\s*\+\s*(\d+))?/.exec(String(s||''));return m?+m[1]+(m[2]?+m[2]:0):null},
endM=MIN(MI)||90,items=[],cards=[];
/* collecte des éléments datés */
[].forEach.call(G.querySelectorAll('.frz .fre,.tlm .ev,.sub[data-m],.tf[data-m]'),function(e){var m=+e.dataset.m;if(!isNaN(m)&&e.dataset.m!=='')items.push({m:m,el:e,t:e.classList.contains('tf')?'tf':e.classList.contains('sub')?'sub':'ev',x:e.textContent.trim()})});
[].forEach.call(G.querySelectorAll('.rl.crdx,.var'),function(e){cards.push(e)});
/* cartons et VAR sans minute : à la minute de l'événement de frise qui en parle, sinon après le dernier */
cards.forEach(function(c){var tx=NZ(c.textContent).slice(0,30),hit=null;items.forEach(function(it){if(it.t=='ev'&&!hit&&NZ(it.x).indexOf(tx.slice(0,14))>-1)hit=it});items.push({m:hit?hit.m:(items.length?Math.max.apply(null,items.map(function(i){return i.m})):endM-1),el:c,t:'card',x:c.textContent.trim()})});
/* blocs de fin : stats, domination, bulletin, ambiance finale, choix */
var ENDS=[].slice.call(G.querySelectorAll('.stt,.mo,.bul,.q,.op,.se,.ck,textarea,input,.sb,.er,.cm,.totop,.rcp2,.lbt,.long,.pm')),
startM=Math.max(0,Math.min.apply(null,items.map(function(i){return i.m}).concat([endM]))-1);
var goalM=D.but?endM:null;
items.sort(function(a,b){return a.m-b.m});items.forEach(function(it){it.el.classList.add('lvh')});ENDS.forEach(function(e){e.classList.add('lvh')});
/* commande */
var bar=H('div','lvbar'),mn=H('b','lvm',startM+"'"),pl=H('button','lvp','⏸'),sp=H('button','lvs','×1'),ff=H('button','lvf','⏭ Fin'),nx=H('span','lvn','');[pl,sp,ff].forEach(function(b){b.type='button'});
bar.appendChild(H('i','lvdot'));bar.appendChild(mn);bar.appendChild(nx);bar.appendChild(pl);bar.appendChild(sp);bar.appendChild(ff);
var tb=G.querySelector('.tbr');tb.after(bar);G.classList.add('lvon');
var cur=startM,sec=0,spd=1,paused=0,done=0,ti=null,SPM=3,hd2=G.querySelector('.hd .mi'),bug=function(){return G.querySelector('.tvmi')};
function setClock(){var t=cur+"'"+(sec?'':'');mn.textContent=cur+':'+(sec<10?'0':'')+sec;if(hd2)hd2.innerHTML='<span class="mim">'+cur+'</span><span class="mis">:'+(sec<10?'0':'')+sec+'</span>';var b=bug();if(b)b.textContent=cur+':'+(sec<10?'0':'')+sec;var n=items.filter(function(i){return i.m>cur})[0];nx.textContent=n?'prochain : '+n.m+"'":'';}
function reveal(it){it.el.classList.remove('lvh');it.el.classList.add('lvin');try{it.el.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}
var kind=it.t=='tf'?'tf':/rouge/i.test(it.x)?'rouge':/jaune|averti/i.test(it.x)?'jaune':/\bbut\b|⚽|marque|égalis/i.test(it.x)?'but':it.t=='sub'?'sub':/var/i.test(it.x)?'var':'ev';
if(CHT&&CHT._burst&&G.classList.contains('chat'))CHT._burst({t:kind,x:it.x,m:it.m+"'"});
if(kind=='but'&&!D.but)flashGoal();if(it.t=='tf'){pause(1);var r=H('button','lvr','▶ Reprendre le match');r.type='button';r.onclick=function(){r.remove();pause(0)};it.el.appendChild(r)}}
function flashGoal(){var go=H('div','goal','<b class="gob">BUUUT !</b>'+(typeof D.but=='string'?'<span>'+E(D.but)+'</span>':'')+'<em>'+E(SC[1])+' '+SC[2]+' - '+SC[3]+' '+E(SC[4])+'</em>');G.appendChild(go);var ca=clb(SC[1]),cb=clb(SC[4]);setTimeout(function(){boom(go,[ca[1],ca[2],cb[1],cb[2],'#fff'],60)},150);setTimeout(function(){go.classList.add('out')},3000);setTimeout(function(){go.remove()},3600);var sco=G.querySelector('.hd .sco');if(sco){sco.classList.remove('pop');void sco.offsetWidth;sco.classList.add('pop')}}
function tick(){if(paused||done)return;sec+=spd;while(sec>=SPM*4){sec-=SPM*4;cur++;items.forEach(function(it){if(!it.done&&it.m<=cur){it.done=1;reveal(it)}});if(goalM!=null&&cur>=goalM&&!D.__g){D.__g=1;flashGoal()}if(cur>=endM)return finish()}setClock()}
function finish(){done=1;clearInterval(ti);cur=endM;sec=0;setClock();items.forEach(function(it){if(!it.done){it.done=1;it.el.classList.remove('lvh');it.el.classList.add('lvin')}});ENDS.forEach(function(e){e.classList.remove('lvh');e.classList.add('lvin')});bar.classList.add('end');mn.textContent=endM+"'";nx.textContent='fin du direct';pl.disabled=1;ff.disabled=1;G.classList.remove('lvon');var q=G.querySelector('.q')||G.querySelector('.op');if(q)setTimeout(function(){try{q.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}},400)}
function pause(p){paused=p;pl.textContent=p?'▶':'⏸';bar.classList.toggle('pz',!!p)}
pl.onclick=function(){pause(!paused)};sp.onclick=function(){spd=spd==1?2:spd==2?4:1;sp.textContent='×'+spd};ff.onclick=finish;
setClock();ti=setInterval(tick,250);
/* les événements déjà passés au départ (minute < départ) : rien, le départ est calé avant le premier */
});

/* ===== v8 · 2. saison : épisode, arcs, générique de fin, frise, bande-annonce ===== */
var SEASK='crseason',ARCS0=['Lyes','Théo','Momo','Gérard','Famille','Romance','Sélection'];
function seasonLoad(){try{return JSON.parse(sg(SEASK)||'{"ep":[],"arc":{}}')}catch(e){return {ep:[],arc:{}}}}
function seasonSave(o){try{ss(SEASK,JSON.stringify(o))}catch(e){}}
var SEAS=seasonLoad(),EPI=null;
/* épisode : D.ep=[numéro,titre] ou ["EP",n,titre] dans s */
if(D.ep)EPI={n:D.ep[0],t:D.ep[1]||''};
BK.EP=function(i){EPI={n:i[1],t:i[2]||''};return null};
BK.ARC=function(i){var n=i[1],d=i[2];if(!n)return null;var a=SEAS.arc[n]||{v:0,h:[]};var dv=typeof d=='number'?d:(/^\+/.test(String(d))?1:/^-|^−/.test(String(d))?-1:0),ak=HSH(HH+(D.q||'')+n+d+(i[3]||''));if(!a.h.some(function(x){return x[3]==ak})){a.v=Math.max(-5,Math.min(5,(a.v||0)+dv));a.h.push([HH.split(' · ')[0]||'',dv,i[3]||'',ak]);if(a.h.length>30)a.h.shift();SEAS.arc[n]=a;seasonSave(SEAS)}
var el=H('div','nt '+(dv>0?'up':dv<0?'dn':'')+' arcn','<i>'+(dv>0?'▲':dv<0?'▼':'•')+'</i>Arc '+E(n)+(i[3]?' · '+E(i[3]):'')+'<small>'+a.v+'</small>');return el};
BK.TEASER=function(i){SEAS.teaser=[i[1]||'',i[2]||''];seasonSave(SEAS);return null};
FIN.push(function(){
/* en-tête : épisode */
if(EPI){var hd=G.querySelector('.hd');if(hd){var e=H('div','epb','<span>Épisode '+E(String(EPI.n))+'</span>'+(EPI.t?'<b>'+E(EPI.t)+'</b>':''));hd.after(e)}}
/* journal de saison : une entrée par scène distincte */
var key=HSH(HH+(D.q||'')),date=HH.split(' · ').filter(function(x){return /\d{4}|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/i.test(x)})[0]||HH.split(' · ')[0]||'',
ent={k:key,d:date,h:HH,ep:EPI?EPI.n:null,t:EPI?EPI.t:'',sc:SC?SC[1]+' '+SC[2]+'-'+SC[3]+' '+SC[4]:'',n:N0,ch:null,une:null,ach:[],ppl:[]};
(D.s||[]).forEach(function(i){if(!Array.isArray(i))return;if(i[0]=='CH')ent.ch=i[1];if(i[0]=='UNE'&&!ent.une)ent.une=[i[1],i[2]];if(i[0]=='ACH')ent.ach.push(i[1]);if(!BK[i[0]]&&['+','=','T','K','J','C','S','~','O','L','#','Aden'].indexOf(i[0])<0&&typeof i[1]=='string'&&who(i[0])&&ent.ppl.indexOf(i[0])<0)ent.ppl.push(i[0])});
if(!SEAS.ep.some(function(x){return x.k==key})){SEAS.ep.push(ent);if(SEAS.ep.length>120)SEAS.ep.shift();seasonSave(SEAS)}
/* bouton Saison dans la barre */
var tb=G.querySelector('.tbr');if(!tb)return;var b=H('button','','📅 Saison');b.onclick=function(){var o=G.querySelector('.seas');if(o){o.remove();b.classList.remove('on');return}b.classList.add('on');G.insertBefore(seasonView(),tb.nextSibling)};tb.appendChild(b);
});
function seasonView(){var el=H('div','seas'),S=seasonLoad(),EP=S.ep.slice().reverse();
el.innerHTML='<div class="ligh"><b>📅 Ta saison</b><small>'+S.ep.length+' scène'+(S.ep.length>1?'s':'')+'</small></div>';
/* arcs */
var ar=H('div','arcs');ARCS0.concat(Object.keys(S.arc).filter(function(k){return ARCS0.indexOf(k)<0})).forEach(function(n){var a=S.arc[n]||{v:0,h:[]},v=a.v||0,last=a.h.length?a.h[a.h.length-1]:null;ar.appendChild(H('div','arc'+(v>0?' up':v<0?' dn':'')+(last?'':' dorm'),'<b>'+E(n)+'</b><span class="arcb"><i style="width:'+((v+5)/10*100)+'%"></i></span><small>'+(last?(last[0]||'')+(last[2]?' · '+E(last[2]):''):'dort')+'</small>'))});el.appendChild(H('div','arch','Les arcs'));el.appendChild(ar);
/* frise */
el.appendChild(H('div','arch','La frise'));var fr=H('div','frise');if(!EP.length)fr.appendChild(H('small','','Rien encore. Les scènes s\'ajoutent au fil du jeu.'));
EP.forEach(function(e){var cur=e.k==HSH(HH+(D.q||''));fr.appendChild(H('div','frs'+(cur?' cur':'')+(e.ch?' chap':'')+(e.sc?' mt':''),'<i>'+(e.ch?'📖':e.sc?'⚽':e.une?'🗞️':'•')+'</i><span class="frsd">'+E(e.d)+(e.ep?' · ép. '+E(String(e.ep)):'')+'</span><b>'+E(e.ch||e.t||(e.sc?e.sc:(e.une?e.une[1]:e.h.split(' · ').slice(-1)[0])))+'</b>'+(e.sc&&e.ch?'<small>'+E(e.sc)+'</small>':'')+(e.une&&!e.ch?'<small>'+E(e.une[0])+'</small>':'')+(e.ach.length?'<small>🏅 '+E(e.ach.join(', '))+'</small>':'')+(e.n?'<em>'+E(String(e.n))+'</em>':'')))});
el.appendChild(fr);if(S.teaser&&S.teaser[0])el.appendChild(H('div','tez','<small>Prochainement</small><b>'+E(S.teaser[0])+'</b>'+(S.teaser[1]?'<span>'+E(S.teaser[1])+'</span>':'')));
var x=H('button','rcn','Effacer la saison');x.onclick=function(){if(x.dataset.c){ss(SEASK,null);el.remove()}else{x.dataset.c=1;x.textContent='Sûr ? Toucher encore'}};el.appendChild(x);return el}
/* générique de fin après envoi */
(function(){var oS=window.sendPrompt;if(typeof oS!='function')return;window.sendPrompt=function(s){try{oS(s)}finally{try{credits(s)}catch(e){}}}})();
function credits(sent){if(G.querySelector('.cred')||!/^>/m.test(String(sent||'')))return;var S=seasonLoad(),ppl=[],seen={};(D.s||[]).forEach(function(i){if(Array.isArray(i)&&!BK[i[0]]&&['+','=','T','K','J','C','S','~','O','L','#','Aden'].indexOf(i[0])<0&&typeof i[1]=='string'){var w=who(i[0]);if(w&&!seen[i[0]]){seen[i[0]]=1;ppl.push([i[0],w])}}});
var ch=String(sent).split('\n').filter(function(l){return /^>/.test(l)})[0]||'',jet=String(sent).split('\n').filter(function(l){return /^\[Jet\]/.test(l)})[0]||'';
var ov=H('div','cred'),roll=H('div','credr');roll.innerHTML='<div class="credt"><small>'+(EPI?'Fin de l\'épisode '+E(String(EPI.n)):'Fin de scène')+'</small><b>'+E(EPI&&EPI.t?EPI.t:(HH.split(' · ').slice(-1)[0]||'Crampons'))+'</b></div>'+(ch?'<div class="credc"><small>Ton choix</small>'+E(ch.replace(/^>\s*/,''))+'</div>':'')+(jet?'<div class="credc"><small>Ton jet</small>'+E(jet.replace(/^\[Jet\]\s*/,'').split(' : ').slice(-1)[0])+'</div>':'')+'<div class="credh">Avec</div>'+ppl.map(function(p){return '<div class="credp"><i>'+p[1][0]+'</i><b>'+E(p[0])+'</b><small>'+E(p[1][1]||'')+'</small></div>'}).join('')+'<div class="credp me"><i>'+AD()+'</i><b>Aden Sorensen</b><small>le Renard</small></div>'+(S.teaser&&S.teaser[0]?'<div class="credz"><small>Prochainement</small><b>'+E(S.teaser[0])+'</b></div>':'')+'<div class="credf">CRAMPONS</div>';
ov.appendChild(roll);var sk=H('button','csk','Passer ▸');sk.type='button';sk.onclick=function(){ov.remove();G.classList.remove('cinp')};ov.appendChild(sk);G.classList.add('cinp');G.insertBefore(ov,G.firstChild);try{G.scrollIntoView({block:'start'})}catch(e){}
var dur=6000+ppl.length*900;roll.style.animationDuration=dur+'ms';setTimeout(function(){if(ov.parentNode){ov.classList.add('end');setTimeout(function(){ov.remove();G.classList.remove('cinp')},800)}},dur+1200)}

/* ===== v8.0 : mémoire du portable (SMS, mails, photos, notes, banque, agenda gardés d'une scène à l'autre) ===== */
var MEMK='crmem',MEMOK=(function(){try{localStorage.setItem('crt','1');localStorage.removeItem('crt');return true}catch(e){return false}})(),
MCAP={m:60,conv:25,mail:30,ph:40,no:20,bank:15};
function memLoad(){try{var o=JSON.parse(sg(MEMK)||'null');if(o&&o.conv)return o}catch(e){}return {v:1,u:0,conv:{},mail:[],ph:[],no:[],bank:[],ag:null}}
function memSave(o){try{localStorage.setItem(MEMK,JSON.stringify(o));return true}catch(e){return false}}
function memScan(L){var R={conv:[],mail:[],ph:[],no:[],bank:[],ag:[]},cur=null;
function cv(t){for(var q=0;q<R.conv.length;q++)if(same(R.conv[q].t,t))return R.conv[q];var c={t:t,m:[]};R.conv.push(c);return c}
(L||[]).forEach(function(i){if(!Array.isArray(i))return;var k=i[0];
if(k=='SMS')cur={t:i[1],hd:1};
else if(k=='S'){if(!cur||(!cur.hd&&i[1]!='Aden'&&!same(cur.t,i[1])))cur={t:i[1]=='Aden'?(cur&&cur.t)||'Messages':i[1]};cv(cur.t).m.push(i)}
else{cur=null;if(k=='@')R.mail.push(i);else if(k=='PH')R.ph=R.ph.concat(i[1]||[]);else if(k=='NO')R.no.push(i);else if(k=='BANK')R.bank.push(i);else if(k=='AG')R.ag=R.ag.concat(i[1]||[])}});return R}
function mh(x){return HSH(JSON.stringify(x))}
var MEMD=null;
FIN.unshift(function(){
var key=HSH(HH+(D.q||'')),date=HH.split(' · ').filter(function(x){return /\d{4}|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/i.test(x)})[0]||HH.split(' · ')[0]||'',
R=memScan(D.s),M=memLoad(),NOW={};
R.conv.forEach(function(c){c.m.forEach(function(i){NOW[mh(i)]=1})});['mail','ph','no','bank'].forEach(function(f){R[f].forEach(function(i){NOW[mh(i)]=1})});
/* 1. le passé dans le portable (avant qu'il soit construit) */
if(TELM&&TEL&&MEMOK){
var OC=Object.keys(M.conv).map(function(z){return M.conv[z]}).sort(function(a,b){return (b.u||0)-(a.u||0)});
OC.forEach(function(oc){var old=oc.m.filter(function(e){return e[1]!=key&&!NOW[e[0]]});if(!old.length)return;
var arr=[],ld=null;old.forEach(function(e){if(e[2]&&e[2]!=ld){ld=e[2];arr.push(['S','Aden',ld,'',{sep:1}])}var it=e[3];it.old=1;arr.push(it)});
var c=convOf(oc.t);if(c){if(c.m.length)arr.push(['S','Aden','Nouveau · '+(date||'aujourd\'hui'),'',{sep:1,nw:1}]);c.m=arr.concat(c.m);c.d=null}else TD.conv.push({t:oc.t,m:arr,read:1})});
function past(f,fix){return M[f].filter(function(e){return e[1]!=key&&!NOW[e[0]]}).reverse().map(function(e){var x=JSON.parse(JSON.stringify(e[3]));x.old=1;if(fix)fix(x);return x})}
TD.mail=TD.mail.concat(past('mail',function(x){x[5]=Object.assign({},x[5]||{},{lu:1});x.rd=1}));
TD.ph=TD.ph.concat(past('ph'));TD.no=TD.no.concat(past('no'));TD.bank=TD.bank.concat(past('bank'));
if(!TD.ag.length&&M.ag&&M.ag.k!=key)TD.ag=M.ag.l||[]}
/* 2. la scène dans la mémoire */
if(!MEMOK)return;
function put(L,i){var h=mh(i);if(!L.some(function(e){return e[0]==h}))L.push([h,key,date,i])}
R.conv.forEach(function(c){var z=NZ(c.t),oc=null;for(var y in M.conv)if(same(M.conv[y].t,c.t)){oc=M.conv[y];break}if(!oc)oc=M.conv[z]={t:c.t,m:[]};var n0=oc.m.length;c.m.forEach(function(i){put(oc.m,i)});if(oc.m.length>n0)oc.u=++M.u;if(oc.m.length>MCAP.m)oc.m=oc.m.slice(-MCAP.m)});
var ks=Object.keys(M.conv).sort(function(a,b){return (M.conv[b].u||0)-(M.conv[a].u||0)});ks.slice(MCAP.conv).forEach(function(z){delete M.conv[z]});
['mail','ph','no','bank'].forEach(function(f){R[f].forEach(function(i){put(M[f],i)});if(M[f].length>MCAP[f])M[f]=M[f].slice(-MCAP[f])});
/* l'ordre d'affichage : le plus récent d'abord */
['mail','ph','no','bank'].forEach(function(f){M[f].sort(function(a,b){return (a[1]==key?1:0)-(b[1]==key?1:0)})});
if(R.ag.length)M.ag={k:key,d:date,l:R.ag};
if(!M.first)M.first=date;memSave(M)});
/* repli visible si le stockage ne marche pas */
FIN.push(function(){if(TELM&&TEL&&!MEMOK&&TEL.parentNode)TEL.parentNode.insertBefore(H('div','memko','📵 Mémoire du portable indisponible ici : seul le contenu de cette scène s\'affiche. Réglages ▸ Exporter reste possible.'),TEL)});
/* appli Réglages : état, export, import, vider */
APPS.reglages=['⚙️','Réglages','#636366'];
APPX['Réglages']=function(v,nav,empty,open){nav(v,'Réglages');v.classList.add('trg');
var M=memLoad(),nc=Object.keys(M.conv).length,nm=0;for(var z in M.conv)nm+=M.conv[z].m.length;var S=seasonLoad();
v.appendChild(H('div','tsh','Mémoire du portable'));
v.appendChild(H('div','rgs',MEMOK?'<b>'+nc+' conversation'+(nc>1?'s':'')+' · '+nm+' message'+(nm>1?'s':'')+'</b><small>'+M.mail.length+' mails · '+M.ph.length+' photos · '+M.no.length+' notes · '+S.ep.length+' scènes de saison'+(M.first?'<br>depuis '+E(M.first):'')+'</small>':'<b>📵 Indisponible ici</b><small>Ce navigateur bloque le stockage. Le portable n\'affiche que la scène en cours.</small>'));
function row(ic,t,sub,fn,cl){var b=H('button','rgb'+(cl?' '+cl:''),'<i>'+ic+'</i><span><b>'+t+'</b><small>'+sub+'</small></span>');b.type='button';b.onclick=fn;v.appendChild(b);return b}
var box=H('div','rgx');box.hidden=1;
row('📤','Exporter la partie','Un code à garder (notes, mail, autre appareil)',function(){var o={};try{for(var q=0;q<localStorage.length;q++){var k=localStorage.key(q);if(/^cr/.test(k)&&!/^cr[dg]:/.test(k))o[k]=localStorage.getItem(k)}}catch(e){}
var code='CRAMPONS:'+btoa(unescape(encodeURIComponent(JSON.stringify(o))));box.hidden=0;box.innerHTML='<textarea readonly></textarea><button type="button" class="lb">Copier</button><small></small>';var ta=box.firstChild,ms=box.lastChild;ta.value=code;
box.children[1].onclick=function(){ta.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}if(navigator.clipboard)navigator.clipboard.writeText(code).then(function(){ms.textContent='Copié ✓'},function(){ms.textContent=ok?'Copié ✓':'Sélectionne le texte et copie-le.'});else ms.textContent=ok?'Copié ✓':'Sélectionne le texte et copie-le.'}});
row('📥','Importer une partie','Colle un code exporté',function(){box.hidden=0;box.innerHTML='<textarea placeholder="CRAMPONS:…"></textarea><button type="button" class="lb">Importer</button><small></small>';var ta=box.firstChild,ms=box.lastChild;
box.children[1].onclick=function(){var t=ta.value.trim().replace(/^CRAMPONS:/,'');try{var o=JSON.parse(decodeURIComponent(escape(atob(t)))),n=0;for(var k in o)if(/^cr/.test(k)&&typeof o[k]=='string'){localStorage.setItem(k,o[k]);n++}ms.textContent=n+' élément'+(n>1?'s':'')+' importé'+(n>1?'s':'')+' ✓ Ça s\'affichera à la prochaine scène.'}catch(e){ms.textContent='Code illisible : vérifie qu\'il est complet.'}}});
v.appendChild(box);
var x=row('🗑','Vider le portable','Efface les messages, mails et photos gardés',function(){if(x.dataset.c){ss(MEMK,null);x.querySelector('b').textContent='Portable vidé ✓';x.disabled=true}else{x.dataset.c=1;x.querySelector('b').textContent='Sûr ? Toucher encore'}},'dng')};
