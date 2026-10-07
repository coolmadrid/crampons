(function(){function run(){var D=window.D;if(!document.getElementById('crf')){var lk=document.createElement('link');lk.id='crf';lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap';document.head.appendChild(lk)}
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
var LBL={c:"Coup d'éclat",b:'Brillante',r:'Réussite',j:'Échec de justesse',e:'Échec',f:'Fiasco'};
function rbox(l,b,dd,z,cb,txt){var st={r:null},btn=H('button','lb',txt||('🎲 Lancer '+btxt(b)));z.appendChild(btn);
function fin(r,an){var box=H('div','rl '+r.c),fill=function(){box.innerHTML='<span class="dz">'+r.d+'</span><span class="rx"><b class="rc">'+(r.ch||LBL[r.c]||'')+'</b>'+E(r.s).replace(/\n/g,'<br>')+'</span>'};fill();an.replaceWith(box);st.r=r;
if(r.c=='j'){var w=H('div','ch3'),op=[['Échec simple',0],['Réussite avec un prix',1]];if(DS>0)op.push(['Point de Destin : réussite sans prix',2]);
op.forEach(function(q){var bt=H('button','',q[0]);bt.onclick=function(){if(q[1]==2)DS--;r.ch=q[0];r.ok=q[1]>0;r.s+=' → '+q[0]+(q[1]==2?' (reste '+DS+')':'');fill();w.remove();cb&&cb(r);hdr()};w.appendChild(bt)});box.after(w)}
else if(r.c=='e'&&DS>0){var rr=H('button','ch3b','Relancer avec un Point de Destin');rr.onclick=function(){DS--;rr.remove();var r2=roll(l,b,dd,0);r2.s=r.s+'\n'+r2.s.replace('[Jet]','[Relance Destin, reste '+DS+']');fin(r2,box)};box.after(rr);cb&&cb(r)}
else cb&&cb(r);hdr()}
btn.onclick=function(){if(btn.dataset.go)return;btn.dataset.go=1;var k=0,t=setInterval(function(){btn.classList.add('rol');btn.textContent='🎲 '+d20();if(++k>7){clearInterval(t);fin(roll(l,b,dd,0),btn)}},45)};
st.auto=function(){if(!st.r&&!btn.dataset.go){btn.dataset.go=1;fin(roll(l,b,dd,0),btn)}};st.pend=function(){return st.r&&st.r.c=='j'&&!st.r.ch};return st}
function wk(W){var el=H('div','wk'),SL=[],cap=W.c||2,ex=0,TR=null,TA=null,MT=null,X3=null,err=H('div','er');
function max(){return cap+ex}
var hd=H('div','wkt','<span>Créneaux</span><small></small>'),row=H('div','wks');el.appendChild(hd);el.appendChild(row);
function draw(){row.innerHTML='';for(var i=0;i<max();i++)(function(i){var s=SL[i],p=H('div','wkp'+(s?' on':''));
p.innerHTML=s?'<span class="wn">'+(i+1)+'</span><span class="wv"><small>'+E(s[0])+'</small>'+E(s[1])+'</span>':'<span class="wn">'+(i+1)+'</span><span class="wv em">Créneau libre</span>';
if(s){var x=H('button','wx','×');x.setAttribute('aria-label','Retirer');x.onclick=function(){SL.splice(i,1);draw()};p.appendChild(x)}row.appendChild(p)})(i);
hd.querySelector('small').textContent=SL.length+' / '+max();err.textContent=''}
function add(c,v){if(SL.length>=max()){err.textContent='Tous les créneaux sont pris. Retire-en un d\'abord.';return}SL.push([c,v]);draw()}
if(W.x){var z3=H('div','wk3');el.appendChild(z3);X3=rbox('3e créneau ('+(W.x[2]||'PHY')+')',W.x[0],W.x[1],z3,function(r){if(r.ok&&!ex){ex=1;draw()}},'🎲 Tenter un 3e créneau · '+(W.x[2]||'PHY')+' '+btxt(W.x[0])+' · DD '+W.x[1])}
el.appendChild(err);
var GR=H('div','wkg');el.appendChild(GR);
(W.g||[]).forEach(function(g){var c=H('div','wgc'),b=H('button','wgb','<span class="wi">'+(g[1]||'•')+'</span><span class="wgl"><b>'+E(g[0])+'</b>'+(g[3]?'<small>'+E(g[3])+'</small>':'')+'</span><span class="wch">+</span>'),pn=H('div','wpn');pn.hidden=1;
(g[2]||[]).forEach(function(s){var ch=H('button','wsc',E(s));ch.onclick=function(){add(g[0],s)};pn.appendChild(ch)});
var fr=H('div','wfr'),inp=H('input'),ok=H('button','wok','Ajouter');inp.placeholder='Autre chose (précise)';fr.appendChild(inp);fr.appendChild(ok);pn.appendChild(fr);
ok.onclick=function(){var v=inp.value.trim();if(!v){err.textContent='Écris quelque chose avant d\'ajouter.';return}add(g[0],v);inp.value=''};inp.oninput=function(){err.textContent=''};
b.onclick=function(){pn.hidden=!pn.hidden;c.classList.toggle('op',!pn.hidden)};c.appendChild(b);c.appendChild(pn);GR.appendChild(c)});
if(W.t){var tb=W.tb!=null?W.tb:4,td=W.td!=null?W.td:12,th=H('div','wkt','<span>Entraînement</span><small>d20 + MEN '+tb+' · DD '+td+'</small>'),tg=H('div','wtg'),tz=H('div','wtz');el.appendChild(th);el.appendChild(tg);el.appendChild(tz);
W.t.forEach(function(a){var n=a[1]||0,q=a[2]||4,b=H('button','wta','<b>'+E(a[0])+'</b><span class="tk">'+Array.from({length:q},function(_,i){return '<i'+(i<n?' class="f"':'')+'></i>'}).join('')+'</span><small>'+n+'/'+q+'</small>');
b.onclick=function(){if(TR&&TR.r)return;[].forEach.call(tg.children,function(e){e.classList.remove('on')});b.classList.add('on');TA=a[0];tz.innerHTML='';TR=rbox('Entraînement '+a[0],tb,td,tz,function(){[].forEach.call(tg.children,function(e){if(!e.classList.contains('on'))e.classList.add('lk')})})};tg.appendChild(b)})}
if(W.m){var mh=H('div','wkt','<span>Match</span><small>'+E(W.m)+'</small>'),mg=H('div','wmg');el.appendChild(mh);el.appendChild(mg);
[['Jouer en détail','jouer en détail'],['Simuler','simuler']].forEach(function(o){var b=H('button','wmb',o[0]);b.onclick=function(){[].forEach.call(mg.children,function(e){e.classList.remove('on')});if(MT==o[1]){MT=null}else{MT=o[1];b.classList.add('on')}};mg.appendChild(b)})}
draw();
return{el:el,any:function(){return SL.length||TA||MT||(X3&&X3.r)},auto:function(){if(TR)TR.auto()},pend:function(){return (TR&&TR.pend())||(X3&&X3.pend())},
msg:function(){var m=[];if(X3&&X3.r)m.push(X3.r.s);SL.forEach(function(s,i){m.push('> Créneau '+(i+1)+' : '+s[0]+' · '+s[1])});if(TA){m.push('> Entraînement : '+TA);if(TR&&TR.r)m.push(TR.r.s)}if(MT)m.push('Match : '+MT);return m}}}
function bub(n,t){var A=n=='Aden',p=D.P&&D.P[n],w=H('div','bw'+(A?' me':'')),b=H('div','bu');
b.innerHTML='<span class="av" style="border-color:'+(A?'#E24B4A':p?(PAL[p[2]]||'#185FA5'):'#185FA5')+'">'+(A?'🦊':p?p[0]:E(n[0]))+'</span><div><b class="'+(p?'nm':'')+'">'+E(n)+'</b><span class="tx">'+E(t)+'</span></div>';w.appendChild(b);
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
var c=H('div','cj');c.style.setProperty('--rc',rc[1]);
c.innerHTML='<div class="ct"><div class="cl"><span class="cn">'+nt+'</span><span class="cp">'+E(i[2])+'</span><span class="cf">'+E(i[3])+'</span></div><div class="cr"><span class="rt">'+rc[0]+'</span><b class="cna">'+E(i[1])+'</b>'+(i[5]!=null?'<span class="lv">Niveau '+i[5]+'</span>':'')+'</div></div><div class="cs">'+AT.map(function(a){return '<div'+(a=='MEN'||a=='CHA'?' class="sec"':'')+'><b>'+(45+5*v[a])+'</b> '+a+'</div>'}).join('')+'</div>'+(i[5]!=null?bar('XP',i[6],i[7]):'')+(i[8]?'<div class="tal">'+E(i[8]).split(' · ').map(function(x){return '<span>'+x+'</span>'}).join('')+'</div>':'');return c}
var HN=H('span','hr');G.appendChild(H('div','hd',(D.n?'<i class="live">EN DIRECT</i>':'')+'<span class="hl">'+E(D.h||'')+'</span>'));G.firstChild.appendChild(HN);
function note(){var t=N0,k;if(t==null)return null;for(k in S)[S[k].r,S[k].r2].forEach(function(r){if(r&&r.f!=null)t+=r.f});return Math.max(3,Math.min(10,t))}
function hdr(){var n=note();HN.innerHTML=(DS?'Destin '+DS+(n!=null?' · ':''):'')+(n!=null?'Note '+F1(N0)+(n!=N0?' → '+F1(n):''):'')}
(D.s||[]).forEach(function(i){if(typeof i=='string')return G.appendChild(H('p','nr',E(i)));var k=i[0];
if(k=='+'){var dn=/[\u2212-]\s*\d/.test(i[1])&&!/\+\s*\d/.test(i[1]);G.appendChild(H('div','nt '+(dn?'dn':'up'),'<i>'+(dn?'▼':'▲')+'</i>'+E(i[1].replace(/^\[|\]$/g,''))))}else if(k=='#')G.appendChild(H('div','pr','<span class="pm">'+E(i[1])+'</span><span class="pt">'+E(i[2])+'</span>'));
else if(k=='=')G.appendChild(H('div','rl '+(i[2]||''),E(i[1])));else if(k=='T')G.appendChild(terr(i[1],i[2],i[3]));
else if(k=='K'){var c=H('div','kd','<b>'+E(i[1])+'</b><div class="tl">'+i[2].map(function(t){return '<div><small>'+E(t[0])+'</small><br>'+E(t[1])+'</div>'}).join('')+'</div>');if(i[3])c.style.borderColor=i[3];G.appendChild(c)}
else if(k=='J')G.appendChild(H('div','',bar(i[1],i[2],i[3])));else if(k=='C')G.appendChild(card(i));else G.appendChild(bub(k,i[1]))});
if(D.q)G.appendChild(H('div','q',E(D.q)));var WK=D.w?wk(D.w):null;if(WK)G.appendChild(WK.el);
var O=H('div','op'),SEL=H('div','se');G.appendChild(O);
(D.o||[]).forEach(function(o,n){var dv=duel(o[3]),CH=function(t,c){return '<span class="cp2'+(c?' '+c:'')+'">'+t+'</span>'},b=H('button','ob','<span class="nb">'+(n+1)+'</span><span class="ot"><b>'+E(o[0])+'</b>'+(o[1]?'<small>'+E(o[1])+'</small>':'')+(o[2]!=null?'<span class="chs">'+CH('🎲 '+btxt(o[2]))+(o[3]!=null?(typeof o[3]=='number'?CH('DD '+o[3],'dd'):CH('vs '+E(o[3]),'vs')):'')+(o[4]>0?CH('avantage','av2'):o[4]<0?CH('désavantage','ds'):'')+(o[5]?CH('puis '+E(o[5])+' '+btxt(o[6])+(o[7]!=null?(typeof o[7]=='number'?' · DD '+o[7]:' vs '+E(o[7])):''),'tw'):'')+'</span>':'')+'</span>'),z=H('div','rz');
b.onclick=function(){if(!D.m)for(var k in S)if(k!=n){if(S[k].sp)DS+=S[k].sp;delete S[k];O.children[k*2].classList.remove('on');O.children[k*2+1].innerHTML=''}
if(S[n]){if(S[n].sp)DS+=S[n].sp;delete S[n];b.classList.remove('on');z.innerHTML=''}else{S[n]={o:o,sp:0};b.classList.add('on');if(o[2]!=null)rb(n,z)}up()};O.appendChild(b);O.appendChild(z)});
function par(s2,o){return s2?[o[5],o[6],o[7],0]:[o[0],o[2],o[3],o[4]]}
function show(n,z,s2,r,anchor){var key=s2?'r2':'r',s=S[n];r.f=r.c?NT[r.c]:null;if(r.c=='j')r.f=null;s[key]=r;
var LB={c:"Coup d'éclat",b:'Brillante',r:'Réussite',j:'Échec de justesse',e:'Échec',f:'Fiasco'},box=H('div','rl '+r.c),fill=function(){box.innerHTML='<span class="dz">'+r.d+'</span><span class="rx">'+(LB[r.c]?'<b class="rc">'+(r.ch||LB[r.c])+'</b>':'')+E(r.s).replace(/\n/g,'<br>')+'</span>'};fill();if(anchor)anchor.replaceWith(box);else z.appendChild(box);
if(r.c=='j'){var w=H('div','ch3'),opts=[['Échec simple',0,-.4],['Réussite avec un prix',1,.2]];if(DS>0)opts.push(['Point de Destin : réussite sans prix',2,.2]);
opts.forEach(function(q){var bt=H('button','',q[0]);bt.onclick=function(){if(q[1]==2){DS--;s.sp++}r.ch=q[0];r.f=q[2];r.ok=q[1]>0;r.s+=' → '+q[0]+(q[1]==2?' (reste '+DS+')':'');fill();w.remove();if(!s2&&r.ok&&s.o[5])rb(n,z,1);up()};w.appendChild(bt)});z.appendChild(w)}
else if(r.c=='e'&&DS>0){var rr=H('button','ch3b','Relancer avec un Point de Destin');rr.onclick=function(){DS--;s.sp++;rr.remove();var p=par(s2,s.o),r2=roll(p[0],p[1],p[2],p[3]);r2.s=r.s+'\n'+r2.s.replace('[Jet]','[Relance Destin, reste '+DS+']');show(n,z,s2,r2,box)};z.appendChild(rr)}
else if(!s2&&r.ok&&s.o[5])rb(n,z,1);up()}
function rb(n,z,s2){var p=par(s2,S[n].o),c=H('button','lb','🎲 Lancer'+(s2?' (2e temps)':'')+' '+btxt(p[1]));z.appendChild(c);
c.onclick=function(){if(!S[n]||c.dataset.go)return;c.dataset.go=1;var k=0,t=setInterval(function(){c.classList.add('rol');c.textContent='🎲 '+d20();if(++k>7){clearInterval(t);show(n,z,s2,roll(p[0],p[1],p[2],p[3]),c)}},45)}}
function auto(n){var s=S[n],o=s.o,z=O.children[n*2+1];if(o[2]!=null&&!s.r){var c=z.querySelector('.lb');show(n,z,0,roll(o[0],o[2],o[3],o[4]),c)}
if(o[5]&&s.r&&s.r.ok&&!s.r2){var c2=z.querySelector('.lb');show(n,z,1,roll(o[5],o[6],o[7],0),c2)}}
G.appendChild(SEL);function up(){var k=Object.keys(S);SEL.innerHTML=D.m&&k.length?'<b>Ta sélection</b><br>'+k.map(function(n){return '✓ '+E(S[n].o[0])}).join('<br>'):'';hdr()}
(D.k||[]).forEach(function(k){var l=H('label','ck','<input type="checkbox"> '+E(k));X[k]=l.firstChild;G.appendChild(l)});
var R=H('textarea');R.placeholder='Ta réplique (facultatif)';R.value=D.r||'';var A=H('textarea');A.placeholder='Action libre (un d20 brut est joint)';
var Z=H('input');Z.placeholder='(( hors jeu ))';[R,A,Z].forEach(function(e){G.appendChild(e);e.oninput=function(){ER.textContent=''}});
var ER=H('div','er'),B=H('button','sb','Envoyer au MJ ↗');G.appendChild(ER);G.appendChild(B);
B.onclick=function(){var k=Object.keys(S),m=[];if(!k.length&&!(WK&&WK.any())&&!R.value.trim()&&!A.value.trim()&&!Z.value.trim()){ER.textContent='Choisis une option ou écris quelque chose.';return}
k.forEach(auto);if(WK)WK.auto();if((WK&&WK.pend())||k.some(function(n){var s=S[n];return (s.r&&s.r.c=='j'&&!s.r.ch)||(s.r2&&s.r2.c=='j'&&!s.r2.ch)})){ER.textContent='Échec de justesse : choisis quoi en faire, puis renvoie.';return}ER.textContent='';
if(WK)m=m.concat(WK.msg());k.forEach(function(n){var s=S[n];m.push('> '+s.o[0]);if(s.r)m.push(s.r.s);if(s.r2)m.push(s.r2.s)});
var nt=note();if(nt!=null&&nt!=N0)m.push('Note provisoire : '+F1(N0)+' → '+F1(nt)+' (hors but, passe, résultat)');
for(var x in X)if(X[x].checked)m.push(x+' : oui');if(R.value.trim())m.push('Réplique : « '+R.value.trim()+' »');
if(A.value.trim())m.push('Action libre : '+A.value.trim()+' · d20 brut ('+d20()+')');if(Z.value.trim())m.push('(( '+Z.value.trim()+' ))');B.disabled=1;B.textContent='Envoyé';sendPrompt(m.join('\n'))};
var C=H('details','cm','<summary>Commandes</summary>');['!fiche','!relations','!sauvegarde'].concat(D.c||[]).forEach(function(c){var b=H('button','',c);b.onclick=function(){sendPrompt(c)};C.appendChild(b)});G.appendChild(C);hdr();[].forEach.call(G.children,function(e,j){e.style.animationDelay=Math.min(j,12)*35+'ms'})}
var k=0;(function t(){var g=document.getElementById("g");if(window.__cr)return;if(window.D&&g){window.__cr=1;try{run()}catch(e){g.textContent="Erreur widget : "+e.message}}else if(k++<200)setTimeout(t,50);else if(g)g.textContent="Widget : données D introuvables."})()})()
