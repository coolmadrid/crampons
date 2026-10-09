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
