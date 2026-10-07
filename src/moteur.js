(function(){
var G=document.getElementById('g'),S={},X={},DS=D.d||0,N0=D.n?parseFloat(String(D.n).replace(',','.')):null,
H=function(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e},
E=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')},
F1=function(v){return v.toFixed(1).replace('.',',')},
PAL={'Lien fort':'#A32D2D','Proche':'#185FA5','Neutre':'#444441','Froid':'#534AB7','Hostile':'#993C1D','Hors jeu':'#2C2C2A'},
COL={a:'#E24B4A',b:'#185FA5',w:'#E6F1FB',g:'#EF9F27'},
NT={c:.5,b:.5,r:.2,j:-.4,e:-.4,f:-1},
WT={BU:{TIR:35,VIT:20,DRI:20,PHY:15,PAS:10},AIL:{VIT:30,DRI:30,PAS:20,TIR:20},MOC:{PAS:35,DRI:30,TIR:20,VIT:15},MC:{PAS:35,DRI:20,PHY:20,DEF:15,TIR:10},MDC:{DEF:35,PHY:30,PAS:25,DRI:10},DL:{DEF:35,VIT:30,PAS:20,PHY:15},DC:{DEF:50,PHY:35,PAS:10,VIT:5}},
AT=['VIT','TIR','PAS','DRI','DEF','PHY','MEN','CHA'];
function d20(){return 1+Math.floor(Math.random()*20)}
function cat(d,t,dd){if(d==20)return["Coup d'éclat",'c'];if(d==1)return['Fiasco','f'];if(dd==null)return['à résoudre par le MJ',''];if(t>=dd+5)return['Brillante','b'];if(t>=dd)return['Réussite','r'];if(t>=dd-3)return['Échec de justesse','j'];return['Échec','e']}
function tot(b){return typeof b=='number'?b:b[0]+Math.min(b[1]||0,3)+(b[2]||0)}
function btxt(b){return typeof b=='number'?'+'+b:'+'+tot(b)+' ('+b[0]+' attribut, '+Math.min(b[1]||0,3)+' situation'+((b[1]||0)>3?' plafonnée':'')+(b[2]?', '+b[2]+' talent':'')+')'}
function duel(v){var m=v!=null&&typeof v!='number'&&/([+-]\d+)\s*$/.exec(v);return m?[v.replace(/\s*[+-]\d+\s*$/,''),+m[1]]:null}
function roll(l,b,v,a){var x=d20(),y=a?d20():0,d=a>0?Math.max(x,y):a<0?Math.min(x,y):x,t=d+tot(b),du=duel(v),dd=typeof v=='number'?v:null,vs='';
if(du){var z=d20(),dt=z+du[1];dd=dt+1;vs=' contre '+du[0]+' : d20 ('+z+') +'+du[1]+' = '+dt}else if(v!=null&&dd==null)vs=' contre '+v+' (jet MJ)';else if(dd!=null)vs=' contre DD '+dd;
var r=cat(d,t,dd);return{d:d,c:r[1],ok:r[1]=='c'||r[1]=='b'||r[1]=='r',s:'[Jet] '+l+' : d20 ('+(a?x+', '+y+(a>0?' avantage':' désavantage')+' : '+d:d)+') +'+tot(b)+' = '+t+vs+' : '+r[0]}}
function bub(n,t){var A=n=='Aden',p=D.P&&D.P[n],w=H('div','bw'+(A?' me':'')),b=H('div','bu');
b.innerHTML='<span class="av">'+(A?'🦊':p?p[0]:E(n[0]))+'</span><div><b class="'+(p?'nm':'')+'">'+E(n)+'</b><br>'+E(t)+'</div>';w.appendChild(b);
if(p){var f=H('div','fi');f.innerHTML=p[0]+' <b>'+E(n)+'</b> · '+E(p[1])+'<br><span class="bd" style="background:'+(PAL[p[2]]||'#444441')+'">'+E(p[2])+(p[3]!=null?' '+p[3]:'')+'</span> '+E(p[4]||'')+(p[5]?' · '+E(p[5]):'');f.hidden=1;w.appendChild(f);b.querySelector('.nm').onclick=function(){f.hidden=!f.hidden}}return w}
function terr(J,T,m){var F=H('div','fd'),L=[[83,21,17,58],[94.5,37,5.5,26]];
if(m){L.push([50,0,0,100]);F.appendChild(Object.assign(H('div','l'),{style:'left:50%;top:50%;height:34%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%)'}))}
L.forEach(function(r){F.appendChild(Object.assign(H('div','l'),{style:'left:'+r[0]+'%;top:'+r[1]+'%;width:'+r[2]+'%;height:'+r[3]+'%'+(r[2]?';border-right:0':'')}))});
F.appendChild(Object.assign(H('div'),{style:'position:absolute;right:0;top:44%;height:12%;width:4px;background:#fff'}));
(J||[]).forEach(function(j){var p=H('div','p');p.style.cssText='left:'+j[0]+'%;top:'+j[1]+'%;background:'+COL[j[2]];F.appendChild(p);
var x=H('div','x',E(j[3])),o=j[4]=='b'?'translate(-50%,9px)':j[4]=='g'?'translate(calc(-100% - 9px),-50%)':'translate(-50%,calc(-100% - 9px))';
x.style.cssText='left:'+j[0]+'%;top:'+j[1]+'%;transform:'+o+';color:'+(j[2]=='a'?'#FFD7D7':'#E6F1FB');F.appendChild(x)});
function dr(){var s=F.querySelector('svg');if(s)s.remove();var w=F.clientWidth,h=F.clientHeight,N='http://www.w3.org/2000/svg';s=document.createElementNS(N,'svg');
s.setAttribute('width',w);s.setAttribute('height',h);s.style.cssText='position:absolute;left:0;top:0;max-width:none;z-index:1';
(T||[]).forEach(function(t){var q=document.createElementNS(N,'path'),X=function(v){return v*w/100},Y=function(v){return v*h/100};
q.setAttribute('d','M'+X(t[0])+' '+Y(t[1])+' Q'+X(t[2])+' '+Y(t[3])+' '+X(t[4])+' '+Y(t[5]));
q.setAttribute('style','fill:none;stroke:#FAC775;stroke-width:2.5;stroke-dasharray:6 4;opacity:'+(t[6]==null?1:t[6]));s.appendChild(q)});F.appendChild(s)}
setTimeout(dr,0);addEventListener('resize',dr);return F}
function bar(l,v,mx){mx=mx||100;var p=Math.max(0,Math.min(100,v/mx*100));return '<div class="jg"><small>'+E(l)+'</small><span>'+E(v)+(mx!=100?' / '+mx:'')+'</span><i><u style="width:'+p+'%"></u></i></div>'}
function card(i){var sc=i[4],v={};AT.forEach(function(a,k){v[a]=sc[k]});var w=WT[i[2]],o=0;if(w){for(var a in w)o+=(45+5*v[a])*w[a]/100}
var nt=i[9]!=null?i[9]:Math.floor(o+.5),rc=nt>=90?['Icône','#7F77DD']:nt>=75?['Or','#EF9F27']:nt>=65?['Argent','#B4B2A9']:['Bronze','#BA7517'];
var c=H('div','kd cj');c.style.borderColor=rc[1];
c.innerHTML='<div class="ch"><span class="cn" style="color:'+rc[1]+'">'+nt+'</span><span><b>'+E(i[1])+'</b><br><small>'+E(i[2])+' · '+E(i[3])+' · '+rc[0]+'</small></span></div><div class="tl">'+AT.slice(0,6).map(function(a){return '<div><small>'+a+'</small><br>'+(45+5*v[a])+'</div>'}).join('')+'</div><small>MEN '+(45+5*v.MEN)+' · CHA '+(45+5*v.CHA)+'</small>'+(i[5]!=null?bar('Niveau '+i[5]+' · XP',i[6],i[7]):'')+(i[8]?'<small>'+E(i[8])+'</small>':'');return c}
var HN=H('span');G.appendChild(H('div','hd',E(D.h||'')));G.firstChild.appendChild(HN);
function note(){var t=N0,k;if(t==null)return null;for(k in S)[S[k].r,S[k].r2].forEach(function(r){if(r&&r.f!=null)t+=r.f});return Math.max(3,Math.min(10,t))}
function hdr(){var n=note();HN.innerHTML=(DS?'Destin '+DS+(n!=null?' · ':''):'')+(n!=null?'Note '+F1(N0)+(n!=N0?' → '+F1(n):''):'')}
(D.s||[]).forEach(function(i){if(typeof i=='string')return G.appendChild(H('p','nr',E(i)));var k=i[0];
if(k=='+')G.appendChild(H('div','nt',E(i[1])));else if(k=='#')G.appendChild(H('div','pr','<b>'+E(i[1])+'</b><br>'+E(i[2])));
else if(k=='=')G.appendChild(H('div','rl '+(i[2]||''),E(i[1])));else if(k=='T')G.appendChild(terr(i[1],i[2],i[3]));
else if(k=='K'){var c=H('div','kd','<b>'+E(i[1])+'</b><div class="tl">'+i[2].map(function(t){return '<div><small>'+E(t[0])+'</small><br>'+E(t[1])+'</div>'}).join('')+'</div>');if(i[3])c.style.borderColor=i[3];G.appendChild(c)}
else if(k=='J')G.appendChild(H('div','',bar(i[1],i[2],i[3])));else if(k=='C')G.appendChild(card(i));else G.appendChild(bub(k,i[1]))});
if(D.q)G.appendChild(H('div','q',E(D.q)));
var O=H('div','op'),SEL=H('div','se');G.appendChild(O);
(D.o||[]).forEach(function(o,n){var dv=duel(o[3]),b=H('button','ob','<b>'+(n+1)+'. '+E(o[0])+'</b>'+(o[1]?'<br><small>'+E(o[1])+'</small>':'')+(o[2]!=null?'<em>'+btxt(o[2])+(o[3]!=null?(typeof o[3]=='number'?' · DD '+o[3]:' · vs '+E(o[3])+(dv?' (dé lancé ici)':'')):'')+(o[4]>0?' · avantage':o[4]<0?' · désavantage':'')+(o[5]?' · puis '+E(o[5])+' '+btxt(o[6])+(o[7]!=null?(typeof o[7]=='number'?' DD '+o[7]:' vs '+E(o[7])):''):'')+'</em>':'')),z=H('div','rz');
b.onclick=function(){if(!D.m)for(var k in S)if(k!=n){if(S[k].sp)DS+=S[k].sp;delete S[k];O.children[k*2].classList.remove('on');O.children[k*2+1].innerHTML=''}
if(S[n]){if(S[n].sp)DS+=S[n].sp;delete S[n];b.classList.remove('on');z.innerHTML=''}else{S[n]={o:o,sp:0};b.classList.add('on');if(o[2]!=null)rb(n,z)}up()};O.appendChild(b);O.appendChild(z)});
function par(s2,o){return s2?[o[5],o[6],o[7],0]:[o[0],o[2],o[3],o[4]]}
function show(n,z,s2,r,anchor){var key=s2?'r2':'r',s=S[n];r.f=r.c?NT[r.c]:null;if(r.c=='j')r.f=null;s[key]=r;
var box=H('div','rl '+r.c,E(r.s));if(anchor)anchor.replaceWith(box);else z.appendChild(box);
if(r.c=='j'){var w=H('div','ch3'),opts=[['Échec simple',0,-.4],['Réussite avec un prix',1,.2]];if(DS>0)opts.push(['Point de Destin : réussite sans prix',2,.2]);
opts.forEach(function(q){var bt=H('button','',q[0]);bt.onclick=function(){if(q[1]==2){DS--;s.sp++}r.ch=q[0];r.f=q[2];r.ok=q[1]>0;r.s+=' → '+q[0]+(q[1]==2?' (reste '+DS+')':'');box.textContent=r.s;w.remove();if(!s2&&r.ok&&s.o[5])rb(n,z,1);up()};w.appendChild(bt)});z.appendChild(w)}
else if(r.c=='e'&&DS>0){var rr=H('button','ch3b','Relancer avec un Point de Destin');rr.onclick=function(){DS--;s.sp++;rr.remove();var p=par(s2,s.o),r2=roll(p[0],p[1],p[2],p[3]);r2.s=r.s+'\n'+r2.s.replace('[Jet]','[Relance Destin, reste '+DS+']');show(n,z,s2,r2,box)};z.appendChild(rr)}
else if(!s2&&r.ok&&s.o[5])rb(n,z,1);up()}
function rb(n,z,s2){var p=par(s2,S[n].o),c=H('button','lb','🎲 Lancer'+(s2?' (2e temps)':'')+' '+btxt(p[1]));z.appendChild(c);
c.onclick=function(){if(!S[n]||c.dataset.go)return;c.dataset.go=1;var k=0,t=setInterval(function(){c.textContent='🎲 '+d20();if(++k>7){clearInterval(t);show(n,z,s2,roll(p[0],p[1],p[2],p[3]),c)}},45)}}
function auto(n){var s=S[n],o=s.o,z=O.children[n*2+1];if(o[2]!=null&&!s.r){var c=z.querySelector('.lb');show(n,z,0,roll(o[0],o[2],o[3],o[4]),c)}
if(o[5]&&s.r&&s.r.ok&&!s.r2){var c2=z.querySelector('.lb');show(n,z,1,roll(o[5],o[6],o[7],0),c2)}}
G.appendChild(SEL);function up(){var k=Object.keys(S);SEL.innerHTML=D.m&&k.length?'<b>Ta sélection</b><br>'+k.map(function(n){return '✓ '+E(S[n].o[0])}).join('<br>'):'';hdr()}
(D.k||[]).forEach(function(k){var l=H('label','ck','<input type="checkbox"> '+E(k));X[k]=l.firstChild;G.appendChild(l)});
var R=H('textarea');R.placeholder='Ta réplique (facultatif)';R.value=D.r||'';var A=H('textarea');A.placeholder='Action libre (un d20 brut est joint)';
var Z=H('input');Z.placeholder='(( hors jeu ))';[R,A,Z].forEach(function(e){G.appendChild(e);e.oninput=function(){ER.textContent=''}});
var ER=H('div','er'),B=H('button','sb','Envoyer au MJ ↗');G.appendChild(ER);G.appendChild(B);
B.onclick=function(){var k=Object.keys(S),m=[];if(!k.length&&!R.value.trim()&&!A.value.trim()&&!Z.value.trim()){ER.textContent='Choisis une option ou écris quelque chose.';return}
k.forEach(auto);if(k.some(function(n){var s=S[n];return (s.r&&s.r.c=='j'&&!s.r.ch)||(s.r2&&s.r2.c=='j'&&!s.r2.ch)})){ER.textContent='Échec de justesse : choisis quoi en faire, puis renvoie.';return}ER.textContent='';
k.forEach(function(n){var s=S[n];m.push('> '+s.o[0]);if(s.r)m.push(s.r.s);if(s.r2)m.push(s.r2.s)});
var nt=note();if(nt!=null&&nt!=N0)m.push('Note provisoire : '+F1(N0)+' → '+F1(nt)+' (hors but, passe, résultat)');
for(var x in X)if(X[x].checked)m.push(x+' : oui');if(R.value.trim())m.push('Réplique : « '+R.value.trim()+' »');
if(A.value.trim())m.push('Action libre : '+A.value.trim()+' · d20 brut ('+d20()+')');if(Z.value.trim())m.push('(( '+Z.value.trim()+' ))');B.disabled=1;B.textContent='Envoyé';sendPrompt(m.join('\n'))};
var C=H('details','cm','<summary>Commandes</summary>');['!fiche','!relations','!sauvegarde'].concat(D.c||[]).forEach(function(c){var b=H('button','',c);b.onclick=function(){sendPrompt(c)};C.appendChild(b)});G.appendChild(C);hdr()})()
