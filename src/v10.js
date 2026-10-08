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

/* ---------- 5. mode cinéma ---------- */
FIN.push(function(){var tb=G.querySelector('.tbr');if(!tb)return;var b=H('button','','🎬');b.title='Mode cinéma';var io=null;
b.onclick=function(){var on=!G.classList.contains('cine');G.classList.toggle('cine',on);b.classList.toggle('on',on);
if(on){G.classList.remove('quick','lv');try{io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});[].forEach.call(G.children,function(c,j){if(c.classList.contains('bgl')||c.classList.contains('hd')||c.classList.contains('tbr'))return;c.classList.add('cv');c.classList.remove('in');if(j<4)c.classList.add('in');else io.observe(c)})}catch(e){[].forEach.call(G.children,function(c){c.classList.add('in')})}
try{G.scrollIntoView({behavior:'smooth',block:'start'})}catch(e){}}
else{if(io)io.disconnect();[].forEach.call(G.children,function(c){c.classList.remove('cv','in')})}};tb.insertBefore(b,tb.querySelector('button:nth-child(2)')||null)});

/* ---------- 6. conférence de presse ---------- */
BK.CONF=function(i){var el=H('div','conf'),Q=i[1]||[],A=[];el.dataset.app='Actus';
el.innerHTML='<div class="confw"><span>🦁 OL</span><span>⚡ Kinetik</span><span>🦁 OL</span><span>⚡ Kinetik</span><span>🦁 OL</span><span>⚡ Kinetik</span></div><div class="confh"><b>'+E(i[2]||'Conférence de presse')+'</b><small>'+Q.length+' question'+(Q.length>1?'s':'')+'</small><i class="confm">🎙️</i><i class="confm">🎙️</i><i class="confm">🎙️</i></div>';
Q.forEach(function(q,k){var w=who(q[0]),sug=q[2]||[],card=H('div','confq'),ans=H('textarea','confa'),tone=null,skip=0;ans.placeholder='Ta réponse';
card.innerHTML='<div class="confj"><span class="tav">'+(w?w[0]:E(String(q[0]).charAt(0)))+'</span><span class="confn"><b>'+E(q[0])+'</b><small>'+E(w?w[1]:'')+'</small></span><em>Q'+(k+1)+'</em></div><p class="confqt">« '+MD(q[1]||'')+' »</p>';
if(sug.length){var ch=H('div','confs');sug.forEach(function(s){var c=H('button','wsc',E(s));c.type='button';c.onclick=function(){tone=tone===s?null:s;[].forEach.call(ch.children,function(e){e.classList.toggle('on',e===c&&tone===s)});if(tone&&!ans.value.trim())ans.focus()};ch.appendChild(c)});card.appendChild(ch)}
card.appendChild(ans);var sk=H('button','confk','Pas de commentaire');sk.type='button';sk.onclick=function(){skip=!skip;sk.classList.toggle('on',skip);ans.disabled=skip;if(skip)ans.value=''};card.appendChild(sk);ans.oninput=function(){up()};el.appendChild(card);
A.push({any:function(){return skip||!!ans.value.trim()},msg:function(){if(skip)return ['> Conf. de presse · '+q[0]+' : pas de commentaire'];var v=ans.value.trim();return v?['> Conf. de presse · '+q[0]+' (« '+String(q[1]||'').slice(0,60)+(String(q[1]||'').length>60?'…':'')+' ») : « '+v+' »'+(tone?' · ton : '+tone:'')]:[]}})});
XS.push({any:function(){return A.some(function(a){return a.any()})},msg:function(){var m=[];A.forEach(function(a){m=m.concat(a.msg())});return m}});return el};
