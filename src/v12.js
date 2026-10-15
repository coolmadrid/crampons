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
var ENDS=[].slice.call(G.querySelectorAll('.stt,.mo,.bul,.q,.op,.se,.ck,textarea,input,.sb,.er,.cm,.totop,.rcp2,.lbt,.long,.pm,.tvstd')).filter(function(e){return !e.closest('.tf')}),
startM=Math.max(0,Math.min.apply(null,items.map(function(i){return i.m}).concat([endM]))-1);
var goalM=D.but?endM:null;
/* score qui évolue : buts de la scène attribués à un camp, le reste déjà marqué au départ */
var isG=function(x){return /\bbut\b|⚽|marque|égalis|egalis|penalty transformé|csc/i.test(x)&&!/refus|annul|hors-jeu|poteau|arrêt|manqu/i.test(x)},A0=SC?+SC[2]:0,B0=SC?+SC[3]:0,
myS=SC&&(NZ(SC[4])==NZ(MY.n)||clubOf(SC[4])===clubOf(MY.n)||(/\b(france|bleus|espoirs)\b/i.test(SC[4])&&!/\b(france|bleus|espoirs)\b/i.test(SC[1])))?'b':'a',sideOf=function(x){var t=NZ(x),a=SC?NZ(SC[1]):'',b=SC?NZ(SC[4]):'';if(b&&t.indexOf(b)>-1&&t.indexOf(a)<0)return 'b';if(a&&t.indexOf(a)>-1&&t.indexOf(b)<0)return 'a';if(/aden|sorensen/i.test(x))return myS;return null},
GL=items.filter(function(i){return i.t!='card'&&i.t!='tf'&&isG(i.x)});if(D.but)GL.push({m:endM,x:typeof D.but=='string'?D.but:'',fake:1});
var na=0,nb=0;GL.forEach(function(g){g.sd=sideOf(g.x);if(g.sd=='a')na++;if(g.sd=='b')nb++});GL.forEach(function(g){if(!g.sd){if(na<A0){g.sd='a';na++}else if(nb<B0){g.sd='b';nb++}else g.sd=myS}});
var cA=Math.max(0,A0-GL.filter(function(g){return g.sd=='a'}).length),cB=Math.max(0,B0-GL.filter(function(g){return g.sd=='b'}).length);GL.forEach(function(g){if(g.el)g.el._gl=g});
function showScore(pop){var s=G.querySelector('.hd .sco');if(s){s.innerHTML=cA+'<em>-</em>'+cB;if(pop){s.classList.remove('pop');void s.offsetWidth;s.classList.add('pop')}}var t=G.querySelector('.tvbug .tvt em');if(t)t.innerHTML=cA+'<u>-</u>'+cB}
function score(g){if(g.done2)return;g.done2=1;if(g.sd=='a')cA=Math.min(A0,cA+1);else cB=Math.min(B0,cB+1);showScore(1)}
var RSEEN={};function regie(k,x,m){var c=G.querySelector('.tvcrowd'),b=G.querySelector('.tvbug'),cl=k=='but'?'tvx':(k=='rouge'||k=='jaune'||k=='var')?'tvr':null;if(c&&cl){c.classList.remove('tvx','tvr');void c.offsetWidth;c.classList.add(cl);setTimeout(function(){c.classList.remove(cl)},k=='but'?4200:2200)}
if(b&&k=='but'){b.classList.remove('tvgo');void b.offsetWidth;b.classList.add('tvgo');setTimeout(function(){b.classList.remove('tvgo')},3600)}
var mm2=/^\s*(\d+(?:\s*\+\s*\d+)?)\s*'?/.exec(String(x)),lb=mm2?mm2[1].replace(/\s/g,'')+"'":m,cx=String(x).replace(/^\s*\d+(?:\s*\+\s*\d+)?\s*'?/,'').replace(/^[\s•⚽🟨🟥🔁⚡]+/,''),dk=lb+k+(k=='but'?'':NZ(cx).slice(0,20));if(RSEEN[dk])return;RSEEN[dk]=1;m=lb;x=cx;
var tk=G.querySelector('.tvtk .tkx span');if(tk&&k!='ev'||tk&&k=='ev'&&x){var ic=k=='but'?'⚽ ':k=='rouge'?'🟥 ':k=='jaune'?'🟨 ':k=='sub'?'🔁 ':k=='tf'?'⚡ ':'';tk.innerHTML=E(m+' '+ic+String(x).slice(0,90))+' &nbsp;•&nbsp; '+tk.innerHTML}}
items.sort(function(a,b){return a.m-b.m});items.forEach(function(it){it.el.classList.add('lvh')});ENDS.forEach(function(e){e.classList.add('lvh')});
/* commande */
var bar=H('div','lvbar'),mn=H('b','lvm',startM+"'"),pl=H('button','lvp','⏸'),sp=H('button','lvs','×1'),ff=H('button','lvf','⏭ Fin'),nx=H('span','lvn','');[pl,sp,ff].forEach(function(b){b.type='button'});
bar.appendChild(H('i','lvdot'));bar.appendChild(mn);bar.appendChild(nx);bar.appendChild(pl);bar.appendChild(sp);bar.appendChild(ff);
var tb=G.querySelector('.tbr');tb.after(bar);G.classList.add('lvon');
var cur=startM,sec=0,spd=1,paused=0,done=0,ti=null,SPM=3,hd2=G.querySelector('.hd .mi'),bug=function(){return G.querySelector('.tvmi')};
function setClock(){var t=cur+"'"+(sec?'':'');mn.textContent=cur+':'+(sec<10?'0':'')+sec;if(hd2)hd2.innerHTML='<span class="mim">'+cur+'</span><span class="mis">:'+(sec<10?'0':'')+sec+'</span>';var tv=G.querySelector('.tvbug .tvt em');if(tv&&tv.textContent!=cA+'-'+cB)tv.innerHTML=cA+'<u>-</u>'+cB;var b=bug();if(b)b.textContent=cur+':'+(sec<10?'0':'')+sec;var n=items.filter(function(i){return i.m>cur})[0];nx.textContent=n?'prochain : '+n.m+"'":'';}
function reveal(it){it.el.classList.remove('lvh');it.el.classList.add('lvin');try{it.el.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}
var kind=it.t=='tf'?'tf':/rouge/i.test(it.x)?'rouge':/jaune|averti/i.test(it.x)?'jaune':/\bbut\b|⚽|marque|égalis/i.test(it.x)?'but':it.t=='sub'?'sub':/var/i.test(it.x)?'var':'ev';
if(it.el._gl){score(it.el._gl);kind='but'}else if(kind=='but')kind='ev';var fk=it.m+(kind=='but'?'b':NZ(it.x).slice(0,24));if(!RSEEN['f'+fk]){RSEEN['f'+fk]=1;if(CHT&&CHT._burst&&G.classList.contains('chat'))CHT._burst({t:kind,x:it.x,m:it.m+"'"});if(kind=='but')flashGoal()}regie(kind,it.x,it.m+"'");if(it.t=='tf'){pause(1);var r=H('button','lvr','▶ Reprendre le match');r.type='button';r.onclick=function(){r.remove();pause(0)};it.el.appendChild(r)}}
function flashGoal(){var go=H('div','goal','<b class="gob">BUUUT !</b>'+(typeof D.but=='string'?'<span>'+E(D.but)+'</span>':'')+'<em>'+E(SC[1])+' '+cA+' - '+cB+' '+E(SC[4])+'</em>');G.appendChild(go);var ca=clb(SC[1]),cb=clb(SC[4]);setTimeout(function(){boom(go,[ca[1],ca[2],cb[1],cb[2],'#fff'],60)},150);setTimeout(function(){go.classList.add('out')},3000);setTimeout(function(){go.remove()},3600);var sco=G.querySelector('.hd .sco');if(sco){sco.classList.remove('pop');void sco.offsetWidth;sco.classList.add('pop')}}
function tick(){if(paused||done)return;sec+=spd;while(sec>=SPM*4){sec-=SPM*4;cur++;items.forEach(function(it){if(!it.done&&it.m<=cur){it.done=1;reveal(it)}});if(goalM!=null&&cur>=goalM&&!D.__g){D.__g=1;GL.forEach(function(g){if(g.fake)score(g)});regie('but',D.but||'BUT',endM+"'");flashGoal()}if(cur>=endM)return finish()}setClock()}
function finish(){done=1;cA=A0;cB=B0;showScore(0);clearInterval(ti);cur=endM;sec=0;setClock();items.forEach(function(it){if(!it.done){it.done=1;it.el.classList.remove('lvh');it.el.classList.add('lvin')}});ENDS.forEach(function(e){e.classList.remove('lvh');e.classList.add('lvin')});bar.classList.add('end');mn.textContent=endM+"'";nx.textContent='fin du direct';pl.disabled=1;ff.disabled=1;G.classList.remove('lvon');[].forEach.call(G.querySelectorAll(':scope>.q,:scope>.op,:scope>.sb,:scope>.cm,:scope>.se,:scope>.ck'),function(e){e.classList.add('lvin')});var q=G.querySelector('.q')||G.querySelector('.op');if(q)setTimeout(function(){try{q.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}},400)}
function pause(p){paused=p;pl.textContent=p?'▶':'⏸';bar.classList.toggle('pz',!!p)}
pl.onclick=function(){pause(!paused)};sp.onclick=function(){spd=spd==1?2:spd==2?4:1;sp.textContent='×'+spd};ff.onclick=finish;
showScore(0);setClock();ti=setInterval(tick,250);
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
var TZ=(D.s||[]).some(function(i){return Array.isArray(i)&&i[0]=='TEASER'});
if(EPI||TZ){var hd=G.querySelector('.hd');if(hd){var e=H('div','epb',EPI?'<span>Épisode '+E(String(EPI.n))+'</span>'+(EPI.t?'<b>'+E(EPI.t)+'</b>':''):'<span>Fin d\'épisode</span>');if(TZ){var mb=H('button','epm','🎞 Le montage');mb.type='button';mb.onclick=function(){montage()};e.appendChild(mb)}hd.after(e)}}
/* journal de saison : une entrée par scène distincte */
var key=HSH(HH+(D.q||'')),date=HH.split(' · ').filter(function(x){return /\d{4}|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/i.test(x)})[0]||HH.split(' · ')[0]||'',
ent={k:key,d:date,h:HH,ep:EPI?EPI.n:null,t:EPI?EPI.t:'',sc:SC?SC[1]+' '+SC[2]+'-'+SC[3]+' '+SC[4]:'',n:N0,ch:null,une:null,ach:[],ppl:[]};
(D.s||[]).forEach(function(i){if(!Array.isArray(i))return;if(i[0]=='CH')ent.ch=i[1];if(i[0]=='UNE'&&!ent.une)ent.une=[i[1],i[2]];if(i[0]=='ACH')ent.ach.push(i[1]);if(!BK[i[0]]&&['+','=','T','K','J','C','S','~','O','L','#','Aden'].indexOf(i[0])<0&&typeof i[1]=='string'&&who(i[0])&&ent.ppl.indexOf(i[0])<0)ent.ppl.push(i[0]);if((i[0]=='S'||i[0]=='@')&&i[1]&&i[1]!='Aden'&&who(i[1])&&ent.ppl.indexOf(i[1])<0)ent.ppl.push(i[1])});
try{ent.kd=sceneKind()}catch(e){ent.kd='ville'}var Qb=null,DL=null;(D.s||[]).forEach(function(i){if(!Array.isArray(i))return;if(i[0]=='Q'&&!Qb)Qb=i;if(!DL&&!BK[i[0]]&&typeof i[1]=='string'&&who(i[0])&&['+','=','T','K','J','C','S','~','O','L','#'].indexOf(i[0])<0)DL=i});
ent.l=String(Qb?'« '+Qb[1]+' »'+(Qb[2]?' · '+Qb[2]:''):DL?DL[0]+' : « '+String(DL[1]).split('||')[0].trim()+' »':(sceneFirst().first||'')).replace(/==|\*\*/g,'').slice(0,130);
var ex=SEAS.ep.filter(function(x){return x.k==key})[0];if(!ex){SEAS.ep.push(ent);if(SEAS.ep.length>120)SEAS.ep.shift();seasonSave(SEAS)}else if(ex.kd==null){ex.kd=ent.kd;ex.l=ent.l;ex.ppl=ent.ppl;seasonSave(SEAS)}
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
el.appendChild(fr);var EG=epGroups(S);if(EG.cur&&EG.cur.length>1){var mb=H('button','epm big','🎞 Montage '+(EG.n!=null?'de l\'épisode '+E(String(EG.n)):'des dernières scènes')+' · '+Math.min(10,EG.cur.length)+' plans');mb.type='button';mb.onclick=function(){montage()};el.appendChild(mb)}
/* casting de la saison */
var CA={},CL=[];S.ep.forEach(function(e){(e.ppl||[]).forEach(function(n){var w=who(n),z=w?w[0]+w[1]:NZ(n);if(!CA[z]){CA[z]={n:n,c:0,d:e.d};CL.push(CA[z])}CA[z].c++})});
if(CL.length){CL.sort(function(a,b){return b.c-a.c});el.appendChild(H('div','arch','Le casting · '+CL.length+' personnage'+(CL.length>1?'s':'')+' croisé'+(CL.length>1?'s':'')+' sur '+Object.keys(PJ).length));var cg=H('div','cast');CL.forEach(function(c){var w=who(c.n);cg.appendChild(H('div','cstp','<i>'+(/^aden\b/i.test(c.n)?AD():AV(c.n))+'</i><b>'+E(c.n)+'</b><small>'+(w?E(w[1]):'')+'</small><em>'+c.c+' scène'+(c.c>1?'s':'')+'</em>'))});el.appendChild(cg)}
/* le dé */
var DI=dieLoad();if(DI.n){el.appendChild(H('div','arch','Ton dé'));el.appendChild(H('div','sdie','<span class="d3"><i>'+Math.round(DI.s/DI.n)+'</i></span><span><b>'+DI.n+' lancer'+(DI.n>1?'s':'')+'</b><small>moyenne '+F1(DI.s/DI.n)+' · '+DI.t+' fois 20 · '+DI.u+' fois 1</small><small>'+(DI.n<30?'Encore neuf.':DI.n<100?'Les arêtes s\'arrondissent.':DI.n<200?'Rayé, patiné, fidèle.':'Un vieux compagnon de route.')+'</small></span>'))}
if(S.teaser&&S.teaser[0])el.appendChild(H('div','tez','<small>Prochainement</small><b>'+E(S.teaser[0])+'</b>'+(S.teaser[1]?'<span>'+E(S.teaser[1])+'</span>':'')));
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
MCAP={m:60,conv:25,mail:30,ph:40,no:20,bank:15,news:25,soc:25},MF=['mail','ph','no','bank','news','soc'];
function memLoad(){try{var o=JSON.parse(sg(MEMK)||'null');if(o&&o.conv){MF.forEach(function(f){o[f]=o[f]||[]});o.cards=o.cards||{};return o}}catch(e){}return {v:1,u:0,conv:{},mail:[],ph:[],no:[],bank:[],news:[],soc:[],cards:{},ag:null}}
function memSave(o){try{localStorage.setItem(MEMK,JSON.stringify(o));return true}catch(e){return false}}
function memScan(L){var R={conv:[],mail:[],ph:[],no:[],bank:[],news:[],soc:[],cards:[],ag:[]},cur=null;
function cv(t){for(var q=0;q<R.conv.length;q++)if(same(R.conv[q].t,t))return R.conv[q];var c={t:t,m:[]};R.conv.push(c);return c}
(L||[]).forEach(function(i){if(!Array.isArray(i))return;var k=i[0];
if(k=='SMS')cur={t:i[1],hd:1};
else if(k=='S'){if(!cur||(!cur.hd&&i[1]!='Aden'&&!same(cur.t,i[1])))cur={t:i[1]=='Aden'?(cur&&cur.t)||'Messages':i[1]};cv(cur.t).m.push(i)}
else{cur=null;if(k=='@')R.mail.push(i);else if(k=='PH')R.ph=R.ph.concat(i[1]||[]);else if(k=='NO')R.no.push(i);else if(k=='BANK')R.bank.push(i);else if(k=='AG')R.ag=R.ag.concat(i[1]||[]);else if(k=='UNE'||k=='INFO')R.news.push(i);else if(k=='#')(isSoc(i[1])?R.soc:R.news).push(i);else if(k=='C'&&i[1])R.cards.push(i)}});return R}
function mh(x){return HSH(JSON.stringify(x))}
var MEMD=null;
FIN.unshift(function(){
var key=HSH(HH+(D.q||'')),date=HH.split(' · ').filter(function(x){return /\d{4}|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche/i.test(x)})[0]||HH.split(' · ')[0]||'',
R=memScan(D.s),M=memLoad(),NOW={};
R.conv.forEach(function(c){c.m.forEach(function(i){NOW[mh(i)]=1})});MF.forEach(function(f){R[f].forEach(function(i){NOW[mh(i)]=1})});
/* 1. le passé dans le portable (avant qu'il soit construit) */
if(TELM&&TEL&&MEMOK){
var OC=Object.keys(M.conv).map(function(z){return M.conv[z]}).sort(function(a,b){return (b.u||0)-(a.u||0)});
OC.forEach(function(oc){var old=oc.m.filter(function(e){return e[1]!=key&&!NOW[e[0]]});if(!old.length)return;
var arr=[],ld=null;old.forEach(function(e){if(e[2]&&e[2]!=ld){ld=e[2];arr.push(['S','Aden',ld,'',{sep:1}])}var it=e[3];it.old=1;arr.push(it)});
var c=convOf(oc.t);if(c){if(c.m.length)arr.push(['S','Aden','Nouveau · '+(date||'aujourd\'hui'),'',{sep:1,nw:1}]);c.m=arr.concat(c.m);c.d=null}else TD.conv.push({t:oc.t,m:arr,read:1})});
function past(f,fix){return M[f].filter(function(e){return e[1]!=key&&!NOW[e[0]]}).reverse().map(function(e){var x=JSON.parse(JSON.stringify(e[3]));x.old=1;if(fix)fix(x);return x})}
TD.mail=TD.mail.concat(past('mail',function(x){x[5]=Object.assign({},x[5]||{},{lu:1});x.rd=1}));
TD.ph=TD.ph.concat(past('ph'));TD.no=TD.no.concat(past('no'));TD.bank=TD.bank.concat(past('bank'));TD.news=TD.news.concat(past('news'));TD.soc=TD.soc.concat(past('soc'));
if(!TD.ag.length&&M.ag&&M.ag.k!=key)TD.ag=M.ag.l||[]}
/* 2. la scène dans la mémoire */
if(!MEMOK)return;
function put(L,i){var h=mh(i);if(!L.some(function(e){return e[0]==h}))L.push([h,key,date,i])}
R.conv.forEach(function(c){var z=NZ(c.t),oc=null;for(var y in M.conv)if(same(M.conv[y].t,c.t)){oc=M.conv[y];break}if(!oc)oc=M.conv[z]={t:c.t,m:[]};var n0=oc.m.length;c.m.forEach(function(i){put(oc.m,i)});if(oc.m.length>n0)oc.u=++M.u;if(oc.m.length>MCAP.m)oc.m=oc.m.slice(-MCAP.m)});
var ks=Object.keys(M.conv).sort(function(a,b){return (M.conv[b].u||0)-(M.conv[a].u||0)});ks.slice(MCAP.conv).forEach(function(z){delete M.conv[z]});
MF.forEach(function(f){R[f].forEach(function(i){put(M[f],i)});if(M[f].length>MCAP[f])M[f]=M[f].slice(-MCAP[f])});
/* l'ordre d'affichage : le plus récent d'abord */
MF.forEach(function(f){M[f].sort(function(a,b){return (a[1]==key?1:0)-(b[1]==key?1:0)})});
if(R.ag.length)M.ag={k:key,d:date,l:R.ag};R.cards.forEach(function(i){M.cards[NZ(i[1])]=[key,date,i]});
if(!M.first)M.first=date;memSave(M)});
/* repli visible si le stockage ne marche pas */
FIN.push(function(){if(!MEMOK)G.appendChild(H('div','memko','📵 Stockage indisponible ici : le portable, la saison et l\'album ne se souviennent pas des scènes passées. Tout le reste marche comme avant.'))});
/* appli Réglages : état, export, import, vider */
APPS.reglages=['⚙️','Réglages','#636366'];
APPX['Réglages']=function(v,nav,empty,open){nav(v,'Réglages');v.classList.add('trg');
var M=memLoad(),nc=Object.keys(M.conv).length,nm=0;for(var z in M.conv)nm+=M.conv[z].m.length;var S=seasonLoad();
v.appendChild(H('div','tsh','Mémoire du portable'));
v.appendChild(H('div','rgs',MEMOK?'<b>'+nc+' conversation'+(nc>1?'s':'')+' · '+nm+' message'+(nm>1?'s':'')+'</b><small>'+M.mail.length+' mails · '+M.ph.length+' photos · '+M.no.length+' notes · '+M.news.length+' articles · '+Object.keys(M.cards).length+' cartes · '+S.ep.length+' scènes de saison'+(M.first?'<br>depuis '+E(M.first):'')+'</small>':'<b>📵 Indisponible ici</b><small>Ce navigateur bloque le stockage. Le portable n\'affiche que la scène en cours.</small>'));
function row(ic,t,sub,fn,cl){var b=H('button','rgb'+(cl?' '+cl:''),'<i>'+ic+'</i><span><b>'+t+'</b><small>'+sub+'</small></span>');b.type='button';b.onclick=fn;v.appendChild(b);return b}
var box=H('div','rgx');box.hidden=1;
row('📤','Exporter la partie','Un code à garder (notes, mail, autre appareil)',function(){var o={};try{for(var q=0;q<localStorage.length;q++){var k=localStorage.key(q);if(/^cr/.test(k)&&!/^cr[dg]:/.test(k))o[k]=localStorage.getItem(k)}}catch(e){}
var code='CRAMPONS:'+btoa(unescape(encodeURIComponent(JSON.stringify(o))));box.hidden=0;box.innerHTML='<textarea readonly></textarea><button type="button" class="lb">Copier</button><small></small>';var ta=box.firstChild,ms=box.lastChild;ta.value=code;
box.children[1].onclick=function(){ta.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}if(navigator.clipboard)navigator.clipboard.writeText(code).then(function(){ms.textContent='Copié ✓'},function(){ms.textContent=ok?'Copié ✓':'Sélectionne le texte et copie-le.'});else ms.textContent=ok?'Copié ✓':'Sélectionne le texte et copie-le.'}});
row('📥','Importer une partie','Colle un code exporté',function(){box.hidden=0;box.innerHTML='<textarea placeholder="CRAMPONS:…"></textarea><button type="button" class="lb">Importer</button><small></small>';var ta=box.firstChild,ms=box.lastChild;
box.children[1].onclick=function(){var t=ta.value.trim().replace(/^CRAMPONS:/,'');try{var o=JSON.parse(decodeURIComponent(escape(atob(t)))),n=0;for(var k in o)if(/^cr/.test(k)&&typeof o[k]=='string'){localStorage.setItem(k,o[k]);n++}ms.textContent=n+' élément'+(n>1?'s':'')+' importé'+(n>1?'s':'')+' ✓ Ça s\'affichera à la prochaine scène.'}catch(e){ms.textContent='Code illisible : vérifie qu\'il est complet.'}}});
v.appendChild(box);
var x=row('🗑','Vider le portable','Efface les messages, mails et photos gardés',function(){if(x.dataset.c){ss(MEMK,null);x.querySelector('b').textContent='Portable vidé ✓';x.disabled=true}else{x.dataset.c=1;x.querySelector('b').textContent='Sûr ? Toucher encore'}},'dng')};

/* appli Album : les cartes de joueurs croisées dans la saison */
APPS.album=['🃏','Album','#7F77DD'];
APPX['Album']=function(v,nav,empty,open){nav(v,'Album');var M=memLoad(),L=Object.keys(M.cards).map(function(z){return M.cards[z]});(D.s||[]).forEach(function(i){if(Array.isArray(i)&&i[0]=='C'&&i[1]&&!M.cards[NZ(i[1])])L.push(['',HH,i])});
if(!L.length)return empty(v,'Aucune carte pour l\'instant. Elles arrivent avec les fiches de joueurs.');
v.appendChild(H('div','albh',L.length+' carte'+(L.length>1?'s':'')+' · touche pour retourner'));var g=H('div','albg');
L.sort(function(a,b){return String(a[2][1]).localeCompare(String(b[2][1]))}).forEach(function(e,j){var i=e[2],b=H('button','albc','<span class="alba">'+(/^aden\b/i.test(i[1])?AD():AV(i[1]))+'</span><b>'+E(i[1])+'</b><small>'+E(i[2]||'')+'</small>');b.type='button';b.style.animationDelay=(j*40)+'ms';b.onclick=function(){open(function(v){nav(v,'Album');var w=H('div','albv');w.appendChild(card(i));if(e[1])w.appendChild(H('small','albd','Vue le '+E(e[1])));v.appendChild(w)})};g.appendChild(b)});v.appendChild(g)};

/* ===== v8 · le dé qui s'use ===== */
function dieLoad(){try{return JSON.parse(sg('crdie')||'null')||{n:0,s:0,t:0,u:0}}catch(e){return {n:0,s:0,t:0,u:0}}}
function dieWear(o){G.style.setProperty('--wr',Math.min(1,(o.n||0)/250).toFixed(3))}
dieWear(dieLoad());
var roll0=roll;roll=function(){var r=roll0.apply(this,arguments);try{var o=dieLoad();o.n++;o.s+=r.d;if(r.d==20)o.t++;if(r.d==1)o.u++;ss('crdie',JSON.stringify(o));dieWear(o)}catch(e){}return r};
var spin0=spin;spin=function(c,cb){spin0(c,cb);var t=c.querySelector('.d3t'),o=dieLoad();if(t)t.textContent='Ton dé roule · '+(o.n?(o.n+1)+'e':'1er')+' lancer'};
/* ===== v8 · montage d'épisode (une trentaine de secondes) ===== */
function epGroups(S){var g={},cur=null,ord=[];S.ep.forEach(function(e){if(e.ep!=null)cur=e.ep;var k=cur==null?'_':String(cur);if(!g[k]){g[k]=[];ord.push(k)}g[k].push(e)});
var n=EPI?String(EPI.n):(ord.length?ord[ord.length-1]:null),L=n&&g[n]?g[n]:S.ep.slice(-10);return {n:n=='_'?null:n,cur:L}}
function montage(){if(G.querySelector('.mtg'))return;var S=seasonLoad(),EG=epGroups(S),L=EG.cur.slice();if(!L.length)return;
if(L.length>10){var k=[];for(var q=0;q<10;q++)k.push(L[Math.round(q*(L.length-1)/9)]);L=k}
var dur=Math.max(2400,Math.min(4200,Math.round(28000/(L.length+1)))),ov=H('div','mtg'),bar=H('i','mtp'),sk=H('button','csk','Passer ▸'),T=[],ix=0,ep=EG.n!=null?'Épisode '+EG.n:'Ta saison',tt='';
S.ep.forEach(function(e){if(String(e.ep)==String(EG.n)&&e.t)tt=e.t});
ov.appendChild(bar);ov.appendChild(sk);sk.type='button';bar.style.animationDuration=(dur*(L.length+1))+'ms';
var shots=L.map(function(e,j){var ti=e.ch||e.sc||(e.une?e.une[1]:'')||e.t||e.h.split(' · ').slice(-1)[0],sub=e.l||(e.une?e.une[0]:''),pp=(e.ppl||[]).slice(0,4).map(function(n){return '<span>'+AV(n)+'</span>'}).join('');
return H('div','mts'+(j%2?' r':''),sceneBg(e.kd||'ville')+'<div class="mtc"><small>'+E(e.d||'')+'</small><b>'+E(ti)+'</b>'+(sub?'<em>'+E(sub)+'</em>':'')+(pp?'<span class="mtpp">'+pp+'</span>':'')+(e.n?'<i class="mtn">'+E(String(e.n))+'</i>':'')+'</div>')});
shots.push(H('div','mts end','<div class="mtc"><small>'+E(ep)+'</small><b>'+E(tt||'Fin de l\'épisode')+'</b>'+(S.teaser&&S.teaser[0]?'<em>Prochainement · '+E(S.teaser[0])+'</em>':'')+'<span class="mtf">CRAMPONS</span></div>'));
function fin(){T.forEach(clearTimeout);ov.classList.add('out');setTimeout(function(){ov.remove();G.classList.remove('cinp')},700)}
sk.onclick=fin;G.classList.add('cinp');G.insertBefore(ov,G.firstChild);try{G.scrollIntoView({block:'start'})}catch(e){}
function next(){if(ix>0)shots[ix-1].classList.add('gone');if(ix>=shots.length){fin();return}var s=shots[ix];s.style.animationDuration=(dur+800)+'ms';ov.insertBefore(s,bar);var old=shots[ix-2];if(old)setTimeout(function(){old.remove()},50);ix++;T.push(setTimeout(next,ix==shots.length?dur+1200:dur))}
next()}

/* v8.7 : défilement de l'écran du portable au doigt et boutons ▲ ▼ */
(function(){if(window.__crTud)return;window.__crTud=1;var y0=0,s0=0,el=null;document.addEventListener('touchstart',function(e){el=e.target.closest?e.target.closest('#g .tsc'):null;if(!el)return;y0=e.touches[0].clientY;s0=el.scrollTop},{passive:true});document.addEventListener('touchmove',function(e){if(!el)return;var max=el.scrollHeight-el.clientHeight;if(max<=0)return;el.scrollTop=Math.max(0,Math.min(max,s0+(y0-e.touches[0].clientY)));e.preventDefault()},{passive:false});document.addEventListener('touchend',function(){el=null},{passive:true});function add(){document.querySelectorAll('#g .tel').forEach(function(t){if(t.querySelector('.tud'))return;var sc=t.querySelector('.tsc');if(!sc)return;[['u','▲',-1],['d','▼',1]].forEach(function(b){var x=document.createElement('button');x.type='button';x.className='tud '+b[0];x.textContent=b[1];x.setAttribute('aria-label',b[0]=='u'?'Monter':'Descendre');x.onclick=function(ev){ev.stopPropagation();try{sc.scrollBy({top:b[2]*Math.round(sc.clientHeight*.7),behavior:'smooth'})}catch(er){sc.scrollTop+=b[2]*Math.round(sc.clientHeight*.7)}};t.appendChild(x)})})}var k=0,iv=setInterval(function(){add();if(++k>40)clearInterval(iv)},250)})();
