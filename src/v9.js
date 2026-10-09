/* ===== v7.4 : match en direct, temps forts jouables, compétitions, bulletin, contrats, vestiaire ===== */
APPS.compet=['🏆','Compét','#EF9F27'];
var ZC={g:'#1D9E75',t:'#2BB5A0',b:'#3D8BFF',o:'#EF9F27',r:'#E24B4A'},
MYC=function(n){return MY.re.test(n||'')||/sorensen|\baden\b/i.test(n||'')},
WDL=function(sc){var m=/(\d+)\s*-\s*(\d+)/.exec(String(sc||''));if(!m)return '';return +m[1]>+m[2]?'w':+m[1]<+m[2]?'l':'d'},
ZON=function(cp,n,z){if(z)return z;var c=NZ(cp||'');
if(/ligue 1|l1\b/.test(c))return [[1,3,'Ligue des champions','g'],[4,4,'Barrage C1','t'],[5,6,'Europe','b'],[16,16,'Barrage','o'],[17,99,'Relégation','r']];
if(/premier|liga|serie a|bundesliga|eredivisie|primeira/.test(c))return [[1,4,'Ligue des champions','g'],[5,5,'Ligue Europa','b'],[6,6,'Conférence','t'],[n-2,99,'Relégation','r']];
if(/champions|europa|conf[ée]rence|\bc[123]\b/.test(c)&&n>8)return [[1,8,'Qualifié','g'],[9,24,'Barrage','t'],[25,99,'Éliminé','r']];
if(n<=6)return [[1,2,'Qualifié','g'],[3,3,'Repêchage possible','t'],[4,99,'Éliminé','r']];
return [[1,4,'Europe','g'],[n-2,99,'Relégation','r']]},
LIGS=function(cp){return 'crl:'+NZ(cp||'ligue')},
SN=function(v){if(v==null||v==='')return null;var n=parseFloat(String(v).replace(/[^\d.,-]/g,'').replace(',','.'));return isNaN(n)?null:n},
ligRows=function(R){return R.map(function(r){return {c:r[0],p:SN(r[1])||0,j:SN(r[2])||0,d:SN(r[3]),f:r[4]||''}})},
ligSort=function(L){return L.sort(function(a,b){return b.p-a.p||((b.d||0)-(a.d||0))||a.c.localeCompare(b.c)})};
function ligTable(cp,L,x){x=x||{};var n=L.length,Z=ZON(cp,n,x.z),me=x.me||null,el=H('div','lig'),jmax=Math.max.apply(null,L.map(function(r){return r.j}).concat([0]));
el.dataset.app='Compét';
var zc=function(k){for(var q=0;q<Z.length;q++)if(k>=Z[q][0]&&k<=Z[q][1])return Z[q];return null};
el.innerHTML='<div class="ligh"><b>🏆 '+E(cp||'Classement')+'</b>'+(x.g?'<span>'+E(x.g)+'</span>':'')+'<small>'+(jmax?'J'+jmax:'')+'</small></div>';
var tb=H('div','ligt','<div class="ligr hd2"><span>#</span><span>Club</span><span>J</span><span>Diff</span><span>Pts</span></div>');
L.forEach(function(r,k){var z=zc(k+1),mine=me?NZ(r.c)==NZ(me):MYC(r.c),c=clb(r.c),f=r.f?'<span class="ligf">'+String(r.f).toUpperCase().split('').map(function(ch){return '<i class="'+(ch=='V'||ch=='W'?'w':ch=='N'||ch=='D'?'d':'l')+'"></i>'}).join('')+'</span>':'';
tb.appendChild(H('div','ligr'+(mine?' me':'')+(z?' z-'+z[3]:''),'<span class="ligk">'+(k+1)+'</span><span class="ligc"><i style="background:'+c[1]+';border-color:'+c[2]+'"></i>'+E(r.c)+f+'</span><span>'+r.j+'</span><span class="ligd">'+(r.d==null?'':(r.d>0?'+':'')+r.d)+'</span><span class="ligp">'+r.p+'</span>'))});
el.appendChild(tb);var lg=H('div','ligl');Z.forEach(function(z){if(z[0]<=n)lg.appendChild(H('span','','<i style="background:'+ZC[z[3]]+'"></i>'+E(z[2])))});el.appendChild(lg);return el}
BK.LIG=function(i){var L=ligSort(ligRows(i[2]||[])),x=i[3]||{};try{ss(LIGS(i[1]),JSON.stringify({cp:i[1],L:L,x:x}))}catch(e){}return ligTable(i[1],L,x)};
BK['LIG+']=function(i){var key=null,U,st=null;if(typeof i[1]=='string'&&Array.isArray(i[2])){key=LIGS(i[1]);U=i[2]}else{U=Array.isArray(i[1])&&Array.isArray(i[1][0])?i[1]:[i.slice(1)];try{for(var q=0;q<localStorage.length;q++){var k=localStorage.key(q);if(k&&k.indexOf('crl:')==0){key=k;break}}}catch(e){}}
try{if(key)st=JSON.parse(sg(key))}catch(e){st=null}
if(!st){var el=H('div','nt up','<i>▲</i>'+U.map(function(u){return E(u[0])+' : '+E(u[1])+' pts'+(u[2]!=null?', J'+E(u[2]):'')}).join(' · '));return el}
U.forEach(function(u){var f=null;st.L.forEach(function(r){if(NZ(r.c)==NZ(u[0]))f=r});if(!f){f={c:u[0],p:0,j:0,d:0,f:''};st.L.push(f)}if(u[1]!=null)f.p=SN(u[1])||0;if(u[2]!=null)f.j=SN(u[2])||0;if(u[3]!=null)f.d=SN(u[3]);if(u[4])f.f=u[4]});
ligSort(st.L);try{ss(key,JSON.stringify(st))}catch(e){}var t=ligTable(st.cp,st.L,st.x);t.classList.add('upd');return t};
BK.CAL=function(i){var el=H('div','cal2'),nx=1;el.dataset.app='Compét';el.innerHTML='<div class="ligh"><b>📅 '+E(i[2]||'Calendrier')+'</b></div>';
(i[1]||[]).forEach(function(m){var sc=m[3]||'',res=WDL(sc),c=clb(m[1]||''),lieu=String(m[2]||''),dom=/^dom|domicile|groupama|maison/i.test(lieu),ext=/^ext|exterieur|extérieur|déplacement/i.test(lieu),next=!sc&&nx;if(next)nx=0;
el.appendChild(H('div','calr'+(res?' r-'+res:'')+(next?' nx':''),'<span class="cald">'+E(m[0]||'')+'</span><span class="calv"><i style="background:'+c[1]+';border-color:'+c[2]+'"></i><b>'+E(m[1]||'')+'</b><small>'+(dom?'Domicile':ext?'Extérieur':E(lieu))+(m[4]?' · '+E(m[4]):'')+'</small></span><span class="cals">'+(sc?E(sc):next?'À venir':'·')+'</span>'))});return el};
BK.KO=function(i){var el=H('div','ko'),R=i[2]||[];el.dataset.app='Compét';el.innerHTML='<div class="ligh"><b>🏆 '+E(i[1]||'Tableau')+'</b></div>';var w=H('div','kow');
R.forEach(function(rd,k){var col=H('div','koc','<b>'+E(rd[0]||'')+'</b>');(rd[1]||[]).forEach(function(m){var sc=String(m[2]||''),r=WDL(sc),a=clb(m[0]||''),b=clb(m[1]||''),mine=MYC(m[0])||MYC(m[1]),pen=/tab|t\.a\.b|pén/i.test(sc);
col.appendChild(H('div','kom'+(mine?' me':''),'<span class="'+(r=='w'?'win':r=='l'?'los':'')+'"><i style="background:'+a[1]+';border-color:'+a[2]+'"></i>'+E(m[0]||'?')+'</span><span class="'+(r=='l'?'win':r=='w'?'los':'')+'"><i style="background:'+b[1]+';border-color:'+b[2]+'"></i>'+E(m[1]||'?')+'</span><em>'+(sc?E(sc):'·')+'</em>'))});w.appendChild(col)});el.appendChild(w);return el};
if(TELM){['LIG','LIG+','CAL','KO'].forEach(function(k){var f=BK[k];BK[k]=function(i){TD.comp.push([k,f,i]);return f(i)}});
APPX.compet=function(v,nav,empty){nav(v,'Compétitions');if(!TD.comp.length)return empty(v,'Pas de classement pour le moment.');TD.comp.forEach(function(c){var e=c[1](c[2]);e.classList.add('intel');v.appendChild(e)})}}

/* ---------- bulletin de notes ---------- */
function bulTeam(tm,N,hdm){var L=N||[],sum=0,c=clb(tm||''),g=H('div','bult');L.forEach(function(n){sum+=+String(n[1]).replace(',','.')||0});
g.innerHTML='<div class="bulh"><i style="background:'+c[1]+';border-color:'+c[2]+'"></i><b>'+E(tm||'')+'</b><small>moy. '+(L.length?F1(sum/L.length):'')+'</small></div>';
L.forEach(function(n,k){var v=+String(n[1]).replace(',','.')||0,col=v>=8?'#0F6E56':v>=6.5?'#185FA5':v>=5?'#854F0B':'#A32D2D',me=MYC(n[0]),isH=hdm&&NZ(n[0])==NZ(hdm);
var r=H('div','bulr'+(me?' me':'')+(isH?' hdm':''),'<span class="buln">'+(isH?'<em>★</em>':'')+E(n[0])+(n[2]?'<small>'+E(n[2])+'</small>':'')+'</span><span class="bulb"><u style="width:'+(v*10)+'%;background:'+col+'"></u></span><b style="background:'+col+'">'+E(String(n[1]).replace('.',','))+'</b>');r.style.animationDelay=(k*60)+'ms';g.appendChild(r)});return g}
BK.BUL=function(i){var el=H('div','bul'),hdm=i[3]||'';el.innerHTML='<div class="bulm"><b>Les notes</b>'+(hdm?'<span class="bulhd">★ Homme du match · '+E(hdm)+'</span>':'')+'</div>';var w=H('div','bulw'+(i[4]?' two':''));w.appendChild(bulTeam(i[1],i[2],hdm));if(i[4])w.appendChild(bulTeam(i[4],i[5],hdm));el.appendChild(w);return el};

/* ---------- temps fort jouable ---------- */
BK.TF=function(i){var el=H('div','tf'),op=H('div','op');el.innerHTML='<div class="tfh"><span class="tfm">'+E(i[1]||'')+'</span><span class="tfk">'+E(i[4]||'Temps fort')+'</span><i class="live">EN DIRECT</i></div>'+(i[2]?'<p class="tft">'+MD(i[2])+'</p>':'');el.appendChild(op);optsUI(i[3]||[],op,false,'['+(i[1]||'temps fort')+']');var ta=H('textarea','tfa');ta.placeholder='Ou une action libre à la '+(i[1]||'minute')+' (un d20 brut est joint)';el.appendChild(ta);ta.oninput=function(){up()};XS.push({any:function(){return !!ta.value.trim()},msg:function(){var v=ta.value.trim();return v?['> ['+(i[1]||'temps fort')+'] Action libre : '+v+' · d20 brut ('+d20()+')']:[]}});return el};

/* ---------- contrat et sponsor ---------- */
function decide(el,lbl,x,yes,no){if(x.st){el.appendChild(H('div','ctst '+(/sign|accept/i.test(x.st)?'ok':'ko'),E(x.st)));return}
var w=H('div','ctb'),sel=null,ok=H('button','',yes),ko=H('button','',no);ok.onclick=function(){sel=sel=='y'?null:'y';ok.classList.toggle('on',sel=='y');ko.classList.remove('on')};ko.onclick=function(){sel=sel=='n'?null:'n';ko.classList.toggle('on',sel=='n');ok.classList.remove('on')};w.appendChild(ok);w.appendChild(ko);el.appendChild(w);
XS.push({any:function(){return !!sel},msg:function(){return sel?['> '+lbl+' : '+(sel=='y'?yes:no)]:[]}})}
BK.CTR=function(i){var x=i[5]||{},c=clb(i[1]||''),el=H('div','ctr'),sal=i[3]!=null?(typeof i[3]=='number'?fmt(i[3])+' € brut / mois':String(i[3])):'';
el.innerHTML='<div class="ctrh" style="--c1:'+c[1]+';--c2:'+c[2]+'"><i></i><div><b>'+E(i[1]||'Club')+'</b><small>'+E(x.t||'Contrat de joueur professionnel')+'</small></div><span class="ctrn">N° '+fmt(HSH(String(i[1])+String(i[2]))%9000+1000)+'</span></div><div class="ctrb"><p>Entre <b>'+E(i[1]||'le club')+'</b> et <b>'+E(x.j||'Aden Sorensen')+'</b>'+(x.agent?', représenté par '+E(x.agent):'')+', il est convenu ce qui suit.</p><div class="ctrg"><div><small>Durée</small><b>'+E(i[2]||'')+'</b></div><div><small>Rémunération</small><b>'+E(sal)+'</b></div>'+(x.prime?'<div><small>Prime à la signature</small><b>'+E(x.prime)+'</b></div>':'')+(x.lib?'<div><small>Clause libératoire</small><b>'+E(x.lib)+'</b></div>':'')+'</div>'+((i[4]||[]).length?'<ol class="ctrc">'+(i[4]||[]).map(function(cl,k){return '<li><b>Art. '+(k+1)+' · '+E(cl[0])+'</b>'+(cl[1]?'<span>'+MD(cl[1])+'</span>':'')+'</li>'}).join('')+'</ol>':'')+'</div>';
var sg2=H('div','ctrs');if(x.st&&/sign/i.test(x.st)){sg2.innerHTML='<div class="msig"><svg viewBox="0 0 260 60"><path d="'+sigP(x.sig||x.j||'Aden Sorensen')+'"/></svg><small>Signé · '+E(x.sig||x.j||'Aden Sorensen')+(x.d?' · '+E(x.d):'')+'</small></div><div class="msig"><svg viewBox="0 0 260 60"><path d="'+sigP(i[1]||'Club')+'"/></svg><small>Pour le club'+(x.d?' · '+E(x.d):'')+'</small></div>'}
else sg2.innerHTML='<div class="ctrl"><span>Signature du joueur</span><i></i></div><div class="ctrl"><span>Pour le club</span><i></i></div>';el.appendChild(sg2);
decide(el,'Contrat '+(i[1]||'')+' ('+(i[2]||'')+(sal?', '+sal:'')+')',x,'✍️ Signer','✕ Refuser');return el};
BK.SPO=function(i){var x=i[6]||{},h=hue(i[1]),el=H('div','spo'),am=i[2]!=null?(typeof i[2]=='number'?fmt(i[2])+' €':String(i[2])):'';
el.innerHTML='<div class="spol" style="background:linear-gradient(135deg,hsl('+h+',55%,42%),hsl('+((h+40)%360)+',60%,30%))"><span>'+E(i[5]||String(i[1]||'?').charAt(0).toUpperCase())+'</span></div><div class="spot"><small>Sponsor</small><b>'+E(i[1]||'')+'</b>'+(i[3]?'<span>'+E(i[3])+'</span>':'')+(i[4]?'<p>'+MD(i[4])+'</p>':'')+'</div>'+(am?'<div class="spoa"><b class="cnt">'+E(am)+'</b><small>'+E(x.par||'par an')+'</small></div>':'');
var cn=el.querySelector('.cnt'),nv=NUM(i[2]);if(cn&&nv>0){count(cn,0,nv,' €',1300)}
decide(el,'Sponsor '+(i[1]||'')+(am?' ('+am+')':''),x,'🤝 Accepter','✕ Refuser');return el};

/* ---------- vestiaire ---------- */
var MOOD=[[/heureux|content|chaud|bouillant|confiant|bien|ravi|motiv|en feu|joie/i,'#30D158','😄'],[/bless|infirm|platre|plâtre|forfait|soign/i,'#BF5AF2','🩹'],[/furieux|col[eè]re|en guerre|hostile|rage|hors de lui/i,'#FF453A','😡'],[/inquiet|tendu|froid|d[ée]çu|triste|nerveux|boud|vex|m[ée]fiant|fatigu/i,'#FF9F0A','😕'],[/neutre|calme|concentr|normal|focus/i,'#8e8e93','😐']];
function mood(m,n){var s=String(m||'');for(var q=0;q<MOOD.length;q++)if(MOOD[q][0].test(s))return MOOD[q];var r=pget(n),g=typeof r=='number'?r:(typeof r=='string'&&/\d/.test(r)?parseInt(r.replace(/[^\d]/g,''),10):null);if(g!=null)return g>=70?MOOD[0]:g>=40?MOOD[4]:g>=20?MOOD[3]:MOOD[2];return MOOD[4]}
BK.VEST=function(i){var el=H('div','vest'),g=H('div','vestg');el.innerHTML='<div class="ligh"><b>🚪 '+E(i[2]||'Vestiaire')+'</b><small>'+(i[1]||[]).length+' joueurs</small></div>';
(i[1]||[]).forEach(function(p,k){var w=who(p[0]),md=mood(p[1],p[0]),me=MYC(p[0]),c=H('div','vlk'+(me?' me':''),'<i class="vlb" style="background:'+md[1]+'"></i><span class="vav">'+(me?AD():w?w[0]:E(String(p[0]).charAt(0)))+'</span><b>'+E(p[0])+'</b><small>'+(p[1]?E(p[1]):md[2])+'</small>'+(p[2]?'<em>« '+MD(p[2])+' »</em>':''));c.style.animationDelay=(k*50)+'ms';g.appendChild(c)});el.appendChild(g);return el};

/* ---------- match en direct (7) ---------- */
FIN.push(function(){if(SC){G.classList.add('live');var mi=hd.querySelector('.mi'),mm=/(\d+)/.exec(MI||'');
if(mi&&mm&&!/mi-temps|fin/i.test(MI)){var sec=0,base=+mm[1],add=/\+\s*(\d+)/.exec(MI||'');mi.innerHTML='<span class="mim">'+base+(add?'+'+add[1]:'')+'</span><span class="mis">:00</span>';setInterval(function(){sec=(sec+1)%60;if(sec==0){mi.querySelector('.mim').textContent=(base+1)+(add?'+'+add[1]:'')}mi.querySelector('.mis').textContent=':'+(sec<10?'0':'')+sec},1000)}
(function(){var tb=G.querySelector('.tbr');if(!tb)return;var b=H('button','','⚽ Match');b.onclick=function(){G.classList.toggle('lv');b.classList.toggle('on',G.classList.contains('lv'))};tb.insertBefore(b,tb.firstChild)})()}})
