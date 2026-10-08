/* ===== v7.6 : régie télé, visual novel, chat des supporters, mode photo, zone mixte vivante ===== */
var RNG=function(seed){var x=HSH(String(seed))||1;return function(){x=(x*1664525+1013904223)>>>0;return x/4294967296}};
function pick(r,A){return A[Math.floor(r()*A.length)]}
function sceneEvents(){var ev=[];(D.s||[]).forEach(function(i){if(!Array.isArray(i))return;var k=i[0];
if(k=='K'||k=='L')(i[2]||[]).forEach(function(t){var txt=String(k=='K'?t[1]:t[2]||''),m=String(t[0]||'');ev.push({m:m,t:/\bbut\b|⚽|marque|égalis|ouvre le score/i.test(txt)?'but':/rouge|expuls/i.test(txt)?'rouge':/jaune|averti/i.test(txt)?'jaune':/remplac|chang|entre/i.test(txt)?'sub':/arrêt|parade/i.test(txt)?'arret':/penal/i.test(txt)?'pen':'ev',x:txt})});
else if(k=='='){var x=String(i[1]||'');ev.push({m:'',t:/rouge/i.test(x)?'rouge':/jaune|averti/i.test(x)?'jaune':/\bVAR\b/.test(x)?'var':'ev',x:x})}
else if(k=='SUB'&&!/^\+/.test(String(i[1]||'')))ev.push({m:i[3]||'',t:'sub',x:(i[1]||'')+' remplace '+(i[2]||'')});
else if(k=='TF')ev.push({m:i[1]||'',t:'tf',x:i[2]||''});
else if(k=='AMB')ev.push({m:'',t:'amb',v:NUM(i[1]),x:i[2]||''})});
if(D.but)ev.unshift({m:MI||'',t:'but',x:typeof D.but=='string'?D.but:'But'});return ev}

/* ---------- 1. régie télé ---------- */
var TVB=null;
function tvBuild(){if(TVB)return TVB;var ca=clb(SC[1]),cb=clb(SC[4]),bug=H('div','tvbug','<span class="tvlg">CS<i>direct</i></span><span class="tvt"><b style="background:'+ca[1]+';color:'+(lum(ca[1])>150?'#111':'#fff')+'">'+E(SC[1])+'</b><em>'+SC[2]+'<u>-</u>'+SC[3]+'</em><b style="background:'+cb[1]+';color:'+(lum(cb[1])>150?'#111':'#fff')+'">'+E(SC[4])+'</b></span><span class="tvmi">'+E(MI||'')+'</span>'),
mi=bug.querySelector('.tvmi'),mm=/(\d+)/.exec(MI||'');if(mm&&!/mi-temps|fin/i.test(MI||'')){var sec=0,base=+mm[1];setInterval(function(){sec=(sec+1)%60;if(!sec)base++;mi.textContent=base+':'+(sec<10?'0':'')+sec},1000)}
var amb=0;(D.s||[]).forEach(function(i){if(Array.isArray(i)&&i[0]=='AMB')amb=NUM(i[1])});var r=RNG(HH),cp=pair(),crowd=H('div','tvcrowd'),n=amb>=60?170:130,html='';
for(var q=0;q<n;q++){var c=r()<.55?cp[0]:r()<.5?'#E6F1FB':cp[1],fl=r()<.08;html+='<i class="'+(fl?'fl':'')+'" style="--c:'+c+';--d:'+(r()*2).toFixed(2)+'s;--s:'+(.5+r()*.6).toFixed(2)+'"></i>'}
crowd.innerHTML='<div class="tvcs" style="--sp:'+(amb>=80?.5:amb>=55?.9:1.6)+'s">'+html+'</div>'+(amb>=75?'<i class="smk a"></i><i class="smk b"></i>':'')+'<span class="tvcl">🎥 Tribune · '+(amb?amb+' / 100':'')+'</span>';
var tk=H('div','tvtk'),items=[];try{for(var q2=0;q2<localStorage.length;q2++){var k=localStorage.key(q2);if(k&&k.indexOf('crl:')==0){var st=JSON.parse(sg(k));items.push(st.cp.toUpperCase()+' : '+st.L.slice(0,5).map(function(x,j){return (j+1)+'. '+x.c+' '+x.p+' pts'}).join(' · '))}}var cal=JSON.parse(sg('crcal')||'[]');cal.forEach(function(m){if(m[3])items.push((m[4]||'')+' '+m[1]+' '+m[3])})}catch(e){}
sceneEvents().forEach(function(e){if(e.t!='amb')items.push((e.m?e.m+' ':'')+e.x)});if(!items.length)items.push('Crampons Sport · le direct');
tk.innerHTML='<span class="tktl">Direct</span><span class="tkx"><span style="animation-duration:'+Math.max(18,items.join('').length*.12)+'s">'+items.map(E).join(' &nbsp;•&nbsp; ')+' &nbsp;•&nbsp; '+items.map(E).join(' &nbsp;•&nbsp; ')+'</span></span>';
var std=null,hasB=(D.s||[]).some(function(i){return Array.isArray(i)&&i[0]=='BUL'});if(/mi-temps|fin du match|termin|coup de sifflet final/i.test(HH+' '+(D.q||''))||hasB){var L1=PJ['Lenoir'],C1=PJ['Camille'],Qb=null,ST=null;(D.s||[]).forEach(function(i){if(Array.isArray(i)){if(i[0]=='Q'&&!Qb)Qb=i;if(i[0]=='ST'&&!ST)ST=i}});
std=H('div','tvstd','<div class="tvsh"><b>Le plateau</b><small>'+(hasB?'Fin de match':'Mi-temps')+' · '+E(SC[1])+' '+SC[2]+'-'+SC[3]+' '+E(SC[4])+'</small></div><div class="tvsb"><span class="tvp"><i>'+L1[0]+'</i><b>Lenoir</b><small>'+E(L1[1])+'</small></span><span class="tvsc"><span class="tvsq">'+(Qb?'« '+E(Qb[1])+' »<small>'+E(Qb[2]||'')+'</small>':ST?'<em>'+(ST[1]||[]).slice(0,3).map(function(r2){return E(r2[0])+' '+E(r2[1])+' – '+E(r2[2])}).join('<br>')+'</em>':'« Le débat est ouvert. »')+'</span></span><span class="tvp"><i>'+C1[0]+'</i><b>Camille</b><small>'+E(C1[1])+'</small></span></div>')}
TVB={bug:bug,crowd:crowd,tk:tk,std:std};return TVB}
function tvOn(on){G.classList.toggle('tv',on);if(!SC)return;var B=tvBuild();if(on){var tb=G.querySelector('.tbr');tb.after(B.bug);B.bug.after(B.crowd);if(B.std)B.crowd.after(B.std);G.appendChild(B.tk);chatOn(true);if(innerWidth<760)G.appendChild(B.tk)}else{[B.bug,B.crowd,B.tk,B.std].forEach(function(e){if(e&&e.parentNode)e.remove()});chatOn(false)}}

/* ---------- 7. chat des supporters ---------- */
var CHT=null,CHTI=null;
function chatBuild(){if(CHT)return CHT;var r=RNG(HH+'chat'),mine=SC?SC[1]:'OL',adv=SC?SC[4]:'eux',
PS=['Gone4ever','KopVirageNord','lyonnais_du_8','ol_fan69','Juninho_forever','Tribune_Sud','MamanDeTheo','vénissieux_pride','LeComptable','AdenRdgFan','SciencesPoFoot','farmor_aarhus','Ego_Dreamers_off','kinetik_crew','la_meuf_du_kop','rhone_ultras','Bellecour_boy','Croix-Rousse_FC','decines_live','Part-Dieu_Pat'],
PA=[adv.replace(/\s/g,'')+'_ultras','fier_de_'+adv.replace(/\s/g,'').toLowerCase(),'kop_'+adv.replace(/\s/g,'').toLowerCase()],
T={idle:['on y croit 🔴🔵','ALLEZ L\'OL','qui regarde depuis l\'étranger ? 🌍','le kop est chaud ce soir','aden titulaire enfin 🦊','ça joue bien ce soir','j\'ai les mains moites','royer sort les cheveux','le gamin de vénissieux 🙌','on va les manger','qqn a le lien du stream ?','mon père est en tribune 😭','premier match au groupama ???','la pluie à décines classique','lacazette patron','cherki fais nous rêver','on respire les gars','silence tactique 👀','je stresse trop','QUI NE SAUTE PAS'],
but:['BUUUUUT 🔴🔵🔴🔵','GOOOOOOAL','JE PLEURE','{x} !!!!','ÇA Y EST','on exploseeeee','le stade tremble','VAMOS','je suis debout dans mon salon','😭😭😭','{x} 🎯','BUT BUT BUT','quelle action','REPLAY SVP','j\'ai renversé ma bière'],
jaune:['jaune mérité','l\'arbitre 🤡','carton dégueulasse','doucement les gars','calme calme','ça va chauffer','{x}','il va se faire expulser s\'il continue'],
rouge:['ROUGE 🟥','NON MAIS L\'ARBITRE','scandale','à 10 maintenant 😱','on tient on tient','c\'est mérité en vrai','{x}','le var ?'],
sub:['bon changement','enfin','{x} 👏','royer coach de l\'année','pourquoi le sortir ???','allez le gamin 🌱'],
tf:['ADEN À TOI','{x}','vas-y frappe','PASSE À LACAZETTE','ne tremble pas','le moment','je peux pas regarder 🙈','C\'EST MAINTENANT'],
arret:['LOPES 🧤','quel arrêt','sauvé','ouf ouf ouf'],var:['le VAR… on attend','attente insupportable','ça va être annulé je le sens','ALLEZ LE VAR'],pen:['PENALTY','pen pen pen','qui le tire ?'],ev:['{x}','ok ok','on continue','{x} 👀'],
adv:['vous allez perdre','{adv} on est là','arbitre maison','ça sent le but pour nous','mdr lyon','{adv} 💪']},
el=H('div','fchat'),list=H('div','fcl'),cnt=1800+Math.floor(r()*900);
el.innerHTML='<div class="fch"><b>💬 Chat des Gones</b><small><i></i>'+fmt(cnt)+' en direct</small></div>';el.appendChild(list);el.appendChild(H('div','fci','<span>Le chat est en lecture seule</span>'));el.querySelector('.fch').onclick=function(){if(innerWidth<760){el.classList.toggle('min');if(!el.classList.contains('min'))list.scrollTop=list.scrollHeight}};
var EV=sceneEvents(),q=0,idle=0,tot=0;
function add(t,isAdv){if(tot>90){list.firstChild&&list.firstChild.remove()}var nm=isAdv?pick(r,PA):pick(r,PS),m=H('div','fcm'+(isAdv?' adv':''),'<b style="color:'+ncol(nm)+'">'+E(nm)+'</b> '+E(t));list.appendChild(m);tot++;list.scrollTop=list.scrollHeight;var s=el.querySelector('.fch small');cnt+=Math.floor(r()*7)-2;s.innerHTML='<i></i>'+fmt(cnt)+' en direct';s.dataset.last=nm+' : '+t}
function burst(e){var n=e.t=='but'?6:e.t=='rouge'?5:e.t=='tf'?4:3,k=0,arr=T[e.t]||T.ev;(function nx(){if(k++>=n)return;var s=pick(r,arr).replace('{x}',e.x||'').replace('{adv}',adv);add(s,r()<.18);setTimeout(nx,180+r()*500)})();if(e.t=='but'){el.classList.add('hot');setTimeout(function(){el.classList.remove('hot')},2500)}}
for(var i0=0;i0<5;i0++)add(pick(r,T.idle));
function tick(){if(!el.isConnected){clearInterval(CHTI);CHTI=null;return}if(q<EV.length&&(idle>=2||EV[q].t=='but')){burst(EV[q++]);idle=0}else{add(r()<.15?pick(r,T.adv).replace('{adv}',adv):pick(r,T.idle),false);idle++}}
el._start=function(){if(!CHTI)CHTI=setInterval(tick,2200+r()*1500)};CHT=el;return el}
function chatOn(on){if(!SC)return;var c=chatBuild(),mob=innerWidth<760;if(on){if(mob){G.appendChild(c);c.classList.add('min');var tk=G.querySelector('.tvtk');if(tk)G.appendChild(tk)}else if(!c.parentNode){var a=G.querySelector('.tvstd')||G.querySelector('.tvcrowd')||G.querySelector('.tbr');a.after(c)}c._start();G.classList.add('chat');place()}else{c.remove();G.classList.remove('chat')}}
function place(){var c=CHT;if(!c||!c.parentNode)return;if(innerWidth<760){c.style.top='';return}var gt=G.getBoundingClientRect().top+scrollY,y=scrollY-gt+70,mx=G.offsetHeight-380;c.style.top=Math.max(70,Math.min(mx,y))+'px'}
addEventListener('scroll',function(){if(G.classList.contains('chat'))place()},{passive:true});addEventListener('resize',function(){if(G.classList.contains('chat'))place()});
FIN.push(function(){if(!SC)return;var tb=G.querySelector('.tbr');if(!tb)return;var b=H('button','','📺 Télé'),c=H('button','','💬 Chat');b.onclick=function(){var on=!G.classList.contains('tv');tvOn(on);b.classList.toggle('on',on);c.classList.toggle('on',on);ss('crtv',on?'1':null)};
c.onclick=function(){var on=!G.classList.contains('chat');chatOn(on);c.classList.toggle('on',on)};tb.insertBefore(c,tb.firstChild);tb.insertBefore(b,tb.firstChild);if(sg('crtv')=='1')b.click()});

/* ---------- 3. visual novel ---------- */
function vnSteps(){var S=[],SP=['+','=','T','K','J','C','S','~','O','L','#'];(D.s||[]).forEach(function(i){if(typeof i=='string'){if(!/^\s*\*{3}\s*$/.test(i))S.push({t:'n',x:i})}else if(Array.isArray(i)){var k=i[0];if(k=='~')S.push({t:'th',x:i[1]});else if(k=='+')S.push({t:'nt',x:String(i[1]||'').replace(/^\[|\]$/g,'')});else if(k=='Q')S.push({t:'q',x:i[1],w:i[2]});else if(!BK[k]&&SP.indexOf(k)<0&&typeof i[1]=='string'){S.push({t:k=='Aden'?'me':'d',n:k,x:i[1],w:who(k)})}}});return S}
function vnOpen(){if(G.querySelector('.vnov'))return;var S=vnSteps();if(!S.some(function(s){return s.t=='d'||s.t=='me'}))return;
var kind=sceneKind(),ov=H('div','vnov'),st=H('div','vns'),box=H('div','vnb'),bar=H('div','vnp'),skip=H('button','csk','Passer ▸'),cnt=H('span','vnc'),SL={},side=0,q=0,ti=null,typing=0;skip.type='button';
ov.innerHTML=sceneBg(kind);ov.appendChild(H('div','cgr'));ov.appendChild(st);ov.appendChild(box);ov.appendChild(bar);ov.appendChild(skip);ov.appendChild(cnt);G.classList.add('cinp','vnp');G.insertBefore(ov,G.firstChild);try{G.scrollIntoView({block:'start'})}catch(e){}
function spr(n,w){if(!SL[n]){var s=H('div','vnsp '+(n=='Aden'?'r':(side++%2?'r':'l'))),raw=pget(n),g=typeof raw=='number'?raw:(typeof raw=='string'&&/\d/.test(raw)?parseInt(raw.replace(/[^\d]/g,''),10):null),tr=g!=null?tier(g):'';s.innerHTML='<i style="--rc:'+(PAL[tr]||'#185FA5')+'">'+(n=='Aden'?AD():w?w[0]:E(n.charAt(0)))+'</i>';st.appendChild(s);SL[n]=s}return SL[n]}
function show(){if(q>=S.length)return fin();var s=S[q],txt=String(s.x||'');[].forEach.call(st.children,function(c){c.classList.remove('spk','ex','ask','dim')});
var html='';if(s.t=='d'||s.t=='me'){var sp=spr(s.n,s.w);sp.classList.add('spk');if(/!/.test(txt))sp.classList.add('ex');else if(/\?/.test(txt))sp.classList.add('ask');else if(/…|\.\.\./.test(txt))sp.classList.add('dim');html='<b class="vnn">'+E(s.n)+(s.w&&s.w[1]?'<small>'+E(s.w[1])+'</small>':'')+'</b>'}
else if(s.t=='th')html='<b class="vnn th">💭 Aden</b>';else if(s.t=='q')html='<b class="vnn">'+E(s.w||'')+'</b>';else if(s.t=='nt')html='<b class="vnn nt">'+E(txt)+'</b>';
box.className='vnb '+s.t;box.innerHTML=html+'<p></p><i class="vnx">▸</i>';var p=box.querySelector('p'),k=0;if(s.t=='nt'){typing=0;return}typing=1;if(ti)clearInterval(ti);ti=setInterval(function(){k+=2;p.textContent=txt.slice(0,k);if(k>=txt.length){clearInterval(ti);typing=0;box.classList.add('done')}},18);cnt.textContent=(q+1)+' / '+S.length;bar.style.width=((q+1)/S.length*100)+'%'}
function next(){if(typing){clearInterval(ti);box.querySelector('p').textContent=String(S[q].x||'');typing=0;box.classList.add('done');return}q++;show()}
function fin(){ov.classList.add('end');G.classList.remove('cinp','vnp');setTimeout(function(){ov.remove();var t=G.querySelector('.q')||G.querySelector('.op');if(t)try{t.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}},700)}
ov.onclick=next;skip.onclick=function(e){e.stopPropagation();fin()};ov.onkeydown=function(e){if(e.key==' '||e.key=='Enter'){e.preventDefault();next()}};ov.tabIndex=0;show();setTimeout(function(){try{ov.focus()}catch(e){}},100)}
FIN.push(function(){var tb=G.querySelector('.tbr');if(!tb)return;var S=vnSteps();if(!S.some(function(s){return s.t=='d'||s.t=='me'}))return;var b=H('button','','🎭');b.title='Lire en visual novel';b.onclick=vnOpen;var c=tb.querySelector('button:nth-child(2)');tb.insertBefore(b,c?c.nextSibling:null)});

/* ---------- 5. mode photo ---------- */
var PHK='crph';function phLoad(){try{return JSON.parse(sg(PHK)||'[]')}catch(e){return []}}
if(TELM){phLoad().forEach(function(p){TD.ph.push([p.l,p.e[0]||'📸',p.d])})}
function phOpen(){if(G.querySelector('.pho'))return;var kind=sceneKind(),ov=H('div','pho'),fr=H('div','phfr'),ppl=[],seen={};
(D.s||[]).forEach(function(i){if(Array.isArray(i)&&!BK[i[0]]&&['+','=','T','K','J','C','S','~','O','L','#','Aden'].indexOf(i[0])<0&&typeof i[1]=='string'){var w=who(i[0]);if(w&&!seen[i[0]]&&ppl.length<3){seen[i[0]]=1;ppl.push([i[0],w[0]])}}});
var FL=[['Normal',''],['Clarendon','contrast(1.15) saturate(1.3)'],['Noir','grayscale(1) contrast(1.25)'],['Sépia','sepia(.8) contrast(1.05)'],['Kodak','saturate(1.4) hue-rotate(-8deg) contrast(1.05) brightness(1.05)']],cur=0,
lg=H('input','phl'),dt=LI.filter(function(x){return !/^\d+\s*e\b/.test(x)}).join(' · ');lg.value=(sceneFirst().first.match(/^[^.!?…]{6,70}/)||[''])[0].trim();lg.placeholder='Légende';
fr.innerHTML=sceneBg(kind)+'<div class="phg">'+ppl.map(function(p,j){return '<span class="phc" style="--j:'+j+'"><i>'+p[1]+'</i><b>'+E(p[0])+'</b></span>'}).join('')+'<span class="phc me"><i>'+AD()+'</i><b>Aden</b></span></div><div class="phcap"><span class="phd">'+E(dt)+'</span></div><i class="phfl"></i>';
var tools=H('div','pht'),fl=H('div','phfs'),acts=H('div','phac'),strip=H('div','phst');
FL.forEach(function(f,j){var b=H('button','wsc'+(j==cur?' on':''),f[0]);b.type='button';b.onclick=function(){cur=j;fr.style.filter=f[1];[].forEach.call(fl.children,function(e,k){e.classList.toggle('on',k==j)})};fl.appendChild(b)});
var save=H('button','lb','📷 Enregistrer dans Photos'),close=H('button','csk','Fermer');save.type=close.type='button';
function drawStrip(){strip.innerHTML='';var L=phLoad();if(!L.length){strip.appendChild(H('small','','Aucune photo enregistrée.'));return}L.slice().reverse().forEach(function(p,j){var t=H('button','phth','<span>'+E(p.e.join(''))+'</span><small>'+E(p.l)+'</small><i>✕</i>');t.type='button';t.style.setProperty('--pg',pbg(p.l));t.querySelector('i').onclick=function(e){e.stopPropagation();var A=phLoad();A.splice(A.length-1-j,1);ss(PHK,JSON.stringify(A));drawStrip()};strip.appendChild(t)})}
save.onclick=function(){var A=phLoad();A.push({l:lg.value.trim()||'Photo',e:ppl.map(function(p){return p[1]}).concat(['🦊']),k:kind,f:cur,d:dt});if(A.length>40)A.shift();ss(PHK,JSON.stringify(A));fr.classList.remove('shot');void fr.offsetWidth;fr.classList.add('shot');drawStrip();save.textContent='✓ Enregistrée';setTimeout(function(){save.textContent='📷 Enregistrer dans Photos'},1500)};
close.onclick=function(){ov.classList.add('end');G.classList.remove('cinp');setTimeout(function(){ov.remove()},500)};
acts.appendChild(save);acts.appendChild(close);tools.appendChild(fl);tools.appendChild(lg);tools.appendChild(acts);tools.appendChild(H('div','phsh','Pellicule'));tools.appendChild(strip);drawStrip();
ov.appendChild(fr);ov.appendChild(tools);G.classList.add('cinp');G.insertBefore(ov,G.firstChild);try{G.scrollIntoView({block:'start'})}catch(e){}
lg.oninput=function(){fr.querySelector('.phcap').innerHTML='<span class="phd">'+E(dt)+'</span><span class="phq">'+E(lg.value)+'</span>'};lg.oninput()}
FIN.push(function(){var tb=G.querySelector('.tbr');if(!tb)return;var b=H('button','','📷');b.title='Mode photo';b.onclick=phOpen;var c=tb.querySelector('button:nth-child(2)');tb.insertBefore(b,c?c.nextSibling:null)});

/* ---------- 7bis. zone mixte vivante ---------- */
(function(){var oc=BK.CONF;if(!oc)return;BK.CONF=function(i){var el=oc(i),Q=i[1]||[],room=H('div','cfroom'),r=RNG(String(i[2]||'')+Q.length),seats='',N=innerWidth<480?Math.max(6,Math.min(8,Q.length*2+2)):Math.max(8,Math.min(12,Q.length+6)),pos=[],js=0;
for(var q=0;q<N;q++){var isJ=q%2==0&&js<Q.length,w=isJ?who(Q[js][0]):null,em=isJ?(w?w[0]:'🎤'):pick(r,['🧑‍💻','👩‍💻','🎥','📷','🧔','👩']);pos.push(isJ?js:-1);seats+='<button type="button" class="cfs'+(isJ?' j':'')+'" data-q="'+(isJ?js:-1)+'" style="--i:'+q+'"><i>'+em+'</i>'+(isJ?'<small>'+E(Q[js][0])+'</small>':'')+'</button>';if(isJ)js++}
room.innerHTML='<div class="cfscr"><b>'+E(i[2]||'Conférence de presse')+'</b><p></p></div><div class="cfpod"><i>'+AD()+'</i><span>Aden Sorensen</span></div><i class="cfmic">🎤</i><div class="cfseats">'+seats+'</div><i class="cffl a"></i><i class="cffl b"></i><i class="cffl c"></i>';
var hd=el.querySelector('.confh');hd.after(room);var scr=room.querySelector('.cfscr p'),mic=room.querySelector('.cfmic'),cards=el.querySelectorAll('.confq');
function focus(k){cards.forEach(function(c,j){c.classList.toggle('act',j==k)});var s=room.querySelector('.cfs[data-q="'+k+'"]');if(s){var rr=s.getBoundingClientRect(),rm=room.getBoundingClientRect();mic.style.left=(rr.left-rm.left+rr.width/2)+'px';mic.style.top=(rr.top-rm.top-14)+'px';room.querySelectorAll('.cfs').forEach(function(x){x.classList.toggle('on',x===s)})}}
room.querySelectorAll('.cfs.j').forEach(function(s){s.onclick=function(){var k=+s.dataset.q;focus(k);try{cards[k].scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}cards[k].querySelector('textarea').focus()}});
cards.forEach(function(c,k){var ta=c.querySelector('textarea');ta.addEventListener('focus',function(){focus(k)});ta.addEventListener('input',function(){scr.textContent=ta.value;room.classList.toggle('typing',!!ta.value)});c.querySelector('.confk').addEventListener('click',function(){scr.textContent=c.querySelector('.confk').classList.contains('on')?'Pas de commentaire.':''})});
setTimeout(function(){focus(0)},400);return el}})();

/* ---------- mode choisi par le MJ : D.mode = "cine" | "vn" | "tv" | "tv+chat" | "chat" | "lv" | "none", ou une liste séparée par des virgules ---------- */
FIN.push(function(){var M=String(D.mode||'').toLowerCase();if(!M)return;var key='crmode:'+HSH(HH+(D.q||'')+M),first=sg(key)!='1';ss(key,'1');
var L=M.split(/[,+\s]+/).filter(Boolean),has=function(k){return L.indexOf(k)>-1},btn=function(re){var tb=G.querySelector('.tbr');return tb?[].slice.call(tb.children).filter(function(b){return re.test(b.textContent)})[0]:null};
if(has('none')||has('aucun')){ss('crcin:'+HSH(HH+(D.q||'')),'1');return}
if(has('tv')||has('tele')||has('télé')){var b=btn(/Télé/);if(b&&!G.classList.contains('tv'))b.click()}
if(has('chat')){var c=btn(/Chat/);if(c&&!G.classList.contains('chat'))c.click()}
if(has('lv')||has('match')){var m=btn(/^⚽/);if(m&&!G.classList.contains('lv'))m.click()}
if(!first)return;
var after=function(){if(has('vn')||has('novel')||has('roman'))setTimeout(vnOpen,200)};
if(has('cine')||has('cinema')||has('cinématique')||has('cinematique')){ss('crcin:'+HSH(HH+(D.q||'')),'1');setTimeout(function(){cinema(true);var w=setInterval(function(){if(!G.querySelector('.cin')){clearInterval(w);after()}},300)},150)}
else{ss('crcin:'+HSH(HH+(D.q||'')),'1');after()}});
