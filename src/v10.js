/* ===== v7.5 : replay sur le terrain, fiche d'avant-match, mode cinéma, conférence de presse ===== */

/* ---------- 1. replay : le ballon suit les passes une à une ---------- */
terr=function(J,T,m,res){var F=H('div','fd rp'),L=[[83,21,17,58],[94.5,37,5.5,26]];
if(m){L.push([50,0,0,100]);F.appendChild(Object.assign(H('div','l'),{style:'left:50%;top:50%;height:34%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%)'}))}
L.forEach(function(r){F.appendChild(Object.assign(H('div','l'),{style:'left:'+r[0]+'%;top:'+r[1]+'%;width:'+r[2]+'%;height:'+r[3]+'%'+(r[2]?';border-right:0':'')}))});
F.appendChild(Object.assign(H('div'),{style:'position:absolute;right:0;top:44%;height:12%;width:4px;background:#fff'}));
var MV=[],PW=[];(J||[]).forEach(function(j){var w=H('div','pw'),p=H('div','p');p.style.background=COL[j[2]];w.appendChild(p);
var x=H('div','x',E(j[3])),o=j[4]=='b'?'translate(-50%,9px)':j[4]=='g'?'translate(calc(-100% - 9px),-50%)':'translate(-50%,calc(-100% - 9px))';
x.style.cssText='transform:'+o+';color:'+(j[2]=='a'?'#FFD7D7':'#E6F1FB');w.appendChild(x);var mv=j[5]!=null&&j[6]!=null;w.style.left=(mv?j[5]:j[0])+'%';w.style.top=(mv?j[6]:j[1])+'%';if(mv)MV.push([w,j]);PW.push(w);F.appendChild(w)});
var N='http://www.w3.org/2000/svg',svg=null,ball=null,paths=[],run=0,lab=null,btn=H('button','rpb','▶ Revoir l\'action');btn.type='button';
function qp(t,p){var u=1-t;return [u*u*p[0]+2*u*t*p[2]+t*t*p[4],u*u*p[1]+2*u*t*p[3]+t*t*p[5]]}
function dr(){if(svg)svg.remove();var w=F.clientWidth,h=F.clientHeight;svg=document.createElementNS(N,'svg');svg.setAttribute('width',w);svg.setAttribute('height',h);svg.style.cssText='position:absolute;left:0;top:0;max-width:none;z-index:1';paths=[];
(T||[]).forEach(function(t){var q=document.createElementNS(N,'path'),X=function(v){return v*w/100},Y=function(v){return v*h/100},d='M'+X(t[0])+' '+Y(t[1])+' Q'+X(t[2])+' '+Y(t[3])+' '+X(t[4])+' '+Y(t[5]);q.setAttribute('d',d);q.setAttribute('class','rpp');q.setAttribute('style','fill:none;stroke:#FAC775;stroke-width:2.5;stroke-dasharray:6 4;opacity:0');svg.appendChild(q);paths.push({el:q,p:[X(t[0]),Y(t[1]),X(t[2]),Y(t[3]),X(t[4]),Y(t[5])],o:t[6]==null?1:t[6]})});
ball=document.createElementNS(N,'circle');ball.setAttribute('r',5.5);ball.setAttribute('class','rpball');ball.setAttribute('visibility','hidden');svg.appendChild(ball);F.appendChild(svg)}
function play(){if(run)return;run=1;if(lab){lab.remove();lab=null}paths.forEach(function(p){p.el.style.opacity=0;p.el.style.transition='none'});ball.setAttribute('visibility','hidden');
MV.forEach(function(x){x[0].style.transition='none';x[0].style.left=x[1][5]+'%';x[0].style.top=x[1][6]+'%'});void F.offsetWidth;
MV.forEach(function(x){x[0].style.transition='left 1.6s cubic-bezier(.4,0,.2,1),top 1.6s cubic-bezier(.4,0,.2,1)';x[0].style.left=x[1][0]+'%';x[0].style.top=x[1][1]+'%'});
var k=0;function seg(){if(k>=paths.length){run=0;if(res){lab=H('div','rpl '+(/but|goal/i.test(res)?'g':/arr[êe]t|sauv|par/i.test(res)?'s':'n'),E(res));F.appendChild(lab);if(/but|goal/i.test(res))boom(F,['#FAC775','#fff','#E24B4A'],30)}return}
var P=paths[k],t0=null,dur=900+Math.hypot(P.p[4]-P.p[0],P.p[5]-P.p[1])*2;P.el.style.transition='opacity .3s';P.el.style.opacity=P.o;ball.setAttribute('visibility','visible');PW.forEach(function(w){w.classList.remove('has')});
function st(ts){if(!t0)t0=ts;var r=Math.min(1,(ts-t0)/dur),e=r<.5?2*r*r:1-Math.pow(-2*r+2,2)/2,pt=qp(e,P.p);ball.setAttribute('cx',pt[0]);ball.setAttribute('cy',pt[1]);ball.setAttribute('r',5.5+Math.sin(r*Math.PI)*3);if(r<1)requestAnimationFrame(st);else{k++;setTimeout(seg,260)}}
requestAnimationFrame(st)}
setTimeout(seg,MV.length?700:150)}
F.appendChild(btn);btn.onclick=function(e){e.stopPropagation();play()};F.onclick=play;
setTimeout(dr,0);VIEW(F,function(){setTimeout(play,350)});addEventListener('resize',function(){dr()});return F};

/* ---------- 2. fiche d'avant-match assemblée depuis ce que le widget sait ---------- */
function preMatch(){var seg=HH.split(' · '),a=null,b=null;for(var q=0;q<seg.length;q++){var mm=/^(.+?)\s+(?:vs\.?|contre|reçoit|v)\s+(.+)$/i.exec(seg[q].trim());if(mm){a=mm[1];b=mm[2];break}}if(!a||SC)return null;
var tabs=[];try{for(var q2=0;q2<localStorage.length;q2++){var k=localStorage.key(q2);if(k&&k.indexOf('crl:')==0)tabs.push(JSON.parse(sg(k)))}}catch(e){}
var cal=null;try{cal=JSON.parse(sg('crcal')||'null')}catch(e){}
function row(c){for(var t=0;t<tabs.length;t++)for(var r=0;r<tabs[t].L.length;r++)if(NZ(tabs[t].L[r].c)==NZ(c)||clb(tabs[t].L[r].c)===clb(c)&&clb(c)[0])return {r:tabs[t].L[r],k:r+1,cp:tabs[t].cp};return null}
function form(f){return f?'<span class="ligf">'+String(f).toUpperCase().split('').map(function(ch){return '<i class="'+(ch=='V'||ch=='W'?'w':ch=='N'||ch=='D'?'d':'l')+'"></i>'}).join('')+'</span>':''}
function side(c,rt){var k=clb(c),R=row(c);return '<div class="pms"><i style="background:'+k[1]+';border-color:'+k[2]+'"></i><b>'+E(c)+'</b>'+(R?'<small>'+R.k+'<sup>e</sup> · '+R.r.p+' pts</small>'+form(R.r.f):'<small>'+(rt?'':'')+'</small>')+'</div>'}
var last=null;if(cal)for(var q3=cal.length-1;q3>=0;q3--)if(NZ(cal[q3][1])==NZ(b)&&cal[q3][3]){last=cal[q3];break}
var watch=[];for(var nm in PJ){var role=PJ[nm][1]||'';if(new RegExp('\\b'+NZ(b).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i').test(NZ(role))&&watch.length<3)watch.push([nm].concat(PJ[nm]))}
var el=H('details','pm'),w=WDL(last&&last[3]);el.open=true;
el.innerHTML='<summary><span>Avant-match</span><b>'+E(a)+' <em>vs</em> '+E(b)+'</b></summary><div class="pmb"><div class="pmh">'+side(a)+'<span class="pmv">VS</span>'+side(b,1)+'</div>'+(last?'<div class="pml"><small>Dernier face-à-face</small><b class="r-'+w+'">'+E(last[3])+'</b><span>'+E(last[0])+(last[4]?' · '+E(last[4]):'')+'</span></div>':'<div class="pml"><small>Face-à-face</small><span>Premier affrontement connu cette saison.</span></div>')+(watch.length?'<div class="pmw"><small>À surveiller</small>'+watch.map(function(p){return '<span class="pmp"><i>'+p[1]+'</i><b>'+E(p[0])+'</b><em>'+E(p[2])+(p[4]?' · '+E(p[4]):'')+'</em></span>'}).join('')+'</div>':'')+'</div>';return el}
(function(){var o=BK.CAL;BK.CAL=function(i){try{ss('crcal',JSON.stringify(i[1]||[]))}catch(e){}return o(i)}})();
FIN.push(function(){var p=preMatch();if(p){var t=G.querySelector('.tbr');if(t)t.after(p);else G.insertBefore(p,G.children[2]||null)}});

/* ---------- 5. cinématique d'ouverture ---------- */
function sceneFirst(){var CHB=null,first='';(D.s||[]).forEach(function(i){if(!CHB&&Array.isArray(i)&&i[0]=='CH')CHB=i;if(!first&&typeof i=='string'&&!/^\s*\*{3}\s*$/.test(i))first=i});return {ch:CHB,first:first}}
function sceneKind(){var sf=sceneFirst(),first=sf.first,CHB=sf.ch,night=G.classList.contains('th-night'),morn=G.classList.contains('th-morn'),
TXT=HH+' '+first+' '+(CHB?CHB[1]+' '+(CHB[2]||''):''),hasC=(D.s||[]).some(function(i){return Array.isArray(i)&&i[0]=='CONF'});
return window.__cink||(hasC||/conf[ée]rence de presse|zone mixte|salle de presse/i.test(TXT)?'presse':/tunnel|coup d'envoi|entr[ée]e des joueurs|hymne|sortie des joueurs/i.test(TXT)?'tunnel':/vestiaire|causerie|mi-temps/i.test(TXT)?'vestiaire':SC||/stade|stadium|pelouse|tribune|kop|[ée]chauffement/i.test(TXT)?'stade':/entra[iî]nement|s[ée]ance|d[ée]crassage|training|terrain annexe/i.test(TXT)?'entrainement':/a[ée]roport|avion|\bvol\b|\bcar\b|\bbus\b|autoroute|\btrain\b|\bgare\b|d[ée]placement|h[ôo]tel/i.test(TXT)?'voyage':/bureau|r[ée]union|signature|agence|sciences po|\bcours\b|amphi|facult[ée]|salle de/i.test(TXT)?'bureau':/appartement|appart\b|chez (h[ée]l[èe]ne|toi|lui|elle|farmor|th[ée]o)|salon|cuisine|canap[ée]|chambre|\blit\b|fen[êe]tre|maison|immeuble/i.test(TXT)?'appart':night?'nuit':morn?'matin':'ville')}
function sceneBg(kind){return '<div class="cbg k-'+kind+(G.classList.contains('th-ucl')?' ucl':'')+(WX?' w-'+WX:'')+'"><i class="sky"></i><i class="far"></i><i class="st1"></i><i class="st2"></i><i class="lt l1"></i><i class="lt l2"></i><i class="lt l3"></i><i class="gnd"></i><i class="d1"></i><i class="d2"></i><i class="d3"></i><i class="d4"></i><i class="mist"></i></div>'}
function cinema(force){if(G.querySelector('.cin'))return;var rm=false;try{rm=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}if(rm&&!force)return;
var sf=sceneFirst(),CHB=sf.ch,first=sf.first,sent=(first.match(/^[^.!?…]{10,180}[.!?…]?/)||[first.slice(0,160)])[0].trim(),kind=sceneKind(),
ov=H('div','cin'),T=[],ti=null,done=0,stage=H('div','cst'),bar=H('div','cpb','<i></i>'),skip=H('button','csk','Passer ▸');skip.type='button';
ov.appendChild(stage);ov.appendChild(H('div','cgr'));ov.appendChild(bar);ov.appendChild(skip);
G.classList.add('cinp');G.insertBefore(ov,G.firstChild);try{G.scrollIntoView({block:'start'})}catch(e){}
function shot(cls,html,ms){T.push([cls,html,ms])}
var LIx=LI.filter(function(x){return !/^\d+\s*e\b/.test(x)});
shot('s1','<div class="ctx">'+LIx.map(function(x,j){return '<span style="animation-delay:'+(300+j*500)+'ms">'+E(x)+'</span>'}).join('')+'</div>',1400+LIx.length*600);
var bg=sceneBg(kind);
if(CHB)shot('s2',bg+'<div class="cch">'+(CHB[3]?'<i>'+E(CHB[3])+'</i>':'')+'<b>'+E(CHB[1]||'')+'</b>'+(CHB[2]?'<small>'+E(CHB[2])+'</small>':'')+'</div>',4200);
else shot('s2',bg+'<div class="cch"><b>'+E(LIx[LIx.length-1]||'')+'</b></div>',3600);
if(SC){var ca=clb(SC[1]),cb=clb(SC[4]);shot('s3',bg+'<div class="csc"><span class="csa"><i style="background:'+ca[1]+';border-color:'+ca[2]+'"></i><b>'+E(SC[1])+'</b></span><span class="csn">'+SC[2]+'<em>–</em>'+SC[3]+'</span><span class="csa r"><i style="background:'+cb[1]+';border-color:'+cb[2]+'"></i><b>'+E(SC[4])+'</b></span>'+(MI?'<small>'+E(MI)+'</small>':'')+'</div>',3400)}
var dlg=null;for(var q=0;q<Math.min(6,(D.s||[]).length)&&!dlg;q++){var it=D.s[q];if(Array.isArray(it)&&!BK[it[0]]&&['+','=','T','K','J','C','S','~','O','L','#'].indexOf(it[0])<0&&it[0]!='Aden'&&typeof it[1]=='string'){var w=who(it[0]);if(w)dlg=[it[0],w,it[1]]}}
if(dlg&&!SC)shot('s5',bg+'<div class="cper"><i>'+dlg[1][0]+'</i><b>'+E(dlg[0])+'</b><small>'+E(dlg[1][1]||'')+'</small><em>« '+E(String(dlg[2]).slice(0,110))+(String(dlg[2]).length>110?'…':'')+' »</em></div>',3400);
var enj=null;(D.s||[]).forEach(function(i){if(enj||!Array.isArray(i))return;if(i[0]=='TF')enj=[E(i[1]||''),'Temps fort'];else if(i[0]=='CTR')enj=[E(i[2]||''),'Contrat · '+E(i[1]||'')+(i[3]!=null?' · '+(typeof i[3]=='number'?fmt(i[3])+' €':E(i[3])):'')];else if(i[0]=='SPO')enj=[E(i[1]||''),'Sponsor'+(i[2]!=null?' · '+(typeof i[2]=='number'?fmt(i[2])+' €':E(i[2])):'')];else if(i[0]=='KO'||i[0]=='LIG')enj=[E(i[1]||''),i[0]=='KO'?'Tableau':'Classement']});
if(enj)shot('s6',bg+'<div class="cenj"><small>'+enj[1]+'</small><b>'+enj[0]+'</b></div>',2800);
if(sent)shot('s4',bg+'<div class="csub"><span></span></div>',Math.min(9000,1800+sent.length*42));
var total=T.reduce(function(a,t){return a+t[2]},0),k=0,el=null;bar.firstChild.style.transitionDuration=total+'ms';setTimeout(function(){bar.firstChild.style.width='100%'},50);
function next(){if(done)return;if(el){el.classList.add('out');(function(o){setTimeout(function(){o.remove()},700)})(el)}if(k>=T.length)return fin();var t=T[k++];el=H('div','cshot '+t[0],t[1]);stage.appendChild(el);void el.offsetWidth;el.classList.add('on');
if(t[0]=='s4'){var sp=el.querySelector('.csub span'),q=0;ti=setInterval(function(){if(done){clearInterval(ti);return}q++;sp.textContent=sent.slice(0,q);if(q>=sent.length)clearInterval(ti)},34)}
setTimeout(next,t[2])}
function fin(){if(done)return;done=1;if(ti)clearInterval(ti);ov.classList.add('end');G.classList.remove('cinp');
[].forEach.call(G.children,function(c,j){if(c===ov||c.classList.contains('bgl'))return;c.classList.add('cv');setTimeout(function(){c.classList.add('in')},150+Math.min(j,16)*110)});
setTimeout(function(){ov.remove();[].forEach.call(G.children,function(c){c.classList.remove('cv','in')})},1800)}
skip.onclick=function(e){e.stopPropagation();fin()};ov.onclick=function(){if(k<T.length)next()};setTimeout(next,80)}
FIN.push(function(){var tb=G.querySelector('.tbr');if(!tb)return;var b=H('button','','🎬');b.title='Cinématique';b.onclick=function(){cinema(true)};tb.insertBefore(b,tb.querySelector('button:nth-child(2)')||null);
var key='crcin:'+HSH(HH+(D.q||''));var auto=D.cine||(D.s||[]).some(function(i){return Array.isArray(i)&&i[0]=='CH'});if(auto&&sg(key)!='1'){ss(key,'1');setTimeout(function(){cinema(false)},150)}});

/* ---------- 6. conférence de presse ---------- */
BK.CONF=function(i){var el=H('div','conf'),Q=i[1]||[],A=[];el.dataset.app='Actus';
el.innerHTML='<div class="confw"><span>🦁 OL</span><span>⚡ Kinetik</span><span>🦁 OL</span><span>⚡ Kinetik</span><span>🦁 OL</span><span>⚡ Kinetik</span></div><div class="confh"><b>'+E(i[2]||'Conférence de presse')+'</b><small>'+Q.length+' question'+(Q.length>1?'s':'')+'</small><i class="confm">🎙️</i><i class="confm">🎙️</i><i class="confm">🎙️</i></div>';
Q.forEach(function(q,k){var w=who(q[0]),sug=q[2]||[],card=H('div','confq'),ans=H('textarea','confa'),tone=null,skip=0;ans.placeholder='Ta réponse';
card.innerHTML='<div class="confj"><span class="tav">'+(w?w[0]:E(String(q[0]).charAt(0)))+'</span><span class="confn"><b>'+E(q[0])+'</b><small>'+E(w?w[1]:'')+'</small></span><em>Q'+(k+1)+'</em></div><p class="confqt">« '+MD(q[1]||'')+' »</p>';
if(sug.length){var ch=H('div','confs');sug.forEach(function(s){var c=H('button','wsc',E(s));c.type='button';c.onclick=function(){tone=tone===s?null:s;[].forEach.call(ch.children,function(e){e.classList.toggle('on',e===c&&tone===s)});if(tone&&!ans.value.trim())ans.focus()};ch.appendChild(c)});card.appendChild(ch)}
card.appendChild(ans);var sk=H('button','confk','Pas de commentaire');sk.type='button';sk.onclick=function(){skip=!skip;sk.classList.toggle('on',skip);ans.disabled=skip;if(skip)ans.value=''};card.appendChild(sk);ans.oninput=function(){up()};el.appendChild(card);
A.push({any:function(){return skip||!!ans.value.trim()},msg:function(){if(skip)return ['> Conf. de presse · '+q[0]+' : pas de commentaire'];var v=ans.value.trim();return v?['> Conf. de presse · '+q[0]+' (« '+String(q[1]||'').slice(0,60)+(String(q[1]||'').length>60?'…':'')+' ») : « '+v+' »'+(tone?' · ton : '+tone:'')]:[]}})});
XS.push({any:function(){return A.some(function(a){return a.any()})},msg:function(){var m=[];A.forEach(function(a){m=m.concat(a.msg())});return m}});return el};
