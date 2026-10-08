/* ===== v7 : blocs (mail, messagerie, téléphone, match télé, presse, vie) ===== */
var XS=[],FIN=[],IB=null,PH2=null,BK={},
HSH=function(s){var h=0;s=String(s);for(var q=0;q<s.length;q++)h=(h*31+s.charCodeAt(q))|0;return Math.abs(h)},
SEENK=function(s){return 'crv:'+HSH(s)},
VIEW=function(el,fn){var d=0,go=function(){if(!d){d=1;fn()}};try{var io=new IntersectionObserver(function(es){for(var q=0;q<es.length;q++)if(es[q].isIntersecting){io.disconnect();go();return}},{threshold:.1});setTimeout(function(){io.observe(el)},30);setTimeout(go,2500)}catch(e){setTimeout(go,200)}},
NC=['#FF9F0A','#30D158','#64D2FF','#BF5AF2','#FF6B8A','#FFD60A','#8E8CFF','#FF8A65'],
ncol=function(n){return NC[HSH(n)%NC.length]},
AV=function(n){var w=who(n);return w?w[0]:E(String(n||'?').replace(/^@/,'').charAt(0).toUpperCase())},
MD=function(s){return E(s==null?'':s).replace(/==(.+?)==/g,'<mark>$1</mark>').replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>')},
PARA=function(s){return String(s||'').split(/\n{2,}/).map(function(p){return '<p>'+MD(p)+'</p>'}).join('')},
fmt=function(v){return Math.round(v).toLocaleString('fr-FR')},
hx=function(c){c=String(c).replace('#','');if(c.length==3)c=c.replace(/./g,'$&$&');var n=parseInt(c,16)||0;return [n>>16&255,n>>8&255,n&255]},
lum=function(c){var r=hx(c);return .299*r[0]+.587*r[1]+.114*r[2]},
dst=function(a,b){var x=hx(a),y=hx(b);return Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1])+Math.abs(x[2]-y[2])},
teams=function(){return SC?[SC[1],SC[4]]:['OL','Adversaire']},
pair=function(){var t=teams(),A=clb(t[0]),B=clb(t[1]),a=lum(A[1])<55?A[2]:A[1],b=lum(B[1])<55?B[2]:B[1];if(dst(a,b)<140)b=B[2];if(lum(b)<55||dst(a,b)<140)b='#E6F1FB';return [a,b]},
count=function(el,a,b,suf,ms){VIEW(el,function(){var t0=null;function st(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/(ms||1500)),e=1-Math.pow(1-p,3);el.textContent=fmt(a+(b-a)*e)+(suf||'');if(p<1)requestAnimationFrame(st)}requestAnimationFrame(st)})},
APPS={'sms':['💬','Messages','#30D158'],'messages':['💬','Messages','#30D158'],'mail':['✉️','Mail','#0A84FF'],'appel':['📞','Téléphone','#30D158'],'telephone':['📞','Téléphone','#30D158'],'agenda':['📅','Agenda','#FF453A'],'banque':['🏦','Banque','#EF9F27'],'reseaux':['📣','Réseaux','#BF5AF2'],'x':['𝕏','X','#14171A'],'insta':['📸','Instagram','#E1306C'],'instagram':['📸','Instagram','#E1306C'],'tiktok':['🎵','TikTok','#14171A'],'photos':['🌅','Photos','#FF9F0A'],'actus':['📰','Actus','#FF453A'],'ol':['🦁','OL','#E24B4A'],'kinetik':['⚡','Kinetik','#C9A400'],'notes':['📝','Notes','#C9A400'],'meteo':['⛅','Météo','#3A9BDC'],'musique':['🎧','Musique','#FF375F'],'ego dreamers':['🦊','Ego Dreamers','#A32D2D'],'sciences po':['🎓','Sciences Po','#7F3FBF'],'podcast':['🎙️','Podcasts','#8E44AD']},
appOf=function(n){var z=NZ(n||'');return APPS[z]||['🔔',n||'Notification','#636366']},
CPY={'@':function(i){return 'Mail de '+i[1]+' : '+(i[2]||'')+'\n'+(i[3]||'')},Q:function(i){return '« '+i[1]+' »'+(i[2]?' ('+i[2]+')':'')},UNE:function(i){return i[1]+' : '+i[2]+(i[3]?'. '+i[3]:'')},INFO:function(i){return 'Alerte info : '+i[1]},CH:function(i){return i[1]+(i[2]?' · '+i[2]:'')},TB:function(i){return 'Tableau : '+[].concat(i[1]).join(' / ')+(i[2]?' → '+[].concat(i[2]).join(' / '):'')},NB:function(i){return (i[1]||'Carnet')+' : '+(i[2]||[]).join(' / ')},ACH:function(i){return 'Succès : '+i[1]},LT:function(i){return i[1]+(i[2]?' ('+i[2]+')':'')}};

/* ---------- Messagerie ---------- */
function mkPhone(title,day){var o={m:[],el:H('div','ph2')};o.el.dataset.app='Messages';FIN.push(function(){buildPhone(o,title,day)});return o}
BK.SMS=function(i){PH2=mkPhone(i[1],i[2]);return PH2.el};
BK.S=function(i){var nw=!PH2;if(nw)PH2=mkPhone(null,null);PH2.m.push(i);return nw?PH2.el:null};
function buildPhone(o,title,day){var M=o.m,el=o.el,snd=[],lastMe=-1,lastHim=-1,stop=0;
M.forEach(function(i,j){if(i[1]=='Aden')lastMe=j;else{lastHim=j;if(snd.indexOf(i[1])<0)snd.push(i[1])}});
var grp=snd.length>1,nm=title||snd[0]||'Messages',w0=who(nm),
hd=H('div','pth','<span class="pbk">‹</span><span class="pav">'+(grp&&!w0?'👥':AV(nm))+'</span><span class="pnm"><b>'+E(nm)+'</b><small class="pst">'+(grp?E(snd.join(', ')):'')+'</small></span><span class="pic2">📞</span>'),
bd=H('div','pbd');el.appendChild(hd);el.appendChild(bd);if(day)bd.appendChild(H('div','pdy',E(day)));
var st=hd.querySelector('.pst'),base=st.textContent;
var items=M.map(function(i,j){var me=i[1]=='Aden',x=i[4]||{},inner;
if(x.call)return {el:H('div','pcall','📞 Appel manqué'+(x.call>1?' ('+x.call+')':'')+(i[3]?' · '+E(i[3]):'')+(i[2]?'<br><small>'+E(i[2])+'</small>':'')),me:me,sys:1};
if(x.del)inner='<span class="sdel">⊘ Ce message a été supprimé</span>';
else if(x.v){var bars='';for(var b=0;b<28;b++)bars+='<i style="height:'+(4+HSH(String(i[2])+b)%17)+'px"></i>';inner='<span class="vn"><button class="vp" type="button">▶</button><span class="vw">'+bars+'</span><span class="vd">'+E(x.v)+'</span></span><span class="vt" hidden>'+MD(i[2])+'</span>'}
else if(x.p)inner='<span class="sph"><span class="sphi">'+E(x.p)+'</span>'+(i[2]?'<span class="sphc">'+MD(i[2])+'</span>':'')+'</span>';
else inner=MD(i[2]);
var it=H('div','sm2'+(me?' me':'')+(x.p?' img':'')+(x.v?' voc':''),(grp&&!me?'<small class="snm" style="color:'+ncol(i[1])+'">'+E(i[1])+'</small>':'')+inner+(i[3]?'<em>'+E(i[3])+'</em>':'')+(x.re?'<span class="srx">'+E(x.re)+'</span>':''));
if(x.v){var vb=it.querySelector('.vp'),vt=it.querySelector('.vt');vb.onclick=function(ev){ev.stopPropagation();vt.hidden=!vt.hidden;vb.textContent=vt.hidden?'▶':'❚❚';it.classList.toggle('play',!vt.hidden)}}
var r={el:it,me:me,n:i[1],len:String(i[2]||'').length};
if(j==lastMe)r.rc=H('div','prc',E(x.lu?'Lu à '+x.lu:(lastHim>j?'Lu':'Distribué')));
return r});
var ty=H('div','sm2 typ','<span class="tyd"><i></i><i></i><i></i></span>'),hint=H('div','phint','Touche pour tout afficher');
function put(r){bd.appendChild(r.el);if(r.rc)bd.appendChild(r.rc)}
function fin2(){var lt='';for(var q=M.length-1;q>=0;q--)if(M[q][1]!='Aden'&&M[q][3]){lt=M[q][3];break}st.textContent=grp?base:(lt?'vu à '+lt:'en ligne');st.classList.remove('tw')}
function showAll(){stop=1;ty.remove();hint.remove();items.forEach(function(r){if(!r.el.parentNode)put(r)});fin2();ss(key,'1')}
var key=SEENK(JSON.stringify(M));
if(sg(key)=='1'||G.classList.contains('quick'))return showAll();
el.appendChild(hint);el.onclick=function(){if(!stop)showAll()};
VIEW(el,function(){var q=0;(function nx(){if(stop)return;if(q>=items.length)return showAll();var r=items[q++];
if(r.me||r.sys){setTimeout(function(){if(stop)return;put(r);nx()},r.me?550:300)}
else{bd.appendChild(ty);st.textContent=grp?r.n+' écrit…':'écrit…';st.classList.add('tw');setTimeout(function(){if(stop)return;ty.remove();put(r);st.textContent=grp?base:'en ligne';st.classList.remove('tw');nx()},Math.min(1700,600+r.len*14))}})()})}

/* ---------- Mail ---------- */
var FD=[['Club','#E24B4A','royer|brossard|clemence|le gall|garcia|olympique lyonnais|ol'],['Équipe','#EF9F27','aissatou|konate|clara|dumont|leclerc|hannah|price|kaz|ouardi'],['FFF','#3D6BFF','maziere|lacombe|fff|federation|equipe de france'],['Sponsors','#1D9E75','mercier|fontaine|adidas|kinetik|takeda|rhone atelier|blue lock'],['Presse','#64D2FF','camille|roussel|lenoir|kruger|le floch|tiago|branco|journaliste|morand|hugo|redaction'],['Sciences Po','#B07CFF','castellan|vidal|salome|lhermitte|sarah|mekki|sciences po|iep'],['Ego Dreamers','#F09595','lyes|ines|gerard|yasmine|rafa|monique|ego dreamers'],['Indésirables','#993C1D','valat']];
function fold(n,x){if(x.f)return x.f;if(x.spam)return 'Indésirables';var z=NZ(n);for(var q=FD.length-1;q>=0;q--)if(new RegExp('\\b('+FD[q][2]+')\\b').test(z))return FD[q][0];return who(n)?'Autres':'Inconnus'}
var FIC={'Club':'🦁','FFF':'🇫🇷','Sponsors':'🤝','Presse':'🗞️','Sciences Po':'🎓','Ego Dreamers':'🦊','Indésirables':'⚠️'};function mav(n,f){return who(n)?AV(n):(FIC[f]||AV(n))}
function fcol(f){for(var q=0;q<FD.length;q++)if(FD[q][0]==f)return FD[q][1];return f=='Inconnus'?'#8E8E93':'#85B7EB'}
function sigP(n){n=String(n).replace(/[^A-Za-zÀ-ÿ]/g,'')||'Signature';var x=14,y=40,o='M'+x+' '+(y-6),L=Math.min(n.length,10);for(var q=0;q<L;q++){var c=n.charCodeAt(q),h=(q==0||c%4==0)?30:12+c%9,w=12+c%8;o+=' C '+(x+w*.15)+' '+(y-h*.9)+' '+(x+w*.75)+' '+(y-h)+' '+(x+w*.45)+' '+(y-h*.35)+' C '+(x+w*.3)+' '+(y+5)+' '+(x+w*.8)+' '+(y+6)+' '+(x+w)+' '+(y-3);x+=w}return o+' M 8 '+(y+12)+' C 70 '+(y+4)+' 150 '+(y+16)+' '+Math.min(250,x+24)+' '+(y+2)}
BK['@']=function(i){var nw=!IB;if(nw){IB={m:[],el:H('div','mb')};IB.el.dataset.app='Mail';(function(o){FIN.push(function(){buildBox(o)})})(IB)}IB.m.push(i);return nw?IB.el:null};
function buildBox(o){var M=o.m,el=o.el,cur='Tous',unread=0,top=H('div','mbt'),chips=H('div','mbf'),list=H('div','mbl'),rd=H('div','mbr');rd.hidden=1;
el.appendChild(top);el.appendChild(chips);el.appendChild(list);el.appendChild(rd);
var rows=M.map(function(i){var x=i[5]||{},r={i:i,x:x,f:fold(i[1],x),u:!x.lu};if(r.u)unread++;return r});
function tops(){top.innerHTML='<span class="mbi">✉️</span><b>Boîte de réception</b>'+(unread?'<span class="mbu">'+unread+' non lu'+(unread>1?'s':'')+'</span>':'<small>Tout est lu</small>')}
var fs=['Tous'];rows.forEach(function(r){if(fs.indexOf(r.f)<0)fs.push(r.f)});
if(fs.length>2)fs.forEach(function(f){var c=H('button','mfc'+(f=='Tous'?' act':''),(f=='Tous'?'':'<i style="background:'+fcol(f)+'"></i>')+E(f));c.onclick=function(){cur=f;[].forEach.call(chips.children,function(e){e.classList.toggle('act',e==c)});draw()};chips.appendChild(c)});else chips.remove();
function draw(){list.innerHTML='';rows.forEach(function(r){if(cur!='Tous'&&r.f!=cur)return;var i=r.i,x=r.x,pv=String(i[3]||'').replace(/==|\*\*/g,'').replace(/\s+/g,' ').slice(0,96);
var row=H('button','mrw'+(r.u?' un':''),'<span class="mdot"></span><span class="mav" style="--fc:'+fcol(r.f)+'">'+mav(i[1],r.f)+'</span><span class="mtx"><span class="mh"><b>'+E(i[1])+'</b><time>'+E(i[4]||'')+'</time></span><span class="ms">'+(x.t?'<span class="mtg">'+E(x.t)+'</span>':'')+E(i[2]||'(sans objet)')+'</span><span class="mp">'+(x.a&&x.a.length?'📎 ':'')+E(pv)+'</span></span>');
row.onclick=function(){openM(r,1)};list.appendChild(row)})}
function openM(r,usr){if(r.u){r.u=0;unread--;tops()}var i=r.i,x=r.x;list.hidden=1;chips.hidden=1;rd.hidden=0;rd.innerHTML='';
var bk=H('button','mbk','‹ Boîte de réception');bk.onclick=function(){rd.hidden=1;list.hidden=0;chips.hidden=0;draw()};rd.appendChild(bk);
if(x.l||x.g=='fff')rd.appendChild(H('div','mff','<span class="mffl"><i></i><i></i><i></i></span><b>Fédération française de football</b><small>'+E(x.gs||'Direction technique nationale')+'</small>'));
var tg=x.t?NZ(x.t).replace(/[^a-z]/g,''):'';
rd.appendChild(H('div','msj','<b>'+E(i[2]||'(sans objet)')+'</b>'+(x.t?'<span class="mst st-'+tg+'">'+E(x.t)+'</span>':'')));
var w=who(i[1]);rd.appendChild(H('div','mmeta','<span class="mav big" style="--fc:'+fcol(r.f)+'">'+mav(i[1],r.f)+'</span><span class="mmt"><b>'+E(i[1])+'</b>'+(w?'<small> · '+E(w[1])+'</small>':'')+'<br><small>À : '+E(x.to||'Aden Sorensen')+(x.cc?' · Cc : '+E(x.cc):'')+'</small></span><time>'+E(x.d||i[4]||'')+'</time>'));
rd.appendChild(H('div','mbd',PARA(i[3])));
if(x.l){var lw=H('div','mls'),meR=x.me?new RegExp(x.me,'i'):/sorensen|aden/i,oth=[],mine=[];x.l.forEach(function(g){var c=H('div','mlg','<b>'+E(g[0])+'</b>');(g[1]||[]).forEach(function(n){var s=H('span','mln','· · ·');s.dataset.n=n;c.appendChild(s);(meR.test(n)?mine:oth).push(s)});lw.appendChild(c)});rd.appendChild(lw);
var q=0;(function nx(){if(q<oth.length){var s=oth[q++];s.textContent=s.dataset.n;s.classList.add('in');setTimeout(nx,75)}else setTimeout(function(){mine.forEach(function(s){s.textContent=s.dataset.n;s.classList.add('in','mei')});if(mine.length)boom(lw)},1100)})()}
if(x.sg||tg.indexOf('sign')==0){var sn=x.sg||i[1];rd.appendChild(H('div','msig','<svg viewBox="0 0 260 60"><path d="'+sigP(sn)+'"/></svg><small>Signé électroniquement · '+E(sn)+'</small>'))}
if(x.a&&x.a.length){var aw=H('div','mat');x.a.forEach(function(a){var ext=((/\.(\w+)$/.exec(a[0])||[0,''])[1]).toLowerCase(),ic=ext=='pdf'?'📄':/jpe?g|png|gif|heic/.test(ext)?'🖼️':/xlsx?|csv/.test(ext)?'📊':/docx?|txt|pages/.test(ext)?'📝':'📎',ch=H('button','mac','<span class="mai">'+ic+'</span><span class="man"><b>'+E(a[0])+'</b><small>'+E(a[2]||(a[1]?'Toucher pour l\'aperçu':'Pièce jointe'))+'</small></span>'),dv=H('div','mdoc','<div class="mdh">'+ic+' '+E(a[0])+'</div>'+PARA(a[1]));dv.hidden=1;if(a[1])ch.onclick=function(){dv.hidden=!dv.hidden;ch.classList.toggle('act',!dv.hidden)};aw.appendChild(ch);aw.appendChild(dv)});rd.appendChild(aw)}
var ac=H('div','mact'),rb=H('button','','↩ Répondre'),fb=H('button','','↪ Transférer');ac.appendChild(rb);ac.appendChild(fb);rd.appendChild(ac);
if(!r.cp){r.cp=H('div','mcp');r.cp.hidden=1;r.lab=H('div','mcl');r.fw=H('input');r.fw.placeholder='Transférer à… (nom)';r.rt=H('textarea');r.rt.placeholder='Ton message';r.cp.appendChild(r.lab);r.cp.appendChild(r.fw);r.cp.appendChild(r.rt);
XS.push({any:function(){return !!(r.rt.value.trim()||(r.mode=='f'&&r.fw.value.trim()))},msg:function(){var v=r.rt.value.trim(),f=r.fw.value.trim();if(r.mode=='f'&&f)return ['> Transférer le mail de '+i[1]+' (« '+(i[2]||'')+' ») à '+f+(v?' : « '+v+' »':'')];if(v)return ['> Réponse au mail de '+i[1]+' (RE: '+(i[2]||'')+') : « '+v+' »'];return []}})}
function mode(m,f){r.mode=m;r.cp.hidden=0;r.fw.hidden=m!='f';r.lab.innerHTML=m=='f'?'<b>TR :</b> '+E(i[2]||''):'<b>À :</b> '+E(i[1])+' · <b>Objet :</b> RE: '+E(i[2]||'');rb.classList.toggle('act',m=='r');fb.classList.toggle('act',m=='f');if(f)try{(m=='f'?r.fw:r.rt).focus()}catch(e){}}
rb.onclick=function(){mode('r',1)};fb.onclick=function(){mode('f',1)};rd.appendChild(r.cp);if(r.mode)mode(r.mode);
if(usr)try{el.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(e){}}
tops();draw();if(M.length==1)openM(rows[0])}

/* ---------- Téléphone : verrouillage et accueil ---------- */
BK.LOCK=function(i){var el=H('div','lk'),N=i[3]||[],gp={},od=[];N.forEach(function(n){var a=appOf(n[0]),k=a[1];if(!gp[k]){gp[k]=[];od.push(k)}gp[k].push([a].concat(n.slice(1)))});
el.innerHTML='<div class="lkt">🔒</div><div class="lkc">'+E(i[1]||'')+'</div><div class="lkd">'+E(i[2]||'')+'</div>';var st=H('div','lks');el.appendChild(st);
od.forEach(function(k,gi){var L=gp[k],g=H('div','lkg'+(L.length>1?' stk':''));g.style.animationDelay=(350+gi*200)+'ms';
function card(n,more){var a=n[0];return '<div class="lkn"><span class="lki" style="background:'+a[2]+'">'+a[0]+'</span><span class="lkb"><span class="lkh"><b>'+E(a[1])+'</b><time>'+E(n[3]||'')+'</time></span><b class="lkf">'+E(n[1]||'')+'</b><span class="lkx">'+MD(n[2]||'')+'</span>'+(more?'<small class="lkm">+'+more+' autre'+(more>1?'s':'')+'</small>':'')+'</span></div>'}
var op=0;function draw(){g.innerHTML=op?L.map(function(n){return card(n,0)}).join(''):card(L[0],L.length-1);g.classList.toggle('opn',!!op)}draw();g.onclick=function(){op=!op;draw()};st.appendChild(g)});
el.appendChild(H('div','lkf2','<span>Glisser pour déverrouiller</span>'));return el};
BK.HOME=function(i){var el=H('div','hm'),A=i[2]||[];el.innerHTML='<div class="hmw"><div class="hmc"><b>'+E(i[1]||'')+'</b><small>'+E(i[4]||'')+'</small></div>'+(i[3]?'<div class="hme">'+MD(i[3])+'</div>':'')+'</div>';var gr=H('div','hmg');
A.forEach(function(a,j){var ap=appOf(a[0]),b=H('button','hma','<span class="hmi" style="background:'+ap[2]+'">'+ap[0]+(a[1]?'<i>'+E(a[1])+'</i>':'')+'</span><small>'+E(ap[1])+'</small>');b.style.animationDelay=(120+j*45)+'ms';
b.onclick=function(){var t=G.querySelector('[data-app="'+ap[1]+'"]');if(t){try{t.scrollIntoView({behavior:'smooth',block:'center'})}catch(e){}t.classList.remove('ping');void t.offsetWidth;t.classList.add('ping')}else{b.classList.remove('nop');void b.offsetWidth;b.classList.add('nop')}};gr.appendChild(b)});el.appendChild(gr);return el};

/* ---------- Mise en scène ---------- */
BK.CH=function(i){var h=/(\d{1,2})\s?h/.exec((i[2]||'')+' '+(i[1]||'')),hh=h?+h[1]:12,tn=hh<6||hh>=21?'nu':hh<11?'au':hh<18?'jo':'so';return H('div','chc '+tn,(i[3]?'<span class="chi">'+E(i[3])+'</span>':'')+'<b>'+E(i[1]||'')+'</b>'+(i[2]?'<small>'+E(i[2])+'</small>':''))};
BK.Q=function(i){return H('blockquote','pq','<span class="pqm">«</span>'+E(i[1]||'')+(i[2]?'<cite>'+E(i[2])+'</cite>':''))};
BK.TB=function(i){var el=H('div','tbd'),bd=H('div','tbb'),d=150,L=[].concat(i[1]||'');
function line(t,c){var l=H('div','tbl'+(c?' '+c:''));String(t).split(' ').forEach(function(wd,wi){var w=H('span','tbw');w.style.transform='rotate('+((HSH(wd+wi)%5)-2)*.6+'deg)';wd.split('').forEach(function(ch){var s=H('span','tbc',E(ch));s.style.animationDelay=(d+=80)+'ms';w.appendChild(s)});d+=120;l.appendChild(w)});return l}
var first=L.map(function(t){var l=line(t);bd.appendChild(l);return l});
if(i[2]){d+=450;first.forEach(function(l){var x=H('i','tbx');x.style.animationDelay=d+'ms';l.appendChild(x)});d+=550;[].concat(i[2]).forEach(function(t){bd.appendChild(line(t,'nw'))})}
el.appendChild(bd);el.appendChild(H('div','tbt','<i></i><i></i><i></i>'));if(i[3])el.appendChild(H('small','tbs',E(i[3])));return el};
BK.NB=function(i){var el=H('div','cnb'),d=150;el.innerHTML='<div class="cnr"></div>'+(i[1]?'<div class="cnh">'+E(i[1])+(i[3]?'<small>'+E(i[3])+'</small>':'')+'</div>':'');(i[2]||[]).forEach(function(t){var s=String(t),sk=s[0]=='~',ul=s[0]=='*';if(sk||ul)s=s.slice(1);var l=H('div','cnl'+(sk?' sk':'')+(ul?' ul':''),E(s)+(sk||ul?'<i></i>':''));l.style.animationDelay=(d+=380)+'ms';if(sk||ul)l.querySelector('i').style.animationDelay=(d+700)+'ms';el.appendChild(l)});return el};

/* ---------- Match façon télé ---------- */
BK.XI=function(i){var T=[[i[1],i[2],i[3]],[i[4],i[5],i[6]]].filter(function(t){return t[0]&&t[2]}),two=T.length>1,el=H('div','xi'),pf=H('div','xpf'+(two?' two':''));
el.appendChild(H('div','xih',T.map(function(t,k){var c=clb(t[0]);return '<span class="xit'+(k?' r':'')+'"><i style="background:'+c[1]+';border-color:'+c[2]+'"></i><b>'+E(t[0])+'</b><small>'+E(t[1]||'')+'</small></span>'}).join(two?'<em>vs</em>':'')));
pf.innerHTML='<div class="xl hw"></div><div class="xl cc"></div><div class="xl bt"></div><div class="xl bb"></div><div class="xl gt"></div><div class="xl gb"></div>';
var C0=clb(T[0][0]);T.forEach(function(t,k){var c=clb(t[0]);if(k&&dst(c[1],C0[1])<140)c=[0,c[2],c[1]];var ln=String(t[1]||'4-4-2').split('-').map(Number),pos=[[50,two?94:93]],y0=two?83:80,y1=two?58:18;
ln.forEach(function(n,li){var y=ln.length>1?y0-(y0-y1)*li/(ln.length-1):y0;for(var j=0;j<n;j++)pos.push([12+(j+.5)*76/n,y])});
t[2].forEach(function(p,j){var q=pos[j]||[50,50],x=k?100-q[0]:q[0],y=k?100-q[1]:q[1],s=String(p),cap=/\(c\)/i.test(s),nm=s.replace(/\s*\(c\)\s*/i,''),me=/sorensen|\baden\b/i.test(nm),num=/^(\d+)\s+/.exec(nm);if(num)nm=nm.slice(num[0].length);
var d=H('div','xp'+(me?' me':''),'<span class="xs" style="background:'+(me?'#E24B4A':c[1])+';border-color:'+c[2]+';color:'+(lum(c[1])>150?'#111':'#fff')+'">'+(me?'🦊':(num?num[1]:''))+(cap?'<i>C</i>':'')+'</span><b>'+E(nm)+'</b>');d.style.left=x+'%';d.style.top=y+'%';d.style.animationDelay=(k*350+j*55)+'ms';pf.appendChild(d)})});
el.appendChild(pf);return el};
BK.LT=function(i){var w=who(i[1]),sub=i[2]||(w?w[1]+(w[3]?' · '+w[3]:''):''),c=clb(i[3]||sub||'');return H('div','lt','<span class="ltb" style="background:'+c[1]+'"></span><span class="lta">'+(w?w[0]:E(String(i[1]).charAt(0)))+'</span><span class="ltt"><b>'+E(i[1])+'</b><small>'+E(sub)+'</small></span>')};
BK.SUB=function(i){var el=H('div','sub');if(/^\+\s*\d/.test(i[1])){el.innerHTML='<div class="sbo"><span class="sadd">'+E(i[1].replace(/\s/g,''))+'</span><small>temps additionnel</small></div>';return el}
el.innerHTML='<div class="sbo"><span class="sin"><i>▲</i>'+E(i[1]||'')+'</span><span class="sout"><i>▼</i>'+E(i[2]||'')+'</span></div>'+(i[3]?'<small class="smin">'+E(i[3])+'</small>':'');return el};
BK.MO=function(i){var tn=teams(),cp=pair(),el=H('div','mo'),hd='<div class="moh"><b style="color:'+cp[0]+'">'+E(tn[0])+'</b><span>'+E(i[2]||(typeof i[1]=='number'?'Domination':'Temps forts'))+'</span><b style="color:'+cp[1]+'">'+E(tn[1])+'</b></div>';
if(typeof i[1]=='number'){var v=Math.max(0,Math.min(100,i[1]));el.innerHTML=hd+'<div class="mob"><u style="width:'+v+'%;background:'+cp[0]+'"></u><s style="background:'+cp[1]+'"></s><em style="left:'+v+'%"></em></div><div class="moh"><small>'+v+' %</small><small>'+(100-v)+' %</small></div>';return el}
var A=i[1]||[],mx=Math.max.apply(null,A.map(function(v){return Math.abs(v)}).concat([1])),bars=A.map(function(v,j){return '<i style="height:'+(Math.abs(v)/mx*44)+'%;'+(v>=0?'bottom:50%;background:'+cp[0]:'top:50%;background:'+cp[1])+';left:'+(j/A.length*100)+'%;width:calc('+(100/A.length)+'% - 2px);animation-delay:'+(j*45)+'ms"></i>'}).join('');
el.innerHTML=hd+'<div class="mog">'+bars+'<span class="mom"></span><span class="moht"></span></div><div class="mot"><small>0\'</small><small>45\'</small><small>90\'</small></div>';return el};
BK.ST=function(i){var tn=teams(),cp=pair(),el=H('div','stt','<div class="moh"><b style="color:'+cp[0]+'">'+E(tn[0])+'</b><span>'+E(i[2]||'Statistiques')+'</span><b style="color:'+cp[1]+'">'+E(tn[1])+'</b></div>');
(i[1]||[]).forEach(function(r,j){var a=+String(r[1]).replace(',','.')||0,b=+String(r[2]).replace(',','.')||0,t=a+b||1,pc=/poss/i.test(r[0])?' %':'';el.appendChild(H('div','str','<span class="stv'+(a>b?' hi':'')+'">'+E(r[1])+pc+'</span><span class="stm"><small>'+E(r[0])+'</small><span class="stb"><span><u style="width:'+(a/t*100)+'%;background:'+cp[0]+';animation-delay:'+(j*90)+'ms"></u></span><span><u style="width:'+(b/t*100)+'%;background:'+cp[1]+';animation-delay:'+(j*90)+'ms"></u></span></span></span><span class="stv r'+(b>a?' hi':'')+'">'+E(r[2])+pc+'</span>'))});return el};
BK.AMB=function(i){var v=Math.max(0,Math.min(100,+i[1]||0)),lb=v<30?'Calme':v<55?'Ça chante':v<75?'Chaud':v<90?'Bouillant':'Volcan',bars='';for(var q=0;q<30;q++){var lit=q/30*100<v;bars+='<i class="'+(lit?'lit':'')+'" style="--h:'+(35+HSH('a'+q)%60)+'%;animation-duration:'+(.45+(q%5)*.12)+'s;background:'+(q<11?'#30D158':q<21?'#FFD60A':'#FF453A')+'"></i>'}
return H('div','amb','<div class="moh"><span>🏟️ Ambiance</span><b>'+lb+'</b><small>'+v+' / 100</small></div><div class="ambq">'+bars+'</div>'+(i[2]?'<div class="ambc"><span>♪ '+E(i[2])+' ♪ &nbsp; ♪ '+E(i[2])+' ♪ &nbsp; </span></div>':''))};

/* ---------- Presse et réseaux ---------- */
BK['#']=function(i){var md=i[1]||'',x=i[3]||{},ty=/^@|tiktok|instagram|twitter|\bx\b|reddit|threads|youtube|snap/i.test(md)?'so':/10 ?sport|mercato|closer|voici|public|gala|tablo|buzz|\bsun\b|bild|people/i.test(md)?'tab':'';
if(ty=='so'){var el=H('div','soc','<div class="sh"><span class="sav">'+E((md.replace(/^@/,'')[0]||'@').toUpperCase())+'</span><b>'+E(md)+'</b>'+(x.v?'<span class="sver">✓</span>':'')+'<small class="shh">'+E(x.h||'')+'</small></div><div class="st">'+MD(i[2])+'</div><div class="sa"><span>♡ '+E(x.l||'')+'</span><span>⟲ '+E(x.r||'')+'</span><span>💬 '+E(x.c?x.c.length:'')+'</span></div>');el.dataset.app='Réseaux';
if(x.c&&x.c.length){var cs=H('div','scm');x.c.forEach(function(c){cs.appendChild(H('div','sci','<span class="sav s" style="background:'+ncol(c[0])+'">'+E(String(c[0]).replace(/^@/,'').charAt(0).toUpperCase())+'</span><span class="scx"><b>'+E(c[0])+'</b> '+MD(c[1])+(c[2]?'<small>♡ '+E(c[2])+'</small>':'')+'</span>'))});el.appendChild(cs)}return el}
var p=H('div','pr'+(ty?' '+ty:''),'<span class="pm">'+E(md)+'</span><span class="pt">'+E(i[2])+'</span>'+(x.s?'<span class="psb">'+MD(x.s)+'</span>':''));p.dataset.app='Actus';return p};
BK.UNE=function(i){var N=i[5]||[],el=H('div','une');el.dataset.app='Actus';
el.innerHTML='<div class="unm">'+E(i[1]||'Le Quotidien')+'</div><div class="und"><span>'+E(i[6]||'')+'</span><span>N° '+fmt(HSH(i[1]+i[6])%90000+10000)+'</span><span>2,10 €</span></div><h3 class="unh">'+E(i[2]||'')+'</h3><div class="unc"><div class="unp"><span>'+E(i[4]||'📸')+'</span>'+(i[7]?'<small>'+E(i[7])+'</small>':'')+'</div><div class="unl">'+(i[3]?'<p>'+MD(i[3])+'</p>':'')+(N.length?'<div class="unn"><b>Les notes</b>'+N.map(function(n){var v=+String(n[1]).replace(',','.'),c=v>=8?'#0F6E56':v>=6?'#185FA5':v>=5?'#854F0B':'#A32D2D';return '<span><em>'+E(n[0])+'</em><i style="background:'+c+'">'+E(String(n[1]).replace('.',','))+'</i></span>'}).join('')+'</div>':'')+'</div></div>';return el};
BK.INFO=function(i){var t=E(i[1]||''),d=Math.max(12,String(i[1]||'').length*.2);var el=H('div','inf','<span class="infl"><i></i>'+E(i[2]||'Alerte info')+'</span><span class="infs"><span style="animation-duration:'+d+'s">'+t+' &nbsp;·&nbsp; '+t+' &nbsp;·&nbsp; </span></span>');el.dataset.app='Actus';return el};
BK.FOL=function(i){var a=+i[1]||0,b=i[2]!=null?+i[2]:a,ap=i[3]?appOf(i[3]):['👥','Abonnés','#BF5AF2'],el=H('div','fol','<span class="foli" style="background:'+ap[2]+'">'+ap[0]+'</span><span class="folt"><small>'+E(i[3]?ap[1]+' · abonnés':'Abonnés')+'</small><b>'+fmt(a)+'</b></span>'+(b!=a?'<span class="fold '+(b>a?'up':'dn')+'">'+(b>a?'▲ +':'▼ −')+fmt(Math.abs(b-a))+'</span>':''));el.dataset.app='Réseaux';if(b!=a)count(el.querySelector('.folt b'),a,b,'',1800);return el};

/* ---------- Vie de carrière ---------- */
BK.ACH=function(i){var el=H('div','ach','<span class="achi">'+E(i[3]||'🏆')+'</span><span class="acht"><small>Succès débloqué</small><b>'+E(i[1]||'')+'</b>'+(i[2]?'<em>'+E(i[2])+'</em>':'')+'</span>');VIEW(el,function(){setTimeout(function(){el.classList.add('go');boom(el)},300)});return el};
BK.PIC=function(i){var el=H('div','pic'),L=i[2]||[],sel=null,rw=H('div','picr');el.appendChild(H('div','pich','📸 '+E(i[1]||'Quelle photo ?')));
L.forEach(function(p,j){var b=H('button','pcp','<span class="pcv">'+E(p[1]||'📸')+'</span><span class="pcl">'+E(p[0])+'</span>'+(p[2]?'<small>'+E(p[2])+'</small>':''));b.style.setProperty('--r',((j%2?1:-1)*(1.2+j%3*.8))+'deg');b.onclick=function(){sel=sel===j?null:j;[].forEach.call(rw.children,function(e,q){e.classList.toggle('sel',q===sel)})};rw.appendChild(b)});el.appendChild(rw);
XS.push({any:function(){return sel!=null},msg:function(){return sel!=null?['> Photo choisie : '+L[sel][0]]:[]}});return el};
BK.BANK=function(i){var T=i[3]||[],inc=0,out=0;T.forEach(function(t){var v=+t[1]||0;if(v>=0)inc+=v;else out-=v});var bal=+i[2]||0,left=inc-out,el=H('div','bk');el.dataset.app='Banque';
el.innerHTML='<div class="bkh"><span class="bki">🏦</span><b>Compte courant</b><small>'+E(i[1]||'')+'</small></div><div class="bkb"><small>Solde disponible</small><b class="bkn">0 €</b></div>';
if(T.length){var tt=Math.max(inc,out)||1;el.appendChild(H('div','bk3','<div class="bk3r"><span>Entrées</span><span class="bk3b"><i class="c1" style="width:'+(inc/tt*100)+'%"></i></span><b>'+fmt(inc)+' €</b></div><div class="bk3r"><span>Sorties</span><span class="bk3b"><i class="c2" style="width:'+(out/tt*100)+'%"></i></span><b>'+fmt(out)+' €</b></div><div class="bk3r"><span>Reste</span><span class="bk3b"><i class="c3" style="width:'+(Math.max(0,left)/tt*100)+'%"></i></span><b>'+(left<0?'−':'')+fmt(Math.abs(left))+' €</b></div>'));
var ls=H('div','bkl');T.forEach(function(t){var v=+t[1]||0;ls.appendChild(H('div','bkr','<span class="bkx">'+E(t[2]||(v>=0?'↘':'↗'))+'</span><span>'+E(t[0])+'</span><b class="'+(v>=0?'pl':'mn')+'">'+(v>=0?'+':'−')+fmt(Math.abs(v))+' €</b>'))});el.appendChild(ls)}
if(i[4])el.appendChild(H('small','bkf',MD(i[4])));count(el.querySelector('.bkn'),0,bal,' €',1400);return el};
